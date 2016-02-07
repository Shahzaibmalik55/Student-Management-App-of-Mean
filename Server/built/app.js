/// <reference path='./../typings/tsd.d.ts' />
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
// Connecting Database
mongoose.connect('mongodb://student-management:shahzu123@ds059195.mongolab.com:59195/angular2-student-management');
// mongoose.connect('mongodb://localhost:27017/students')
// view engine setup
app.set('views', path.join(__dirname, '../../Client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Static files path
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
var StudentSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    university: String,
    className: String,
    rollNo: Number,
    subject: String,
    id: Date
});
var StudentModel = mongoose.model('Student', StudentSchema);
// loading the Single Page Of Student Management App
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,X-Powered-By,Content-Type");
    console.log(req.method);
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }
    else {
        next();
    }
});
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/getStudents', function (req, res) {
    StudentModel.find(function (err, data) {
        if (err)
            res.send(err);
        else {
            console.log(data);
            res.json(data);
        }
    });
});
app.post('/addStudent', function (req, res) {
    var newStudent = new StudentModel(req.body);
    console.log(req.body);
    newStudent.save();
    StudentModel.find(function (err, data) {
        if (err)
            res.send(err);
        else {
            res.json(data);
        }
    });
});
app.delete('/deleteStudent/:id', function (req, res) {
    StudentModel.remove({ _id: req.params.id }, function () {
        StudentModel.find(function (err, data) {
            res.json(data);
        });
    });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server Listning on 5000');
});
