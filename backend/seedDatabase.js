const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Message = require('./models/Message'); // Replace with the actual path to your Message model

// MongoDB connection string
const MONGO_URI = 'mongodb+srv://bhawsarmadhavi:H6dHoeejJmm4Im5Q@cluster0.0cdsgi1.mongodb.net/branchMessagingDB'; // Replace `yourDatabaseName` with your database name

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Function to read and insert data from CSV
const seedDatabase = async () => {
    const messages = [];

    // Read and parse the CSV file
    fs.createReadStream('./GeneralistRails_Project_MessageData.csv') // Update path if necessary
        .pipe(csv())
        .on('data', (row) => {
            // Map CSV columns to your Message model fields
            messages.push({
                customerName: row.customerName, // Replace with actual column name
                content: row.content,         // Replace with actual column name
                agentResponse: row.agentResponse || null,
                lockedBy: row.lockedBy || null,
                lockedAt: row.lockedAt ? new Date(row.lockedAt) : null,
                agentId: row.agentId || null,
                timestamp: row.timestamp ? new Date(row.timestamp) : new Date(),
            });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed. Inserting into MongoDB...');
            try {
                // Insert data into the database
                await Message.insertMany(messages);
                console.log('Data successfully inserted into MongoDB');
                process.exit(); // Exit the script
            } catch (err) {
                console.error('Error inserting data into MongoDB:', err);
                process.exit(1); // Exit with error
            }
        });
};

// Run the seed function
seedDatabase();
