var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');

/* GET home page. */
router.get('/', async function (req, res) {
  let todos = await Todo.find();
  res.json({
    todos
  });
});

router.post('/todos', async function (req, res) {
  //add todos
  let {
    todo_desc,
    todo_heading,
    todo_priority,
    todo_completed
  } = req.body;
  try {

    let user = await User.findOne();
    let todo = await Todo.create({
      todo_desc,
      todo_completed,
      todo_priority,
      todo_heading,
      user: user._id
    })
    res.json({
      message: 'todo created successfully',
      todo
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to create a todo',
      err: JSON.stringify(err)
    })
  }

});

module.exports = router;