const router = require('express').Router();

const Todo = require('../models/Todo.model');
const User = require('../models/User.model');


//Routes

router.post('/', async (req, res, next) => {
    const { description, done } = req.body;
    const { _id: userId } = req.payload;
    try {
        if(!description) {
            res.status(400).json({message: 'You must add a description'});
            return;
        }

        const newTask = await Todo.create({ description, done, userId });
        const user = await User.findById(userId);
        user.todos.push(newTask._id);
        user.save();
        res.status(200).json(newTask);
    } catch (error) {
        next(error);
    }
});

router.get('/tasks', async (req, res, next) => {
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

router.put('/done/:todoId', async (req, res, next) => {
    const { todoId } = req.params;
    const { done } = req.body;
    try {
        const taskDone = await Todo.findByIdAndUpdate(todoId, done);
        res.status(200).json(taskDone);
    } catch (error) {
        next(error);
    }
});

router.delete('/:todoId', async(req, res, next) => {
    const { todoId } = req.params;
    const { _id: userId } = req.payload;

    try {
        await Todo.findByIdAndDelete(todoId);
        const user = await User.findById(userId);
        user.todos.splice(todoId);
        user.save();
        res.status(404).json();
    } catch (error) {
        next(error);
    }
});

module.exports = router;