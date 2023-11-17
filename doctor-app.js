// doctor-app.js

const express = require('express');
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.resolve(__dirname, 'public')));

let dbConn;

mongodb.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
    .then((client) => {
        dbConn = client.db('first');
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.get('/doctor-view-feedbacks', (req, res) => {
    if (!dbConn) {
        res.status(500).send("Database connection not established.");
        return;
    }

    dbConn.collection('feedbacks').find({}).toArray()
        .then((feedbacks) => {
            res.status(200).json(feedbacks);
        })
        .catch((error) => {
            console.error("Error retrieving data from MongoDB:", error);
            res.status(500).send('An error occurred while retrieving the data.');
        });
});

app.listen(PORT, () => {
    console.log(`Doctor's server is running on port ${PORT}`);
});
