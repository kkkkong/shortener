// require express module
const express = require("express");
// require mongoose module
const mongoose = require("mongoose");
// require body parser
const bodyParser = require("body-parser");

const mongoURI = 'mongodb://localhost/shortner';
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if  (err) console.log('Error', err);
    console.log('Connected to MongDB');
});

// require custom model
require('./models/UrlShorten');



const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Controll-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,x-access-token,X-Key"
    );
    if(req.method == "OPTIONS") {
        res.status(200).end();

    }else {
        next();
    }
})
app.use(bodyParser.json());

// require custom model
require("./routes/urlshorten")(app);

const PORT = 9000;

// start server on port 9000
app.listen(PORT, () => {

    console.log('Server Start on port', PORT);
});