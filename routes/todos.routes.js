const router = require('express').Router();

const Todo = require('../models/Todo.model');


//Routes

router.post('/', async (req, res, next) => {
    const { description, done, userId } = req.body;
    try {
        if(!description) {
            res.status(400).json({message: 'You must add a description'});
            return;
        }

        const newTask = await Todo.create({ description, done, userId });
        res.status(200).json(newTask);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const allTasks = await Todo.find();
        res.status(200).json(allTasks);
    } catch (error) {
        next(error);        
    }
});

router.put('/:todoId', async (req, res, next) => {
    const { todoId } = req.params;
    const { description } = req.body;
    try {
        const task = await Todo.findByIdAndUpdate(todoId, description, {new: true});
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

