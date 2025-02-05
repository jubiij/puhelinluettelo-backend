require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./modules/person')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())


app.use(express.json())
app.use(morgan('tiny'))



app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo backend</h1>')
})

// GET all
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// GET by id
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

// GET info page
app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// POST
app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (body.name === "" || body.number === "") {
        return response.status(400).json({ error: 'name or number missing!'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})
 
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})