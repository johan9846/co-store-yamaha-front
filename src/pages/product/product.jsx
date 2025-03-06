import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
} from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";

import { Container, Row, Col } from "react-bootstrap";

import { useCartStore } from "../../store/use-cart-store";

import "./product.css";

export const Product = () => {
  const { addToCart } = useCartStore();

  const [details, setDetails] = useState({});
  let [baseQty, setBaseQty] = useState(1);

  const location = useLocation();
  useEffect(() => {
    setDetails(location.state.item);
  }, [location.state?.item]);

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
        <Row>
          <Col>
            <Row style={{ border: "2px solid green " }}>
              <Col
                xs={12}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                xxl={4}
                className="image-detail"
              >
                <img src={details.image} alt="" />
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
                  <div>{details.brand} - {details.model}</div>
                
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
