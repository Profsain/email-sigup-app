const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const https = require('https'); // import https
const port = process.env.PORT || 3000;

const app = express(); // initialize express
app.use(bodyParser.urlencoded({ extended: true })); // use body-parser middleware

// setup routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// form post route
app.post('/', (req, res) => {
    const firstname = req.body.firstname;
    const lasttname = req.body.lastname;
    const email = req.body.email;

    // make request to mailchimp api
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lasttname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us14.api.mailchimp.com/3.0/lists/4f1f5d8215';

    const options = {
        method: 'POST',
        auth: 'profsain1:c08608c8c77531f06bb26a298f4340c3-us14'
    };

    const request = https.request(url, options, (response) => {
        // check if request was successful and render success or failure page
        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }

        // log response
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        });
    });

    // send request
    request.write(jsonData);
    request.end();
});

// success route redirect
app.post('/success', (req, res) => {
    res.redirect('/');
});

// failure route
app.post('/failure', (req, res) => {
    res.redirect('/');
});

// listen on port 3000
app.listen(port, () => console.log('Server running on port 3000'));

