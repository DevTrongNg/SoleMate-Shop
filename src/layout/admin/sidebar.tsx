import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='w-1/5 h-screen bg-white p-4 shadow-md'>
      <h2 className='text-lg font-bold mb-4'>Admin Panel</h2>
      <ul className='space-y-2'>
      <li className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer'>
        <Link to='/dashboard/product-add'>Thêm sản phẩm</Link>
      </li>
      <li className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer'>
        <Link to='/dashboard/product-list'>list sản phẩm</Link>
      </li>
      <li className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer'>
        <Link to='/dashboard/category-add'>Thêm danh mục</Link>
      </li>
      <li className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer'>
        <Link to='/dashboard/category-list'>list danh mục</Link>
      </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
