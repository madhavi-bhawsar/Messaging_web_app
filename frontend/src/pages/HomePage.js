import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Messaging App</h1>
            <div style={{ marginTop: '20px' }}>
                <Link to="/customer">
                    <button style={{ padding: '10px 20px', marginRight: '20px', fontSize: '16px' }}>
                        Login as Customer
                    </button>
                </Link>
                <Link to="/agent">
                    <button style={{ padding: '10px 20px', fontSize: '16px' }}>
                        Login as Agent
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
