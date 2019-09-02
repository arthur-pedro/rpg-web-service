require("dotenv-safe").config({  
    path: process.env.NODE_ENV == "test" ? ".env.exemple" : ".env"
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/* CORS */
var cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes'));

module.exports = app;
          
app.listen(3000, () => console.log("Serer runing..."));