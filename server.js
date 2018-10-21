const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

// Make use of bodyParser cause of URL-encoding
app.use(bodyParser.urlencoded({extended: true}));

// Database connection establishment
MongoClient.connect(db.url, (error, client) => {
  if (error) return console.log(error);

  // Extraxting database object
  const db = client.db('rpm_database')
  // Routes connection
  require('./app/routes')(app, db);

  // Server start
  app.listen(port, () => {
    console.log('Server is running at port ' + port);
  });
})
