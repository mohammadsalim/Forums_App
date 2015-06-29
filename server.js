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

server.get('/', function(req,res){
  res.render('welcome')
});

// CATCHCALL ROUTES

server.use(function(req,res){
  res.send("This is not the web page you are looking for..")
});

// DATABASE + SERVER

mongoose.connect('mongodb://localhost:27017/forums_app')
var db = mongoose.connection;

db.on('error', function(){
  console.log("DeathStar shields are down.");
});

db.once('open', function(){
  console.log("DeathStar shields are operational.");
  server.listen(3000, function(){
    console.log("DeathStar superlaser is primed and ready.")
  });
});
