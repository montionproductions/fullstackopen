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


app.get('/api/persons/:id', (request, response, next) => {
    console.log(request.params.id)
    Person.findById(request.params.id).
    then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).end()
        }  
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const data = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, data, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

  app.post('/api/persons', async (request, response, next) => {
    try {
        const { name, number } = request.body;

        if (!name) {
            throw new Error('Name is missing'); // Lanza un error en lugar de enviar respuesta aquí
        }

        if (!number) {
            throw new Error('Number is missing'); // Lanza un error en lugar de enviar respuesta aquí
        }

        // Verifica si la persona ya existe
        const existingPerson = await Person.findOne({ name });

        if (existingPerson) {
            throw new Error('Name must be unique'); // Lanza un error en lugar de enviar respuesta aquí
        }

        // Crea y guarda la nueva persona
        const person = new Person({ name, number });
        const savedPerson = await person.save();

        response.json(savedPerson);
    } catch (error) {
        next(error); // Pasa el error al middleware de manejo de errores
    }
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError' || error.number === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if(error.name === undefined || error.number === undefined) {
      return response.status(400).send({ error: 'Name or number invalid' })
    }
  
    next(error)
  }
  
// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})