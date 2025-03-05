const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
const dbPassword = "test"
const dbName = "bloglist"

const mongoUrl = `mongodb+srv://jmontion:${dbPassword}@fullstack.bhdsg.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Fullstack`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('', (request, response) => {
    const formattedDate = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long' });
    const timeStamp = new Date().toString();

    response.send(`
        <div>
            <h2>Test screen blog list backend</h2>
            <h2>${timeStamp}</h2>
        </div>
    `);
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})