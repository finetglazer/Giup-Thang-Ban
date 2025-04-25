// src/pages/MenuManagement.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuItemList from '../components/menuItem/MenuItemList';
import MenuItemForm from '../components/menuItem/MenuItemForm';
import Layout from '../components/common/Layout';

const MenuManagement = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MenuItemList />} />
                <Route path="/category/:categoryId" element={<MenuItemList />} />
                <Route path="/new" element={<MenuItemForm />} />
                <Route path="/edit/:id" element={<MenuItemForm />} />
            </Routes>
        </Layout>
    );
};

export default MenuManagement;