const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => { 
    const getBlog = await Blog.findById(request.params.id)
    //console.log("Blog title: ", getBlog.title)
    if(getBlog) {
        response.json(getBlog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user
    const blog = new Blog({
        title: body.title,
        author: user.username,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    console.log("blog api was call: ", blog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    console.log("delete was call", request.params.id)

    const user = request.user
    console.log("user", user.id)

    const blog = await Blog.findById(request.params.id)
    if(blog === null) {
        return response.status(401).json({error: 'blog is missing'})
    }

    if ( blog.user.toString() !== user.id.toString() ) {
        return response.status(401).json({error: 'user unauthorized to delete blog'})
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, 
        { $set: { title, author, url, likes } }, { new: true })
    
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter