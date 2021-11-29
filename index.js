let express = require('express');
let app = express();
const exphbs = require('express-handlebars');
//const exphbs = require('express-handlebars');
const stats = require('stats-analysis');


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

open({
  filename: './usage.db',
  driver: sqlite3.Database
}).then(async function (db) {
  await db.migrate();

    app.get('/', async function (req, res) {

      const register = await db.all('select * from register')
      res.render('login-screen', {
        register
      });

    });
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

  app.get('/alert-screen', function (req, res) {
    res.render('template', { usageList: arr })
  });

  app.get('/history-screen', function (req, res) {
    res.render('history-screen');

    db
      .all('select * from history')
      .then(function (history) {

        console.log(history);
      })


  });



  app.get('/daily-usage-screen', function (req, res) {
    res.render('daily-usage-screen');
  });


  app.post('/login',  function (req, res) {

  console.log(req.body); 

  res.redirect('daily-usage-screen'); 
  });

  app.post('/login', function (req, res) {

    console.log(req.body);

    res.redirect('daily');
  });

  app.post('/alert-screen', function (req, res) {

    console.log(req.body);

    res.redirect('alert-screen');
  });

  app.post('/register-screen', function (req, res) {

    console.log(req.body);

    res.redirect('daily');

  });

  app.post('/registration', function (req, res) {

    console.log(req.body);

    res.redirect('register-screen');

  });

  app.post('/leak-screen', function (req, res) {

    console.log(req.body);

    res.redirect('daily-usage-screen');

  });

  app.post('/history-screen', function (req, res) {

    console.log(req.body);

    res.redirect('history-screen');

  });



  app.post('/daily-usage-screen', function (req, res) {

    console.log(req.body);

    res.redirect('daily-usage-screen');

  });

  app.post('/weekly-usage-screen', function (req, res) {

    console.log(req.body);

    res.redirect('weekly-usage-screen');

  });

  app.post('/month-usage-screen', function (req, res) {

    console.log(req.body);

    res.redirect('month-usage-screen');

  });

  const dailyUsage = [
    { value : 15, status : ''},
    // { value : 17, status : ''},
    // { value : 16, status : ''},
    // { value : 11, status : ''},
    // { value : 16, status : ''},
    // { value : 9, status : ''},
   ];

  const weeklyUsage = [
    { value : 55, status : ''},
    // { value : 17, status : ''},
    // { value : 16, status : ''},
    // { value : 11, status : ''},
    // { value : 16, status : ''},
    // { value : 9, status : ''},
   ];
  const monthlyUsage = [
    { value : 85, status : ''},
    // { value : 17, status : ''},
    // { value : 16, status : ''},
    // { value : 11, status : ''},
    // { value : 16, status : ''},
    // { value : 9, status : ''},
   ];

  app.get('/daily', function(req, res) {

    let values = dailyUsage.map (o => o.value);
    const currentMean = stats.mean(values).toFixed(2);

    res.render('template', {
      heading : "Daily",
      usageList : dailyUsage,
      mean : currentMean
    })
  });

  app.get('/weekly', function(req, res) {

    let values = weeklyUsage.map (o => o.value);
    const currentMean = stats.mean(values).toFixed(2);

    res.render('template', {
      heading : "Weekly",
      usageList : weeklyUsage,
      mean : currentMean
    })
  });

  app.get('/monthly', function(req, res) {

    let values = monthlyUsage.map (o => o.value);
    const currentMean = stats.mean(values).toFixed(2);

    res.render('template', {
      heading : "Monthly",
      usageList : monthlyUsage,
      mean : currentMean
    })
  });


  function processInput(inputValues, latest_usage, offset = 5) {
    const currentUsage = Number(latest_usage);

    let values = inputValues.map (o => o.value);
    const currentMean = stats.mean(values);
    let type = 'normal';

    if (currentUsage >= (currentMean + offset)) {
      type = 'wasted';
    } else if (currentUsage <= (currentMean - offset)) {
      type = 'saved';
    } else {
      type = 'normal'
    }

    inputValues.push({
      value : currentUsage,
      status : type
    });

    return {
      type,
      currentMean,
      // values
    };
  }

  app.post('/submit_usage', function (req, res) {
        
    const latest_usage = req.body.latest_usage;
    const screenType = req.body.type;

    console.log(screenType);

    let usage = [];

    if (screenType === 'Daily') {
      usage = dailyUsage;
    } else if (screenType === 'Weekly') {
      usage = weeklyUsage;
    } else if (screenType === 'Monthly'){
      usage = monthlyUsage;
    }

    const result = processInput(usage, latest_usage, 3);

    const type = result.type;

    let messageStyle = type;

    let message = "";
    
    if (type === "saved") {
      message = "Well done, you saved water"
    } else if (type === "wasted") {
      message = "Yikes you used more water this month. Slow down!"
    } else  {
      message = "Your usage is consistent with your past water usage."
    }

    res.render('template', {
      usageList: usage,
      messageStyle,
      message,
      mean : result.currentMean.toFixed(),
      heading : screenType
    });
  });

  app.post('/submit_weekly_usage', function (req, res) {
        
    const latest_usage = req.body.latest_usage;
    const result = processInput(weeklyUsage, latest_usage, 5);

    const type = result.type;

    let messageStyle = type;

    let message = "";
    
    if (type === "saved") {
      message = "Well done, you saved water"
    } else if (type === "wasted") {
      message = "Yikes you used more water this month. Slow down!"
    } else  {
      message = "Your usage is consistent with your past water usage."
    }

    res.render('weekly_template', {
      usageList: dailyUsage,
      messageStyle,
      message,
      mean : result.currentMean.toFixed()
    });
  });

  app.post('/submit_usage', function (req, res) {
        
    const latest_usage = req.body.latest_usage;
    const result = processInput(dailyUsage, latest_usage, 3);

    const type = result.type;

    let messageStyle = type;

    let message = "";
    
    if (type === "saved") {
      message = "Well done, you saved water"
    } else if (type === "wasted") {
      message = "Yikes you used more water this month. Slow down!"
    } else  {
      message = "Your usage is consistent with your past water usage."
    }

    res.render('template', {
      usageList: dailyUsage,
      messageStyle,
      message,
      mean : result.currentMean.toFixed()
    });
  });


  let PORT = process.env.PORT || 3007;

  app.listen(PORT, function () {
    console.log('App starting on port', PORT);
  });