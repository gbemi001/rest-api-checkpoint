const express = require('express');
const { append } = require('express/lib/response');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const User = require('./models/User');
const { Router } = require('express');

const server = express()

//Database 
mongoose.connect('mongodb://localhost/UserList')
const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to MongoDB ')
})

//Routes
server.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)

})

server.post('/new', async (req, res) => {
    const newUser = new User(req.body)
    
    const savedUser = await newUser.save()

    res.json =(savedUser)
})

server.listen(3000, console.log('Listening on port 3000'))

module.exports = server
