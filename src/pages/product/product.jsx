import React, { useCallback, useEffect, useState } from "react";
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
import { getAllProductId } from "../../services/admin.services";
import { useParams } from "react-router-dom";

import "./product.css";

export const Product = () => {
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

  const { id } = useParams(); 
  const { addToCart } = useCartStore();

  const [details, setDetails] = useState([]);
  let [baseQty, setBaseQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const getProdctId = useCallback(async (id) => {
    try {
      const { data } = await getAllProductId(id);
      console.log(data);
      if (data) {
        setDetails(data);
      }
    } catch (error) {
      console.error("Error fetching :", error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependencias necesarias

  useEffect(() => {
    getProdctId(id);
  }, [getProdctId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
      index < rating ? (
        <StarIcon key={index} />
      ) : (
        <StarOutlineIcon key={index} />
      )
    );
  };

  if (loading) return <p>Cargando...</p>;
  return (
    <>
      <Container  className="container-products-detail mt-4">
        <Row>
          <Col>
            <Row style={{ border: "2px solid green " }}>
              <Col
                xs={12}
                sm={12}
                md={5}
                lg={5}
                xl={4}
                xxl={4}
              >
                 <div className="container-carrousell">
                  <Slider {...carouselSettings} className="carrousell">
                    {details.images.map((image, index) => (
                      <img src={image} className="image-slick" />
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
                      onClick={() => setBaseQty(baseQty + 1)}
                    >
                      +
                    </div>
                  </div>

                  <button
                    className="button-add"
                    onClick={() =>
                      addToCart({
                        id: details.id,
                        brand: details.brand,
                        model: details.model,
                        category: details.category,
                        name: details.name,
                        image: details.image,
                        price: details.price,
                        quantity: baseQty,
                        description: details.description,
                      }) && toast.success(`${details.title} is added`)
                    }
                  >
                    Añadir al Carrito
                  </button>
                </div>

                <p className="mt-4">
                  Categoria: <span>{details.category}</span>
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
