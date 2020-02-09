const express = require("express");
const session = require("client-sessions");
const PORT = 1234;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

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

    //adminBoard page
app.get("/search", (req, res) => {
    res.sendFile(__dirname + '/adminBoard.html');
  
  });

  //userBoard page
app.get("/user_success", (req, res) => {
    res.sendFile(__dirname + '/userBoard.html');
  
  });

  //courses search 
app.get("/allcourses", (req, res) => {

    const dbo = p.db("MuDB");
    
    dbo.collection('courses').find().toArray(function(err, results) {
     
    if(results)
      {
    
      console.log(results.toArray)
    
    // to see the first element
      res.json(results)
    
      }
    
    else
     console.log(err)
    
      // send HTML file populated with quotes here
    })
    
    });

    //show all comments 
app.get("/allcomments", (req, res) => {

    const dbo = p.db("pwaCW2");
    
    dbo.collection('comments').find().toArray(function(err, results) {
     
    if(results)
      {
    
      console.log(results.toArray)
    
    // to see the first element
      res.json(results)
    
      }
    
    else
     console.log(err)
    
      // send HTML file populated with quotes here
    })
    
    });

    ////user and Admin register 1
app.post('/form_decision', (req, res) => {
    console.log('usertype:', req.body['usertype']);
    console.log('Got Name:', req.body['name']);
  
  var u_name = req.body['name'];
  var u_pass = req.body['password'];
  var u_email = req.body['email'];
  var u_usertype = req.body['usertype'];
  
  //mongo connection for the registeration
  const dbo1 = p.db("pwaCW2");
  
  dbo1.collection('userdetails').save({name: u_name, email:u_email ,password:u_pass, usertype:u_usertype}, (err, result) => {
     if (err) return console.log(err)
  
     console.log('saved to database')
     res.redirect('/user')
  
   })
  
  //user and Admin register 2
  if(u_usertype=='user')
    res.redirect('/user_success');
  
  else if (u_usertype=='provider')
    res.redirect('/search');
  });

// SHOW LOG THAT NODE SERVER STARTED
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
   });