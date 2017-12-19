const express = require('express');
const mongoose = require('mongoose');

const app = express();

//1st route 
app.get('/', (req, res) => {
    res.send('Hello Happy :)');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

