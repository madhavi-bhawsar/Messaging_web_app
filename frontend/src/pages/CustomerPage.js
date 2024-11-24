import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
    const [customerId, setCustomerId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customerId) {
            // Navigate to /customer/:customer_id
            navigate(`/customer/${customerId}`);
        } else {
            alert('Please enter a valid Customer ID');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Customer Login</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
                <button
                    type="submit"
                    style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px' }}
                >
                    Proceed
                </button>
            </form>
        </div>
    );
};

export default CustomerPage;
