import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import TransactionFormPage from './pages/TransactionFormPage';
import TransactionListPage from './pages/TransactionListPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cadastro" element={<TransactionFormPage />} />
                <Route path="/lista" element={<TransactionListPage />} />
            </Routes>
        </Router>
    );
};

export default App;
