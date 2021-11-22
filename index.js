
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


app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');



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
    res.render('home');
  });

  //app.get('/', function (req, res) {

    //db
    //.all('select * from register')
    //.then(function(register){

      //res.render('history-screen');

    //});
      //console.log(register); 
    //})
    
    
  
  
  app.get('/leak-screen', function (req, res) {
    res.render('home');
  });
  
  app.get('/history-screen', function (req, res) {
    res.render('home');
  });
  
  app.get('/update-screen', function (req, res) {
    res.render('home');
  });

  app.get('/usage-screen', function (req, res) {
    res.render('home');
  });

  app.post('/leak-screen',  function (req, res) {
    
    console.log(req.body); 
  
  }); 
  
  app.post('/history-screen',  function (req, res) {
      
      console.log(req.body); 
  
    });
  
    app.post('/update-screen',  function (req, res) {
      
      console.log(req.body); 
    
    });

  app.post('/usage-screen',  function (req, res) {
    
    console.log(req.body); 
  
  });


})

let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});








//app.get('/', function (req, res) {
  //res.render('home');
//});








  


