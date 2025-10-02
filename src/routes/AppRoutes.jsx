import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";    //ok
import AdminLayout from "../layouts/AdminLayout";    //ok

// Pages
import Home from "../pages/Home"

// import ProductDetails from "../pages/ProductDetails";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import AdminDashboard from "../pages/AdminDashboard";
// import AdminProducts from "../pages/AdminProducts";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
    //   { path: "/products", element: <Products /> },
    //   { path: "/products/:id", element: <ProductDetails /> },
    //   { path: "/cart", element: <Cart /> },
    //   { path: "/checkout", element: <Checkout /> },
    //   { path: "/login", element: <Login /> },
    //   { path: "/register", element: <Register /> },

    // add to home section parts all about our Wd
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
    //   { path: "dashboard", element: <AdminDashboard /> },
    //   { path: "products", element: <AdminProducts /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
