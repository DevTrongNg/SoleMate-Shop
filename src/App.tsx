import axios from "axios";
import { useRoutes } from "react-router-dom";
import OrderAdd from "./components/client/orderadd";
import OrderList from "./components/client/orderlist";

import Home from "./components/client/home";
// import Search from './components/Search';
import DetailProduct from "./components/client/detailProduct";
import AllProduct from "./components/client/allProduct";

import AddProduct from "./components/admin/Products/addproduct";
import EditProduct from "./components/admin/Products/editproduct";
import ListProduct from "./components/admin/Products/ListProduct";

import Register from "./components/client/register";
import Login from "./components/client/login";

import AdminLayout from "./layout/admin";
import Dashboard from "./layout/admin/dashboard";
import AddCategory from "./components/admin/Category/addCategory";
import EditCategory from "./components/admin/Category/editCategory";
import ListCategory from "./components/admin/Category/ListCategory";
import ClientLayout from "./layout/client";

function App() {
  // Khai báo routes
  const routes = useRoutes([
    // CLIENT LAYOUT
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "order-add", element: <OrderAdd /> },
        { path: "order-list", element: <OrderList /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "detailProduct/:id", element: <DetailProduct /> },
        { path: "allProduct", element: <AllProduct /> },
        // { path: 'search', element: <Search /> }, // nếu cần dùng lại sau
      ],
    },

    // ADMIN LAYOUT
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "product-add", element: <AddProduct /> },
        { path: "product-list", element: <ListProduct /> },
        { path: "product-edit/:id", element: <EditProduct /> },

        { path: "category-list", element: <ListCategory /> },
        { path: "category-add", element: <AddCategory /> },
        { path: "category-edit/:id", element: <EditCategory /> },
      ],
    },
  ]);

  return routes;
}

export default App;
