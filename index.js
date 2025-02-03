const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())

let persons = [
    {
       id: "1",
       name: "Arto Hellas",
       number: "040-123456" 
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523" 
     },
     {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345" 
     },
     {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122" 
     }
]

app.use(express.json())
app.use(morgan('tiny'))


// GET etusivu
app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo backend</h1>')
})

// GET all
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET by id
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    //jos id on olemassa 
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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
    const person = request.body
    console.log(request.body)
    
    // arvotaan luku 1-10000, joka annetaan id:nä
    const generateId = Math.floor(Math.random() * 10000)
    person.id = String(generateId)

    // katsotaan onko nimi olemassa persons taulukossa
    const nameExists = persons.find(person => person.name.toLowerCase() === request.body.name.toLowerCase())
    
    // jos nimi on tyhjä error:
    if (!person.name) {
        return response.status(400).json({
            error: 'name is missing'
        })     
    }
    // jos numero on tyhjä error:
    if (!person.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }
    // jos nimi on jo olemassa error:
    if(nameExists) {
        return response.status(400).json({
            error:'name must be inique'
        })
    }

    // uusi taulukko jossa request.bodynä saatu henkilö
    persons = persons.concat(person)
    
    console.log(generateId)
    console.log(person)
    
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})