var express = require('express');
var router = express.Router();
let _ = require('lodash');
var mongoose = require('mongoose');


const User = require('../models/User');
/* GET users listing. */


router.post("/", async function (req, res) {
  let {
    name,
    todos
  } = req.body;

  try {
    let user = new User();
    user.name = name;
    let objectIds = todos.split(',').map(id => mongoose.Types.ObjectId(id));
    user.todos.push(...objectIds)
    await user.save()
    console.log("user: ", JSON.stringify(user));
    if (_.isEmpty(user)) {
      res.status(500).json({
        message: 'unable to create user'
      })
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'unable to create user',
      err: JSON.stringify(err)
    })
  }
});

router.get("/", async function (req, res) {
  let {
    id
  } = req.params;

  try {
    let user = await User.find().populate('todos');
    console.log("user: ", JSON.stringify(user));
    if (_.isEmpty(user)) {
      res.status(500).json({
        message: 'unable to find user'
      })
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'unable to find user',
      err: JSON.stringify(err)
    })
  }
});

module.exports = router;