import CloseIcon from "@mui/icons-material/Close";

import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo, useState } from "react";
import "./CartItem.css";
import { Button } from "@mui/material";

export const CartItem = () => {
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
  const formatCurrency = (value) =>
    `$ ${Number(value || 0).toLocaleString("es-CO")}`;
  const {
    productData,
    incrementQuantity,
    deleteFromCart,
    decrementQuantity,
    resetCart,
  } = useCartStore();

  useMemo(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmount(price);
  }, [productData]);

  const handleCheckout = () => {};
  return (
    <>
      <Container className="container-cart-item">
        <div>
          <h2 className="mt-4">Carrito de compras</h2>
        </div>

        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            {productData.map((item, key) => (
              <Row className="d-flex justify-content-center mt-5" key={key}>
                <Col
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                  xxl={1}
                  className="detele-item-cart"
                >
                  <CloseIcon
                    onClick={() => deleteFromCart(item.id)}
                    sx={{ cursor: "pointer" }}
                  />
                </Col>

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
                    <div
                      className="button-amount"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      -
                    </div>

                    <span>{item.quantity}</span>

                    <div
                      className="button-amount"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </div>
                  </div>
                  <div>{formatCurrency(item.price * item.quantity)}</div>
                </Col>
              </Row>
            ))}
          </Col>

          <Col className="tarjet-pay mt-5 mt-xl-3 ">
            <Row className="justify-content-center">
              <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <h2>Total</h2>

                <span> COP {formatCurrency(totalAmount)}</span>
                <p className="mt-4">
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, Veritatis
                  </span>
                </p>

                <hr></hr>

                <div className="total mt-5">
                  <div> Total</div>

                  <div>{formatCurrency(totalAmount)}</div>
                </div>
                <div className="mt-3">
                  <Button
                    onClick={handleCheckout}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Pagar
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col>
            <Button
              onClick={() => resetCart()}
              variant="contained"
              color="error"
            >
              Limpiar Carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
