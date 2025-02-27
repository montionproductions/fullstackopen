const express = require('express')
var morgan = require('morgan')
require('dotenv').config()

const app = express()
const Person = require('./models/phonebook')

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''; // Solo muestra el body en POST
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

/*let phonebook = [
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
]*/

app.get('/api/persons/', (request, response) => {
    //response.json(request)
    Person.find({}).then(result => {
            console.log("phonebook")
            console.log(result)
            response.json(result)
          })
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
    console.log(request.params.id)
    Person.findById(request.params.id).then(person => {
        response.json(person)
      })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.filter(persons => persons.id !== id)
    console.log("Remainding person: ", person)
   
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if(body.name === undefined) {
        return response.status(400).json({
            error:'Name is missing'
        })
    }

    if(body.number === undefined) {
        return response.status(400).json({
            error:'Number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})