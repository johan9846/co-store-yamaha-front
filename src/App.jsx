import { useEffect } from "react";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/cart/cart";
import { Product } from "./pages/product/product";
/* import { productsData } from './api/Api'; */
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import { useProductStore } from "../src/store/use-product-store";
import "./App.css";
import { SearchResults } from "./pages/SearchResults/SearchResults ";
import { FilterResult } from "./pages/FilterResult/FilterResult";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        /* loader: productsData */
      },
      {
        path: "/product/:id",
        element: <Product />,
      },

      { path: "/products/filter", element: <FilterResult /> }, // Ruta nueva para búsqueda
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/search", element: <SearchResults /> }, // Ruta nueva para búsqueda
    ],
  },
]);

function App() {
  const { fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Llamar solo una vez cuando se monta App
  }, []);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
