import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentPage = () => {
    const [agentId, setAgentId] = useState(''); // State to store agent_id
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agentId.trim()) {
            navigate(`/agent/${agentId}`); // Redirect to /agent/:agent_id
        } else {
            alert('Please enter a valid Agent ID');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Agent Login</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter Agent ID"
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        width: '300px',
                        marginBottom: '20px',
                    }}
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Proceed
                </button>
            </form>
        </div>
    );
};

export default AgentPage;
