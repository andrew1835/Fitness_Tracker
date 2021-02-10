var express = require("express");
const mongoose = require('mongoose');
var compression = require("compression");
const logger = require("morgan");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(compression());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnesstracker", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    // res.send('howdy there');
    res.sendFile('./index.html')
})











app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});