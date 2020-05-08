const express = require('express')
const shortid = require('shortid')

const server = express()

server.use(express.json())


let users = []

//--------------------------------------------------------------------------------------------
// Running the API
//--------------------------------------------------------------------------------------------

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Users API is RunNinG...' })
})


//--------------------------------------------------------------------------------------------
// Create
//--------------------------------------------------------------------------------------------

server.post('/api/users', (req, res) => {
    const user = req.body
    console.log("Create a new user:", user)
    user.id = shortid.generate()
    users.push(user)
    res.status(201).json(user)
})

//--------------------------------------------------------------------------------------------
// Read
//--------------------------------------------------------------------------------------------

server.get('/api/users', (req, res) => {
    if (users) {
        console.log("List of USERS:", users)
        return res.status(200).json(users)
    } else {
        return res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
})

//--------------------------------------------------------------------------------------------
// Delete
//--------------------------------------------------------------------------------------------

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params
    const foundUsers = users.filter(user => user.id !== id)
    if (foundUsers.length === users.length) {
        res.status(400).json({ error: "Thers is no user with that id" })
        console.log("User Dleted:", foundUsers)
    } else if (foundUsers.length === (users.length - 1)) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(users)
    }
})

//--------------------------------------------------------------------------------------------
// Validate Function
//--------------------------------------------------------------------------------------------

// function postValidate(req, res, next) {
//     if (req.body.name == undefined || req.body.bio == undefined || req.body.bio === '' || req.body.name == '') {
//         return res.status(404).json({ message: "Please provide name and bio for the user." })
//     } else {
//         return next()
//     }
// }
const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})