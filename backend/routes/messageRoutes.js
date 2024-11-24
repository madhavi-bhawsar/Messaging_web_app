const express = require('express');
const {
    getMessages,
    lockMessage,
    unlockMessage,
    respondToMessage,
    addMessage,
} = require('../controllers/messageController');

const router = express.Router();

router.get('/', getMessages);
router.post('/', addMessage);
router.put('/:id/lock', lockMessage);   // Lock a message
router.put('/:id/unlock', unlockMessage); // Unlock a message
router.put('/:id', respondToMessage);  // Respond to a message

module.exports = router;
