import axios from 'axios';
import { useRoutes } from 'react-router-dom';
import OrderAdd from './components/orderadd';
import OrderList from './components/orderlist';

import Home from './components/home';
// import Search from './components/Search';
import DetailProduct from './components/detailProduct';
import AllProduct from './components/allProduct'; 

import AddProduct from './components/Products/addproduct';
import EditProduct from './components/Products/editproduct';
import ListProduct from './components/Products/ListProduct'; 

import ListCategory from './components/Category/ListCategory'; 
import AddCategory from './components/Category/addCategory'; 
import EditCategory from './components/Category/editCategory'; 

import Register from './components/register';
import Login from './components/login';

import AdminLayout from './layout/admin';
import Dashboard from './layout/admin/dashboard';


function App() {
    // Khai báo routes
    const routes = useRoutes([
        { path: '/order-add', element: <OrderAdd /> },
        { path: '/order-list', element: <OrderList /> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: '/', element: <Home /> },
        // { path: '/search', element: <Search /> },
        { path: '/detailProduct/:id', element: <DetailProduct /> },
        { path: '/allProduct', element: <AllProduct /> },
    
        {
            path: 'dashboard',
            element: <AdminLayout />,
            children: [
                { path: '', element: <Dashboard /> },
                { path: 'product-add', element: <AddProduct /> },
                { path: 'product-list', element: <ListProduct /> },
                { path: 'product-edit/:id', element: <EditProduct /> } ,

                { path: 'category-list', element: <ListCategory /> } ,
                { path: 'category-add', element: <AddCategory /> } ,
                { path: 'category-edit/:id', element: <EditCategory /> } 
            ],
        },
    ]);

    return routes;
}

export default App;
