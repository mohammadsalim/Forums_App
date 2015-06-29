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
