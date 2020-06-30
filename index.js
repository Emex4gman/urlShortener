require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 700;
require('./models/UrlShorten')
const Database = require('./config/db')


//Connect to MongoDB 
Database.connectDb()

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views')

require("./routes/urlshorten")(app);

//Start server on Port 7000
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});