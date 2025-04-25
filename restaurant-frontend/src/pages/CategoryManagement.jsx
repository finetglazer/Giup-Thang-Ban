// src/pages/CategoryManagement.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryList from '../components/category/CategoryList';
import CategoryForm from '../components/category/CategoryForm';
import Layout from '../components/common/Layout';

const CategoryManagement = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<CategoryList />} />
                <Route path="/new" element={<CategoryForm />} />
                <Route path="/edit/:id" element={<CategoryForm />} />
            </Routes>
        </Layout>
    );
};

export default CategoryManagement;