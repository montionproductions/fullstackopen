const express = require('express')
const app = express()

app.use(express.json())

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
    persons = persons.filter(persons => persons.id !== id)
    
    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name) {
        return response.status(400).json({
            error:'content missing'
        })
    }

    const personsObj = {
        name: body.name,
        id: generateId()
    }

    personsObj = personsObj.concat(personsObj)
    response.json(personsObj)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})