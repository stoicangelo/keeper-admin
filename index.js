const express = require('express');
const path = require('path');
const app = express();
const mgoose = require('mongoose');



app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'jade');
//app.use(express.static('images'));

app.get('/', function(req, res){
    //res.sendFile(__dirname+'/public/index.html');
    res.render('index');
});

app.get('/insert', function(req, res){
    res.render('insert');
    //res.sendFile(__dirname+'/public/insert.html');
});

app.get('/viewall', function(req, res){
    //res.sendFile(__dirname+'/public/view-all.html');
    res.render('view-all');
});

app.listen(3000, function(){
    console.log('listening on port 3000');
});