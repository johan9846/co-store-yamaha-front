import CloseIcon from "@mui/icons-material/Close";

import { useCartStore } from "../../store/use-cart-store";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo, useState } from "react";
import "./CartItem.css";

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
          <h2 className="font-titleFont text-2xl">Shopping cart</h2>
        </div>

        <Row>
          <Col xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            {productData.map((item, key) => (
              <Row className="mt-3" key={key}>
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

                <Col className="image-cart">
                  <div className="container-carrousell">
                    <Slider {...carouselSettings} className="carrousell">
                      {item.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Imagen ${index + 1}`}
                          className="image-slick"
                        />
                      ))}
                    </Slider>
                  </div>

                  <img src={item.image} alt="" className="image-cart" />
                </Col>

                <Col className="title-product">
                  <div>{item.name} </div>
                  <div className="mt-2">
                    {item.brand}-{item.model}
                  </div>
                </Col>

                <Col className="container-amount">
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
                  <div>${item.price * item.quantity}</div>
                </Col>
              </Row>
            ))}
          </Col>

          <Col className="tarjet-pay">
            <Row className="justify-content-center">
              <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <h2>Total</h2>

                <span className="font-bold text-lg"> COP ${totalAmount}</span>
                <p className="mt-4">
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, Veritatis
                  </span>
                </p>

                <hr></hr>

                <div className="total mt-6">
                  <div> Total</div>

                  <div>${totalAmount}</div>
                </div>
                <div className="mt-3">
                  <button onClick={handleCheckout} className="pay-button">
                    Pagar
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <button onClick={() => resetCart()} className="reset-cart">
              Limpiar Carrito
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
