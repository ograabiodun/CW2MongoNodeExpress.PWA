const express = require("express");
const session = require("client-sessions");
const PORT = 1234;
const app = express();

// Retrieve
var db
var p
var MongoClient = require('mongodb').MongoClient; 
MongoClient.connect('mongodb+srv://user:password1234@cluster0-pjbde.mongodb.net/test?retryWrites=true&w=majority', function(err, db) {
  if(!err) {
  p = db
    console.log("Connection successful");
}
  else
  {
  db = client.db('MuDB')
  }
});

// SHOW LOG THAT NODE SERVER STARTED
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
   });