import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetailsPage = () => {
    const { customer_id } = useParams(); // Get customer_id from the URL
    const [message, setMessage] = useState(''); // State for the current message
    const [previousMessages, setPreviousMessages] = useState([]); // State for previous messages
    const [successMessage, setSuccessMessage] = useState(''); // Success message after submission

    // Fetch previous messages when the component loads or when customer_id changes
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/messages?customerName=${customer_id}`) // Fetch messages for the specific customer
            .then((response) => setPreviousMessages(response.data))
            .catch((err) => console.error('Error fetching messages:', err));
    }, [customer_id]);    
    

    // Handle form submission for new message
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            alert('Please enter a message!');
            return;
        }

        try {
            // Send the message to the backend API
            const response = await axios.post('http://localhost:5000/api/messages', {
                customerName: customer_id, // Use customer_id as customerName
                content: message,
            });
            setMessage(''); // Clear the message input field
            setSuccessMessage('Message sent successfully!');
            setPreviousMessages((prev) => [...prev, response.data]); // Add the new message to the list
            setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
        } catch (error) {
            console.error('Error submitting message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, Customer {customer_id}</h1>
            <p>Type your message below and send it to our support team:</p>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                        width: '400px',
                        height: '100px',
                        padding: '10px',
                        fontSize: '16px',
                        marginBottom: '20px',
                    }}
                ></textarea>
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Send Message
                </button>
            </form>
            {successMessage && (
                <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
            )}

            <div style={{ marginTop: '40px', textAlign: 'left', width: '50%', margin: 'auto' }}>
                <h2>Previous Messages</h2>
                <ul>
                    {previousMessages.map((msg) => (
                        <li key={msg._id} style={{ marginBottom: '10px' }}>
                            <strong>Message:</strong> {msg.content}
                            <br />
                            <strong>Response:</strong> {msg.agentResponse || 'No response yet'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerDetailsPage;
