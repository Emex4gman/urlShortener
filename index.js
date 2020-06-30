require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 7000 || process.env.PORT;


const mongoURI = "mongodb://localhost/url-shortner" || process.env.DATABASEURL;
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useUnifiedTopology: true,
    useNewUrlParser: true
};
//Connect to MongoDB 
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, err);
    console.log(`Connected to MongoDB`);
});

require('./models/UrlShorten')
const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views')

require("./routes/urlshorten")(app);


//Start server on Port 7000
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});