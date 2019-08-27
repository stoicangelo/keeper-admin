const express = require('express');
const path = require('path');
const app = express();
const mgoose = require('mongoose');
const Schema = mgoose.Schema;
const bodyParser = require('body-parser');


mgoose.connect('mongodb://localhost:27017/crudDB', {useNewUrlParser: true}, function(err){
    if(err){
        console.log('error occured!.. '+err);
    }
    else{
        console.log('connected to mongo');
    }
});
var bookSchema = new Schema({
    title : String,
    author : String,
    publishDate : Date,
    price : Number
});
var Book = mgoose.model('Book', bookSchema);


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('images'));


app.get('/', function(req, res){
    //res.sendFile(__dirname+'/public/index.html');
    res.render('index');
});

app.get('/insert', function(req, res){
    res.render('insert');
    //res.sendFile(__dirname+'/public/insert.html');
});

app.post('/insert', function(req, res) {
    var book_title = req.body.ititle;
    Book.findOne({title : book_title}).then(function(result){
            var book = new Book();
            book.title = book_title;
            book.author = req.body.iauthor;
            book.publishDate = req.body.ipubdate;
            book.price = req.body.iprice;
            book.save(function(err) {
                if(err){
                    console.log('error occured while inserting Book record : '+err);
                }
                else{
                    console.log('insert hoye geche');
                    res.redirect('/viewall');
                }
            });
    }).catch(function(err){
        console.log('error is : '+err.toString());
    });
});

app.get('/viewall', function(req, res){
    Book.find({}).then(function(result){
        if(result.length){
            res.render('view-all', {data : result});
        }
        else{
            res.redirect('/');
        }
    });
});

app.get('/delete', function(req, res){
    var book_title = req.query.title;
    Book.deleteMany({title : book_title}, function(err){
        if(err){
            console.log('error occured while deleting : '+err);
        }
        res.redirect('/viewall');
    });
});

app.listen(3000, function(){
    console.log('listening on port 3000');
    console.log('enjoy');
});