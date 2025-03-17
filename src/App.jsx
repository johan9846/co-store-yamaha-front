import { useCallback, useEffect, useState } from "react";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/cart/cart";
import { Product } from "./pages/product/product";
import { getAllProduct } from "./services/admin.services";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Header } from "./components/Header/Header";

import { SearchResults } from "./pages/SearchResults/SearchResults ";
import { FilterResult } from "./pages/FilterResult/FilterResult";

import "./App.css";

// Componente Layout para el encabezado y contenedor de rutas hijas
const Layout = () => {

  return (
    <div>
      <Header  />
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

function App() {
  const [dataProduct, setDataProduct] = useState([]);

  // Función para obtener los productos
  const getProducts = useCallback(async () => {
    try {
      const { data } = await getAllProduct();
      if (data) {
        // Ordenar productos por fecha de creación
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setDataProduct(sortedData);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }, []);

  useEffect(() => {
    console.log("productooooooossss")
    getProducts();
  }, [getProducts]);

  if (dataProduct.length === 0) {
    return <p>Cargando productos...</p>;
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>, // Pasamos el estado como prop
      children: [
        {
          path: "/home",
          element: <Home data={dataProduct} />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/products/filter", // Ruta para la búsqueda filtrada
          element: <FilterResult />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/search", // Ruta para resultados de búsqueda
          element: <SearchResults />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
