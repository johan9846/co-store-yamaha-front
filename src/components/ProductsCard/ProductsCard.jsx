import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import { ToastContainer, toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductsCard.css";


export const ProductsCard = ({ product }) => {
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

  const {
    id,
    brand,
    model,
    category,
    name,
    oldPrice,
    price,
    images,
    rating,
    description,
  } = product;

  const navigate = useNavigate();

 


  const handleDetails = () => {
    navigate(`/product/${id}`, {
    
    });
  };

  return (
    <div className="container-products-card">
      <div className="container-carrousell">
        <Slider {...carouselSettings} className="carrousell">
          {images.map((image, index) => (
            <img
              key={index}
              onClick={handleDetails}
              src={image}
              alt={`Imagen ${index + 1}`}
              className="image-slick"
            />
          ))}
        </Slider>
      </div>


      <div className="mt-3">
        <h2>{name}</h2>
      </div>

      <div className="category-price">
        <div>{category.name}</div>
        <div className="container-price">
          <div className="old-price">${oldPrice}</div>
          <div className="price">${price}</div>
        </div>
      </div>

      <div className="mt-3">
        {brand} - {model}
      </div>

      <div className="mt-2">{description}</div>
      <div className="mt-2">
        <button
          onClick={() => {
            addToCart({
              id: product.id,
              brand: product.brand,
              model: product.model,
              category: product.category,
              name: product.name,
              image: product.image,
              price: product.price,
              quantity: 1,
              description: product.description,
            });

            setTimeout(() => {
              toast.success(`${product.name} is added`);
            }, 50);
          }}
        >
          Agregar al Carrito
        </button>
      </div>

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
  );
};
