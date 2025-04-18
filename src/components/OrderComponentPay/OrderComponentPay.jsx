import { Button } from "@mui/material";

import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAddressStore } from "../../store/use-address-store"; // Importa la store
import { getOrderId } from "../../services/admin.services";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import "./OrderComponentPay.css";

export const OrderComponentPay = () => {
  const { id } = useParams();
  const { name, last_name, phone, departament, city, address } =
    useAddressStore();

  const carouselSettings = {
    dots: true, // Muestra puntos de navegación
    infinite: true, // Permite navegación infinita
    speed: 1000, // Velocidad de transición
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 1, // Muestra una imagen a la vez
    slidesToScroll: 1, // Avanza de una en una
    arrows: false, // Muestra flechas de navegación
  };

  const [totalAmount, setTotalAmount] = useState("");
  const [dataOrder, setDataOrder] = useState(false);

  const { productData, resetCart } = useCartStore();

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [productData]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.epayco.co/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    fetchOrderById(id);
  }, [id]);

  useEffect(() => {
    if (dataOrder.isPaid) {
      resetCart();
    }
  }, [dataOrder]);

  const fetchOrderById = async () => {
    try {
      const { data } = await getOrderId({ id }); // Llama a la API enviando el ID en el body
      setDataOrder(data.data);
      return data.data.id;
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      return { error: "No se pudo obtener la orden" }; // Devuelve un error manejado
    }
  };

  console.log(dataOrder.id);

  const getCreateOrder = useCallback(async () => {
    try {
      if (!window.ePayco) {
        console.error("ePayco no está cargado");
        return;
      }

      const idData = await fetchOrderById();

      let price = 0;
      productData.map((item) => {
        price += item.price * item.quantity;
        return price;
      });

      const handler = window.ePayco.checkout.configure({
        key: "3bba8ce2f239a7ff092c442200dc3514",
        test: true, // true = pruebas, false = producción
      });

      handler.open({
        amount: String(price),
        currency: "COP",
        tax: "0",
        tax_base: "0",
        name: `${name} ${last_name}`,
        description: "Pago",
        invoice: idData, // ID de la orden en la BD
        extra1: idData, // Enviar el ID en extra1 para identificar la orden en el webhook
        response: "http://localhost:5173/cart/order", // URL donde redirige después del pago
        confirmation: "https://719a-190-90-255-170.ngrok-free.app/order/pay", // Webhook para verificar pago
        country: "CO",
        lang: "es",
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }, []);

  const onSubmit = (data) => {
    getCreateOrder();
  };

  const formatCurrency = (value) =>
    `$ ${Number(value || 0).toLocaleString("es-CO")}`;

  return (
    <>
      <Container className="container-cart-item mb-4">
        <div>
          <h2 className="mt-4">
            Orden de Compra <strong>{id}</strong>
          </h2>
        </div>

        <Row>
          <Col xs={8} sm={8} md={4} lg={4} xl={4} xxl={4}>
            <div
              className={`alert ${
                dataOrder.isPaid ? "alert_paid" : "alert_no_paid"
              }`}
            >
              <CreditCardOutlinedIcon fontSize="large" />
              {dataOrder.isPaid ? "Paid" : "No paid"}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            {productData.map((item, key) => (
              <Row className="d-flex justify-content-center mt-5" key={key}>
                <Col
                  xs={5}
                  sm={5}
                  md={5}
                  lg={5}
                  xl={3}
                  xxl={3}
                  className="image-cart"
                >
                  <Slider
                    {...carouselSettings}
                    className="container-carrousell"
                  >
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="image-slick"
                      />
                    ))}
                  </Slider>
                </Col>

                <Col
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={4}
                  xxl={4}
                  className="title-product"
                >
                  <div>{item.name} </div>
                  <div>
                    {item.brands.map((brand) => brand.name).join(", ")} -{" "}
                    {item.brands
                      .map((brand) => brand.models.join(", "))
                      .join(" | ")}
                  </div>
                </Col>

                <Col
                  xs={12}
                  sm={12}
                  md={7}
                  lg={6}
                  xl={4}
                  xxl={4}
                  className="container-amount mt-5 mt-xl-0"
                >
                  <div>Cantidad</div>

                  <div className="amount-counter">
                    <span>{item.quantity}</span>
                  </div>
                  <div>{formatCurrency(item.price * item.quantity)}</div>
                </Col>
              </Row>
            ))}
          </Col>

          <Col className="tarjet-pay mt-5 mt-xl-3">
            <Row className="justify-content-center">
              <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <div className="card-pay">
                  <div className="data-address">
                    <h2>Datos de envío</h2>

                    <div>
                      {name} {last_name}
                    </div>
                    <div>{address}</div>
                    <div>{phone}</div>
                    <div>{departament}</div>
                    <div>{city}</div>
                  </div>

                  <hr></hr>
                  <h2>Total</h2>
                  <div className="d-flex justify-content-between">
                    <div>No. Products</div>
                    <div>{productData.length}</div>
                  </div>
                  <span>COP {formatCurrency(totalAmount)}</span>

                  <div
                    className={` mt-2 alert ${
                      dataOrder.isPaid ? "alert_paid" : "alert_no_paid"
                    }`}
                  >
                    <CreditCardOutlinedIcon fontSize="large" />
                    {dataOrder.isPaid ? "Paid" : "No paid"}
                  </div>

                  <hr />

                  <div className="mt-3">
                    <Button
                      onClick={onSubmit}
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={dataOrder.isPaid || productData.length === 0}
                    >
                      Pagar
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
