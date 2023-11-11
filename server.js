const express = require('express'); 
const MongoClient = require('mongodb').MongoClient; 
const mongodb = require('./db/connect'); 
const bodyParser = require("body-parser");
const app = express();


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes')); 

mongodb.initDb((err, mongodb) => { 
    if (err) {                         
      console.log(err);
    } else {
      app.listen(port);
      console.log('Database connected and Web Server is listening at port ' + (port));
    }
});
