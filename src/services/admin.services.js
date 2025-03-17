import Axios from "axios";

const apiUrl = import.meta.env.VITE_URL_MASTER_DATA;
console.log(apiUrl, " apiUrl");

export const getAllCategories = async () => {
  return Axios.get(`${apiUrl}/categories/allCategories`);
};



//productos

export const getAllProduct = async () => {
  return Axios.get(`${apiUrl}/products/allProducts`);
};


export const getAllProductId = async (id) => {
  return Axios.get(`${apiUrl}/products/product/${id}`);
};


export const getFilterProduct = async (brand, model, category_id) => {
  return Axios.get(
    `${apiUrl}/products/filter?brand=${brand}&model=${model}&category_id=${category_id}`
  );
};