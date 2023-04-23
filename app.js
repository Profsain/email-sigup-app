const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser

const app = express(); // initialize express
app.use(bodyParser.urlencoded({ extended: true })); // use body-parser middleware

// setup routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// form post route
app.post('/', (req, res) => {
    console.log(req.body);
});

// listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));