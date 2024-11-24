import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/messages', { customerName, content })
            .then(() => {
                setCustomerName('');
                setContent('');
            })
            .catch((err) => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
            />
            <textarea
                placeholder="Message Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <button type="submit">Send Message</button>
        </form>
    );
};

export default MessageForm;
