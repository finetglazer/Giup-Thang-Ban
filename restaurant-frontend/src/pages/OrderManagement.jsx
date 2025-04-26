// src/pages/OrderManagement.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderList from '../components/order/OrderList';
import OrderForm from '../components/order/OrderForm';
import OrderDetails from '../components/order/OrderDetails';
import Layout from '../components/common/Layout';

const OrderManagement = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<OrderList />} />
                <Route path="/new" element={<OrderForm />} />
                <Route path="/edit/:id" element={<OrderForm />} />
                <Route path="/:id" element={<OrderDetails />} />
            </Routes>
        </Layout>
    );
};

export default OrderManagement;