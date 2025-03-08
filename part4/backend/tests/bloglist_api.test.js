const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')

const api = supertest(app)


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObject = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Most blog', () => {

/*test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
})

test('id and not _id', async () => {
    const response = await api.get('/api/blogs')

    //console.log(response.body)
    assert.strictEqual(response.body._id, undefined)
    assert.strictEqual(response.body[0].id, '5a422a851b54a676234d17f7')

})

test('a specific blog can be added', async () => {
    const blog = {
        title: "Test Title",
        author: 'Test Author2',
        url: "test/url.com",
        likes: 0
    }

    // Guardamos el número inicial de blogs
    const initialBlogs = await api.get('/api/blogs')
    
    console.log("Initial db:", initialBlogs.body)

    const resultBlog = await api
        .post(`/api/blogs`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(resultBlog.body.title, blog.title)
    assert.strictEqual(resultBlog.body.author, blog.author)
    assert.strictEqual(resultBlog.body.url, blog.url)
    assert.strictEqual(resultBlog.body.likes, blog.likes)

    const blogsAtEnd = await api.get('/api/blogs')
    console.log("end db:", blogsAtEnd.body)
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.body.length + 1)
})
test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert(contents.includes('Amigos'))
  })

test('blog without title is not added', async () => {
    const blog = {
        author: "Test Author",
        url: "http:test",
        likes: 9
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const id = '5a422a851b54a676234d17f7'

    const resultBlog = await api
        .get(`/api/blogs/${id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body.title, "React patterns")
})

test('a blog can be deleted', async () => {
    const id = '5a422a851b54a676234d17f7'

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    assert(titles.includes('Go To Statement Considered Harmful'))
})

test('a blog without likes', async () => {
    const blog = {
        title: "Title Test 2",
        author: "Test Author",
        url: "http:test",
    }

    const jsonCreated = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    console.log("json created:", jsonCreated.body)
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('a blog without title nor url', async () => {
    const blog = {
        title: "Title Test 2",
        author: "Test Author",
        likes: 69
    }

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})*/

/*test('Delete a blog', async () => {
    const idToDelete = '5a422a851b54a676234d17f7'

    const response1 = await api.get('/api/blogs')
    assert.strictEqual(response1.body.length, 2)

    await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 1)
})*/

test('Update blog', async () => {
    const idToDelete = '5a422a851b54a676234d17f7'
    const blogData = {
        title: "Title Updated Put",
        author: "T. L",
        likes: 255,
        url: "updated/url.com"
    }

    const response = await api
        .put(`/api/blogs/${idToDelete}`)
        .send(blogData)
        .expect(200)

    console.log("Was updated: ", response.body)
    assert.strictEqual(response.body.title, blogData.title)
})

})

after(async () => {
    await mongoose.connection.close()
    })