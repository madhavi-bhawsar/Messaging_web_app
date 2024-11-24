import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AgentPage from './pages/AgentPage';
import HomePage from './pages/HomePage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import AgentDashboardPage from './pages/AgentDashboardPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/customer" element={<CustomerPage />} />
                <Route path="/customer/:customer_id" element={<CustomerDetailsPage />} />
                <Route path="/agent" element={<AgentPage />} />
                <Route path="/agent/:agent_id" element={<AgentDashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;

