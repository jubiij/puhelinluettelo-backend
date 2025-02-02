const express = require('express')

const app = express()

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


// get etusivu
app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelo backend</h1>')
})

// get all
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// get by id
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

// get info page
app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})