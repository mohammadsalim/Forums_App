// REQUIRE

var express =  require('express')
    server  =  express(),
    ejs     =  require('ejs'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan  =   require('morgan'),
    mongoose =  require('mongoose'),
    session =   require('express-session');

// HEROKU

var PORT = process.env.PORT || 3000;
var MONGOURI = process.env.MONGOLAB_URI ||
'mongodb://localhost:27017/forums_app'

// SET

server.set('views', './views');
server.set('view engine', 'ejs');

// USE
// Need more explanation for resave and saveUnititialized
server.use(session({
  secret: "thisismysecret",
  resave: true,
  saveUninitialized: false
}));

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(express.static('./public'));
server.use(methodOverride('_method'));
server.use(morgan('short'));
server.use(expressLayouts);

// ROUTES + CONTROLLERS

var forumsController = require('./controllers/forums.js')
server.use('/forums', forumsController);

server.get('/', function(req,res){
  res.render('welcome')
});

// CATCHCALL ROUTES

server.use(function(req,res){
  res.send("This is not the web page you are looking for..")
});

// DATABASE + SERVER

mongoose.connect(MONGOURI)
var db = mongoose.connection;

db.on('error', function(){
  console.log("DeathStar shields are down.");
});

db.once('open', function(){
  console.log("DeathStar shields are operational.");
  server.listen(PORT, function(){
    console.log("DeathStar superlaser is primed and ready.")
  });
});
