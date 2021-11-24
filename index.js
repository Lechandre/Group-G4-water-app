
let express = require('express');
let app = express();
const exphbs  = require('express-handlebars');
//const exphbs = require('express-handlebars'); 

const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); 

//app.get("/", function(req, res){
  //res.send("Water Usage WebApp");
//});



//app.engine('handlebars', exphbs({
  //layoutsDir : './views/layouts'
//})); 

//app.set('view engine', 'handlebars'); 


const path = require('path');
//Configuring express handlebars
var hbs = exphbs.create({
  helpers: {
      getStringifiedJson: function (value) {
          return JSON.stringify(value);
      }
  },
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

//app.get("/", function(req, res){
  
  //res.send("Water Usage App");
//});


open({
  filename: './usage.db', 
  driver: sqlite3.Database
}).then(async function (db) {
  await db.migrate(); 

  app.get('/', function (req, res) {
    res.render('login-screen');
  

  

    db
    .all('select * from register')
    .then(function(register){

      console.log(register); 

    
       
    })

  });
    
    
    app.get('/login-screen', function (req, res) {
      res.render('login-screen');
    });

    app.get('/register-screen', function (req, res) {
      res.render('register-screen');
    });
  
  app.get('/leak-screen', function (req, res) {
    res.render('leak-screen');
  });

  app.get('/weekly-usage-screen', function (req, res) {
    res.render('weekly-usage-screen');
  });

  app.get('/month-usage-screen', function (req, res) {
    res.render('month-usage-screen');
  });
  
  app.get('/history-screen', function (req, res) {
    res.render('history-screen');

    db
    .all('select * from history')
    .then(function(history){

      console.log(history); 

    
       
    })

    
  });
  
  app.get('/update-screen', function (req, res) {
    res.render('update-screen');
  });

  app.get('/daily-usage-screen', function (req, res) {
    res.render('daily-usage-screen');
  });

  //app.post('/login',  function (req, res) {
    
    //console.log(req.body); 
  
    //res.redirect('daily-usage-screen'); 
  //});

  app.post('/login',  function (req, res) {
    
    console.log(req.body); 
  
    res.redirect('leak-screen'); 
  });

  app.post('/register-screen',  function (req, res) {
    
    console.log(req.body); 



  res.redirect('leak-screen');  
  
  });

  app.post('/registration',  function (req, res) {
    
    console.log(req.body); 



  res.redirect('register-screen');  
  
  });

  app.post('/leak-screen',  function (req, res) {
    
    console.log(req.body); 

    res.redirect('daily-usage-screen');
  
  }); 
  
  app.post('/history-screen',  function (req, res) {
      
      console.log(req.body); 

      res.redirect('history-screen');
  
    });
  
    app.post('/update-screen',  function (req, res) {
      
      console.log(req.body); 

      res.redirect('update-screen');
    
    });

  app.post('/daily-usage-screen',  function (req, res) {
    
    console.log(req.body); 

    res.redirect('daily-usage-screen');
  
  });

  app.post('/weekly-usage-screen',  function (req, res) {
    
    console.log(req.body); 

    res.redirect('weekly-usage-screen');
  
  });

  app.post('/month-usage-screen',  function (req, res) {
    
    console.log(req.body); 

    res.redirect('month-usage-screen');
  
  });


})

let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});








//app.get('/', function (req, res) {
  //res.render('home');
//});












  


