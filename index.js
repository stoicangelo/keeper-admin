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

app.get('/insert-one', function(req, res){
    res.render('insert-one');
    //res.sendFile(__dirname+'/public/insert.html');
});

app.post('/insert-one', function(req, res) {
    var book_title = req.body.ititle;
    Book.findOne({title : book_title}).then(function(result){
            if(!result){
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
            }
            else{
                res.render('insert-one', {bookExists : true});
            }
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

app.get('/detail', function(req, res){
    var book_title = req.query.title;
    Book.findOne({title : book_title}).then(function(result){
        res.render('view-one', {data : result});
    }).catch(function(err){
        console.log('Error occured while fetching book info : '+err);
    });
});

app.post('/update', function(req, res) {
    var book_title = req.body.utitle;
    Book.findOne({title : book_title}).then(function(result){
        if(result){
            result.title = book_title;
            result.author = req.body.uauthor;
            result.publishDate = req.body.upubdate;
            result.price = req.body.uprice;
            result.save(function(err) {
                if(err){
                    console.log('error occured while inserting Book record : '+err);
                }
                else{
                    console.log('update hoye geche');
                    res.redirect('/viewall');
                }
            });
        }
    }).catch(function(err){
        console.log('error is : '+err.toString());
    });
});

app.listen(3000, function(){
    console.log('listening on port 3000');
    console.log('enjoy');
});