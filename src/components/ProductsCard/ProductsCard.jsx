import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import {  toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./ProductsCard.css";
import { Button } from "@mui/material";

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
    brands,
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
    navigate(`/home/repuestos/product/${id}`);
  };

  const formatCurrency = (value) =>
    `${Number(value || 0).toLocaleString("es-CO")}`;

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

      <div className="mt-4">
        <h2>{name}</h2>
      </div>

      <div className="category-price">
        <div>{category.name}</div>
        <div className="container-price">
          <div className="old-price">${formatCurrency(oldPrice)}  </div>
          <div className="price">${formatCurrency(price)} </div>
        </div>
      </div>

      <div className="mt-3 brands-container">
        {brands.map((brand) => brand.name).join(", ")} -{" "}
        {brands.map((brand) => brand.models.join(", ")).join(" | ")}
      </div>

      <div className="mt-2">{description}</div>
      <div className="mt-2">
        <Button
          variant="contained" // O "outlined" si prefieres un borde en lugar de fondo
          color="primary" // Puedes cambiar el color a "secondary", "success", etc.
          onClick={() => {
            addToCart({
              id: product.id,
              brands: product.brands,
              category: product.category.name,
              name: product.name,
              images: product.images,
              price: product.price,
              quantity_stock: product.quantity_stock,
              quantity: 1,
              description: product.description,
            });

            setTimeout(() => {
              toast.success(`${product.name} agregado al carrito de compras`);
            }, 100);
          }}
          disabled={
            useCartStore
              .getState()
              .productData.find((item) => item.id === product.id)?.quantity >=
            product.quantity_stock
          }
        >
          Agregar al Carrito
        </Button>
      </div>

 
    </div>
  );
};
