import Axios from "axios";

const apiUrl = import.meta.env.VITE_URL_MASTER_DATA;
console.log(apiUrl, " apiUrl");

export const getAllCategories = async () => {
  return Axios.get(`${apiUrl}/categories/allCategories`);
};

export const getAllCategorieId = async (id) => {
  return Axios.get(`${apiUrl}/categories/${id}/products`);
};









//productos

export const getAllProduct = async () => {
  return Axios.get(`${apiUrl}/products/allProducts`);
};

export const getAllProductId = async (id) => {
  return Axios.get(`${apiUrl}/products/product/${id}`);
};

export const getAllBrands = async () => {
  return Axios.get(`${apiUrl}/products/brands`);
};

// Obtener modelos por brand
export const getModelsByBrand = async (brand) => {
  return Axios.post(`${apiUrl}/products/models`, { brand });
};

// Obtener categorías por brand y model
export const getCategoriesByBrandAndModel = async (brand, model) => {
  return Axios.post(`${apiUrl}/products/categories`, { brand, model });
};

export const getFilterProduct = async (brand, model, category_id) => {
  return Axios.get(
    `${apiUrl}/products/filter?brand=${brand}&model=${model}&category_id=${category_id}`
  );
};
export const getSearchProduct = async (query) => {
  return Axios.post(`${apiUrl}/products/search`, { query }); // Envía el término de búsqueda en un objeto
};


export const getAllOrder = async () => {
  return Axios.get(`${apiUrl}/order/allOrder`);
};

export const addOrder = async (body) => {
  return Axios.post(`${apiUrl}/order/addOrder`, body);
};



export const getOrderId = async (body) => {
  return Axios.post(`${apiUrl}/order/getOrderById`, body);
};



