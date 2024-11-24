import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/messages')
            .then((res) => setMessages(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>Customer Messages</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg._id}>
                        <strong>{msg.customerName}:</strong> {msg.content}
                        <br />
                        <em>Response:</em> {msg.agentResponse || 'No response yet'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
