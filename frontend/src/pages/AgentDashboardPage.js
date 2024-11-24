import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AgentDashboardPage = () => {
    const { agent_id } = useParams(); // Get agent_id from the route
    const [messages, setMessages] = useState([]); // All messages
    const [activeTab, setActiveTab] = useState('toRespond'); // Active tab

    // Fetch messages on page load
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/messages?agentId=${agent_id}`) // Fetch messages for this agent
            .then((response) => setMessages(response.data))
            .catch((err) => console.error('Error fetching messages:', err));
    }, [agent_id]);

    // Filter messages for each tab
    const messagesToRespond = messages.filter((msg) => msg.lockedBy === agent_id && !msg.agentResponse);
    const openClientMessages = messages.filter((msg) => !msg.lockedBy && !msg.agentResponse);
    const previouslyResponded = messages.filter((msg) => msg.agentId === agent_id);

    // Lock a message
    const lockMessage = async (messageId) => {
        try {
            await axios.put(`http://localhost:5000/api/messages/${messageId}/lock`, { agentId: agent_id });
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === messageId ? { ...msg, lockedBy: agent_id, lockedAt: new Date() } : msg
                )
            );
        } catch (error) {
            console.error('Error locking message:', error);
            alert('Failed to lock message. Please try again.');
        }
    };

    // Unlock a message
    const unlockMessage = async (messageId) => {
        try {
            await axios.put(`http://localhost:5000/api/messages/${messageId}/unlock`, { agentId: agent_id });
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === messageId ? { ...msg, lockedBy: null, lockedAt: null } : msg
                )
            );
        } catch (error) {
            console.error('Error unlocking message:', error);
            alert('Failed to unlock message. Please try again.');
        }
    };

    // Handle responding to a message
    const handleResponseSubmit = async (e, messageId) => {
        e.preventDefault();

        const agentResponse = e.target.response.value;
        if (!agentResponse.trim()) {
            alert('Response cannot be empty!');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/messages/${messageId}`, {
                agentResponse,
                agentId: agent_id,
            });
            const updatedMessage = response.data;

            setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId)); // Remove from "Messages to Respond"
            setMessages((prevMessages) => [...prevMessages, updatedMessage]); // Add to all messages (updates previously responded)
            e.target.reset(); // Clear form
        } catch (error) {
            console.error('Error submitting response:', error);
            alert('Failed to send response. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, Agent {agent_id}</h1>

            {/* Top Panel with Tabs */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => setActiveTab('toRespond')}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        fontSize: '16px',
                        backgroundColor: activeTab === 'toRespond' ? '#007BFF' : '#f0f0f0',
                        color: activeTab === 'toRespond' ? 'white' : 'black',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                >
                    Messages to Respond
                </button>
                <button
                    onClick={() => setActiveTab('openMessages')}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        fontSize: '16px',
                        backgroundColor: activeTab === 'openMessages' ? '#007BFF' : '#f0f0f0',
                        color: activeTab === 'openMessages' ? 'white' : 'black',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                >
                    Open Client Messages
                </button>
                <button
                    onClick={() => setActiveTab('responded')}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: activeTab === 'responded' ? '#007BFF' : '#f0f0f0',
                        color: activeTab === 'responded' ? 'white' : 'black',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                >
                    Previously Responded
                </button>
            </div>

            {/* Tab Content */}
            <div style={{ marginTop: '30px', textAlign: 'left', width: '60%', margin: 'auto' }}>
                {activeTab === 'toRespond' && (
                    <div>
                        <h2>Messages to Respond</h2>
                        <ul>
                            {messagesToRespond.length > 0 ? (
                                messagesToRespond.map((msg) => (
                                    <li key={msg._id} style={{ marginBottom: '20px' }}>
                                        <strong>Customer:</strong> {msg.customerName}
                                        <br />
                                        <strong>Message:</strong> {msg.content}
                                        <br />
                                        <button
                                            onClick={() => unlockMessage(msg._id)}
                                            style={{
                                                padding: '5px 15px',
                                                fontSize: '14px',
                                                marginBottom: '10px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Unlock
                                        </button>
                                        <form onSubmit={(e) => handleResponseSubmit(e, msg._id)}>
                                            <textarea
                                                name="response"
                                                placeholder="Type your response here..."
                                                style={{
                                                    width: '100%',
                                                    height: '50px',
                                                    padding: '10px',
                                                    fontSize: '14px',
                                                    marginBottom: '10px',
                                                }}
                                            ></textarea>
                                            <button
                                                type="submit"
                                                style={{
                                                    padding: '5px 15px',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Send Response
                                            </button>
                                        </form>
                                    </li>
                                ))
                            ) : (
                                <p>No messages to respond to.</p>
                            )}
                        </ul>
                    </div>
                )}
                {activeTab === 'openMessages' && (
                    <div>
                        <h2>Open Client Messages</h2>
                        <ul>
                            {openClientMessages.length > 0 ? (
                                openClientMessages.map((msg) => (
                                    <li key={msg._id} style={{ marginBottom: '20px' }}>
                                        <strong>Customer:</strong> {msg.customerName}
                                        <br />
                                        <strong>Message:</strong> {msg.content}
                                        <br />
                                        <button
                                            onClick={() => lockMessage(msg._id)}
                                            style={{
                                                padding: '5px 15px',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Lock
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No open client messages.</p>
                            )}
                        </ul>
                    </div>
                )}
                {activeTab === 'responded' && (
                    <div>
                        <h2>Previously Responded</h2>
                        <ul>
                            {previouslyResponded.length > 0 ? (
                                previouslyResponded.map((msg) => (
                                    <li key={msg._id} style={{ marginBottom: '20px' }}>
                                        <strong>Customer:</strong> {msg.customerName}
                                        <br />
                                        <strong>Message:</strong> {msg.content}
                                        <br />
                                        <strong>Response:</strong> {msg.agentResponse}
                                    </li>
                                ))
                            ) : (
                                <p>No previously responded messages.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentDashboardPage;
