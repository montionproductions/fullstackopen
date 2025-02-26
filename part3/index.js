const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/info', (request, response) => {
    const formattedDate = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long' });
    const timeStamp = new Date().toString();

    response.send(`
        <div>
            <h2>Phonebook has info for 2 people</h2>
            <h2>${timeStamp}</h2>
        </div>
    `);
});


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = phonebook.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.filter(persons => persons.id !== id)
    console.log("Remainding person: ", person)
   
    response.status(204).end()
})

const generateId = () => {
    return Date.now() + Math.random()
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({
            error:'Name is missing'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error:'Number is missing'
        })
    }

    const existingEntry = phonebook.find(entry => entry.name === body.name);
    if(existingEntry) {
        return response.status(409).json({
            error:'Name is currently in the DB'
        })
    }

    const personsObj = {
        name: body.name,
        id: generateId(),
        number: body.number
    }

    phonebook = phonebook.concat(personsObj)
    response.json(personsObj)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})