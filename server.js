const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({message: 'Users API is RunNinG...'})
})

const users = []

//--------------------------------------------------------------------------------------------
// Create
//--------------------------------------------------------------------------------------------

server.post('/api/users', postValidate, (req, res) => {
    const user = req.body
    user.id = shortid.generate()
    users.push(user)
    res.status(201).json(user)
})

//--------------------------------------------------------------------------------------------
// Read
//--------------------------------------------------------------------------------------------

server.get('/api/users', (req, res) => {
    if(users) {
        return res.status(200).json(users)
    } else {
        return res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
})

//--------------------------------------------------------------------------------------------
// Delete
//--------------------------------------------------------------------------------------------

server.delete("/users/:id", (req, res) => {
    const { id} = req.params
    const foundUser = users.find(userId => userId.id === id)
    if (foundUser) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

//--------------------------------------------------------------------------------------------
// Validate Function
//--------------------------------------------------------------------------------------------

function postValidate (req, res, next) {
    if(req.body.name == undefined || req.body.bio == undefined || req.body.bio === '' || req.body.name == '') {
        return res.status(404).json({message: "Please provide name and bio for the user."})
    } else {
        return next()
    }
}
const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})