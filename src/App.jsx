import { useCallback, useEffect, useState } from "react";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/cart/cart";
import { Product } from "./pages/product/product";
import { getAllProduct } from "./services/admin.services";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Header } from "./components/Header/Header";

import { SearchResults } from "./pages/SearchResults/SearchResults ";
import { FilterResult } from "./pages/FilterResult/FilterResult";
import { Repuestos } from "./pages/Repuestos/Repuestos";
import "./App.css";
import { RepuestosCategoria } from "./pages/RepuestosCategoria/RepuestosCategoria";
import { Address } from "./components/address/address";
import { Order } from "./pages/Order/Order";
import { OrderPay } from "./pages/OrderPay/OrderPay";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "./context/ThemeContext";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton, Tooltip } from "@mui/material";


// Componente Layout para el encabezado y contenedor de rutas hijas
const Layout = () => {
  return (
    <div className="principal">
      <Header />
      <ScrollRestoration />
      <div className="scroll-cont">
      <Tooltip title="Contáctanos por WhatsApp" placement="left">
        <IconButton
          sx={{
            position: "fixed",
            bottom: 90,
            right: 90,
            backgroundColor: "#25D366",
            color: "white",
            "&:hover": {
              backgroundColor: "#20ba5a",
            },
            zIndex: 1000,
          }}
          onClick={() =>
            window.open("https://wa.me/573148893889", "_blank") // Reemplaza por tu número
          }
        >
          <WhatsAppIcon />
        </IconButton>
      </Tooltip>
       
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
          className="toast-container"
        />{" "}
        <Outlet />
      </div>
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

/*   useEffect(() => {
    console.log("productooooooossss");
    getProducts();
  }, [getProducts]); */

  /*   if (dataProduct.length === 0) {
    return <p>Cargando productos...</p>;
  } */

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />, // Redirección inicial a /home
        },

        {
          path: "products/filter",
          element: <FilterResult />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "search",
          element: <SearchResults />,
        },

        {
          path: "home",
          element: <Home />,
        },

        {
          path: "home/repuestos",
          element: <Repuestos data={dataProduct} replace />,
        },

        {
          path: "home/repuestos/:id",
          element: <RepuestosCategoria replace />,
        },

        {
          path: "home/repuestos/product/:id",
          element: <Product />,
        },

        {
          path: "cart/address",
          element: <Address />,
        },

        {
          path: "cart/order",
          element: <Order />,
        },

        {
          path: "cart/order/id/:id",
          element: <OrderPay />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
    <div className="app">
      <RouterProvider router={router} />
      
    </div>
    </ThemeProvider>
  );
}

export default App;
