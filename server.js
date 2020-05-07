const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.json({ message: "Hola World!"})
})

server.post('/api/')

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})