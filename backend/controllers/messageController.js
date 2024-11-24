const Message = require('../models/Message');

// Get all messages
exports.getMessages = async (req, res) => {
    const { customerName, agentId } = req.query;

    try {
        if (customerName) {
            // Customers see only their messages
            const messages = await Message.find({ customerName });
            return res.json(messages);
        }

        if (agentId) {
            // Agents see unlocked messages and messages locked by them
            const messages = await Message.find({
                $or: [{ lockedBy: null }, { lockedBy: agentId }],
            });
            return res.json(messages);
        }

        // Default: Return all messages (e.g., for admin)
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Add a new message
exports.addMessage = async (req, res) => {
    const { customerName, content } = req.body; // Extract customerName and message content
    try {
        const newMessage = new Message({ customerName, content });
        await newMessage.save();
        res.status(201).json(newMessage); // Respond with the created message
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to store message' });
    }
};


// Respond to a message
exports.respondToMessage = async (req, res) => {
    const { id } = req.params;
    const { agentResponse, agentId } = req.body; // Include agentId in the request body

    try {
        const message = await Message.findByIdAndUpdate(
            id,
            { agentResponse, agentId },
            { new: true } // Return the updated document
        );
        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.lockMessage = async (req, res) => {
    const { id } = req.params;
    const { agentId } = req.body; // Agent ID attempting to lock the message

    try {
        // Check if the message is already locked
        const message = await Message.findById(id);
        if (message.lockedBy && message.lockedBy !== agentId) {
            return res.status(403).json({ error: 'Message is already locked by another agent' });
        }

        // Lock the message for this agent
        message.lockedBy = agentId;
        message.lockedAt = new Date();
        await message.save();

        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.unlockMessage = async (req, res) => {
    const { id } = req.params;
    const { agentId } = req.body; // Agent ID attempting to unlock the message

    try {
        const message = await Message.findById(id);
        
        // Ensure only the locking agent can unlock the message
        if (message.lockedBy !== agentId) {
            return res.status(403).json({ error: 'You are not authorized to unlock this message' });
        }

        // Unlock the message
        message.lockedBy = null;
        message.lockedAt = null;
        await message.save();

        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
