import React, { useState } from "react";
import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import { useCartStore } from "../../store/use-cart-store";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import "./DetailProduct.css";

export const DetailProduct = ({ details }) => {
  console.log(details , "detalels");
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

  const { addToCart } = useCartStore();

  let [baseQty, setBaseQty] = useState(1);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
      index < rating ? (
        <StarIcon key={index} />
      ) : (
        <StarOutlineIcon key={index} />
      )
    );
  };

  return (
    <>
      <Container className="container-products-detail mt-4">

         <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" href="/home">
            Home
          </Link>
          <Link underline="hover" href="/home/repuestos">
            Repuestos
          </Link>

          <Link
            underline="hover"
            href={`/home/repuestos/${details.category_id }`}
          >
            {details.category.name }
          </Link>
          <span>{details.name}</span>
        </Breadcrumbs> 

        <Row>
          <Col>
            <Row style={{ border: "2px solid green " }}>
              <Col xs={12} sm={12} md={5} lg={5} xl={4} xxl={4}>
                <div className="container-carrousell">
                  <Slider {...carouselSettings} className="carrousell">
                    {details.images.map((image, index) => (
                      <img src={image} className="image-slick" key={index} />
                    ))}
                  </Slider>
                </div>
              </Col>

              <Col>
                <div>
                  <h2>{details.name}</h2>

                  <div className="category-price">
                    <div className="container-price">
                      <div className="old-price">${details.oldPrice}</div>
                      <div className="price">${details.price}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div>{renderStars(details.rating)}</div>
                </div>

                <p className="mt-3">{details.description}</p>

                <div className="d-flex mt-3">
                  <div>
                    {details.brand} - {details.model}
                  </div>
                </div>

                <div className="container-amount mt-3">
                  <div className="text-base text-black">Cantidad</div>

                  <div className="amount-counter">
                    <div
                      className="button-amount"
                      onClick={() => setBaseQty(baseQty > 1 ? baseQty - 1 : 1)}
                    >
                      -
                    </div>

                    <span style={{ border: "2px solid red" }}>{baseQty}</span>

                    <div
                      className="button-amount"
                      onClick={() => {
                        // Obtenemos la cantidad del producto en el carrito
                        const productInCart = useCartStore
                          .getState()
                          .productData.find((item) => item.id === details.id);

                        const cartQuantity = productInCart
                          ? productInCart.quantity
                          : 0;

                        // Verificamos ambas condiciones antes de incrementar la cantidad
                        if (
                          baseQty < details.quantity_stock &&
                          baseQty < details.quantity_stock - cartQuantity
                        ) {
                          setBaseQty(baseQty + 1);
                        }
                      }}
                    >
                      +
                    </div>
                  </div>

                  <button
                    className="button-add"
                    onClick={() => {
                      addToCart({
                        id: details.id,
                        brand: details.brand,
                        model: details.model,
                        category: details.category.name,
                        name: details.name,
                        images: details.images,
                        price: details.price,
                        quantity: baseQty,
                        quantity_stock: details.quantity_stock,
                        description: details.description,
                      });

                      setTimeout(() => {
                        toast.success(`${details.name} is added`);
                      }, 50);
                    }}
                    disabled={
                      baseQty >= details.quantity_stock ||
                      useCartStore
                        .getState()
                        .productData.find((item) => item.id === details.id)
                        ?.quantity >= details.quantity_stock
                    }
                  >
                    Añadir al Carrito
                  </button>
                </div>

                <p className="mt-4">
                  Categoria: <span>{details.category.name}</span>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <div>
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};
