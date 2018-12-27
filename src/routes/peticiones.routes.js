const express = require('express');
const router  = express.Router();

// petition Model
const Task = require('../models/peticiones');

//Get
router.get('/', async(req,res) =>{
    const tasks = await Task.find();
    res.json(tasks)
});
//Get
router.get('/:id', async(req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//Post
router.post('/', async(req,res) => {
    const {data} = req.body;
    const task = new Task({data});
    await task.save();
    res.json({status: 'saved'})
});

//Update(
router.put('/:id', async(req,res) => {
    const{data} = req.body;
    const newTask = {data};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status:'Updated'});
});

router.delete('/id:', async(req,res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'deleted'});
});

module.exports = router;
