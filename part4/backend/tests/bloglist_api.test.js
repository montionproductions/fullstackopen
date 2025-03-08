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

test('there are 2 blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
})

test('id and not _id', async () => {
    const response = await api.get('/api/blogs')

    //console.log(response.body)
    assert.strictEqual(response.body._id, undefined)
    assert.strictEqual(response.body[0].id, '5a422a851b54a676234d17f7')

})

/*test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert(contents.includes('Amigos'))
  })*/

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

})

after(async () => {
    await mongoose.connection.close()
    })