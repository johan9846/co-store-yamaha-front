import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/use-cart-store";
import { ToastContainer, toast } from "react-toastify";

import "./ProductsCard.css";

export const ProductsCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const { title, oldPrice, price, image, category, isNew, description } =
    product;

  const navigate = useNavigate();

  const _id = title;

  const idString = (Title) => {
    const newIdString = String(Title).toLowerCase().split(" ").join("");
    return newIdString;
  };
  const rootId = idString(_id);
  // console.log(rootId)

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };



  return (
    <div className="container-products-card mt-5">
      <div className="image-container">
        <img onClick={handleDetails} src={image} alt="" />
      </div>

      <div>
        <h2>{title}</h2>
      </div>

      <div className="category-price">
        <div>{category}</div>
        <div className="container-price">
          <div className="price">${price}</div>
          <div className="old-price">${oldPrice}</div>
        </div>
      </div>

      <div className="mt-2">
        <button
          onClick={() => {
             addToCart({
              _id: product._id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
              description: product.description,
            }); 

            setTimeout(() => {
              toast.success(`${product.title} is added`);
            }, 50);
          }}
        >
         Agregar al Carrito
        </button>
        <div>{isNew && <p>Sale</p>}</div>
      </div>
      

      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
};
