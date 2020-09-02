var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app_api/routes/api')(router);
var path = require('path');


//middleware(maintain order)
app.use(morgan('dev'));
app.use(bodyparser.json()) ; //for parsing application/json
app.use(bodyparser.urlencoded({ extended: true }));
//use this middleware to allow front-end to access the app_client folders(static location)
app.use(express.static(__dirname+ '/app_client'));
//backend-api routes
app.use('/api', appRoutes);


mongoose.connect('mongodb://localhost:27017/movie', function(err){
    if (err){
        console.log("Not connected to Database!");
    }
    else{
        console.log("Successfully connected to Database!");
    }
});

//no matter what user gives it directs to or feeds them index.html 
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+ '/app_client/app/views/index.html'));
});




app.listen(port, function(){
    console.log("Running the server : " + port);
});
