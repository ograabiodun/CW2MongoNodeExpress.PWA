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


//get Login
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 100,
    activeDuration: 5 * 60 * 1000,
  })
  );

//login page/ default page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html');
  
  });

  //log in as users or Admin
app.get("/showallrecord", (req, res) => {

    const dbo = p.db("MuDB");
    
    dbo.collection('courses').find().toArray(function(err, results) {
     
    if(results)
      {
    
      console.log(results.toArray)
    
    // to see the first element
      res.send(results)
    
      }
    
    else
     console.log(err)
    
      // send HTML file populated with quotes here
    })
    
    });

// SHOW LOG THAT NODE SERVER STARTED
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
   });