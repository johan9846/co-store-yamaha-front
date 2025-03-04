import './App.css';
import { Home } from './pages/Home/Home';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/product/product';
import { productsData } from './api/Api';
import { createBrowserRouter,Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { Header } from './components/Header/Header';



const Layout = ()=>{
  return <div>
    <Header/>
    <ScrollRestoration/>
    <Outlet/>

  </div>
}

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <Home/>,
        loader: productsData
      },
      {
        path:'/product/:id',
        element: <Product/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
   
    ]
  }
]) 


function App() {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
