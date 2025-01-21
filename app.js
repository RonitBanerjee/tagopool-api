// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());

// MongoDB connection string (replace with your own credentials)
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
let db;
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db('tagopool'); // Explicitly set the database to "tagopool"
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// API endpoint to create a new tender
app.post('/api/tenders', async (req, res) => {
  try {
    const payload = req.body;

    // Insert the payload directly into the tenders collection
    const result = await db.collection('tenders').insertOne(payload);

    res.status(201).json({
      message: 'Tender created successfully',
      result: result,
    });
  } catch (error) {
    console.error('Error occurred while saving to tagopool.tenders:', error);
    res.status(500).json({ message: 'An error occurred while creating the tender' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
