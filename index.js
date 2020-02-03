const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./models/tasksModel');

mongoose.connect('mongodb://localhost:27017/CRUD');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('addOrEdit', {
        title: 'Insert Task',
        oldtask: req.body
    })
    // res.end();
})

app.post('/', (req, res) => {
    if (req.body._id == '') {
        var task = new Task();
        task.taskName = req.body.taskName;
        // task.active = req.body.donelist == undefined ? false : true;
        // if (req.body.donelist == undefined) {
        
            
        // }
        
        task.save((err, data) => {
            if(!err) {
                res.redirect('/tasks');
            }
        })    
    } else {
        Task.findOneAndUpdate({_id : req.body._id}, req.body, {new: true}, (err, task)=>{
            if (!err) {
                res.redirect('/tasks');
            }
        })
    }
    
})

app.get('/tasks', (req, res) => {
    Task.find((err, task) => {
        if(!err) {
            res.render('main', { 
                task
                 
            });
            res.end();
        } else {
            console.log(err);
            
        }
    })
})

app.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('addOrEdit', {
                title: "Edit task",
                oldtask: doc
            })
        }
    })
    // console.log(req.params.id);
    
})

app.get('/delete/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, task)=>{
        if (!err) {
            res.redirect('/tasks')
        }
    })
})

app.listen(8080, () => {
    console.log("Running...");
})