const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/bloglist')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
let token = ""

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('testpassword', 10)
        const user = new User({ username: 'root', passwordHash: passwordHash })

        await user.save()

        const passwordHash2 = await bcrypt.hash('testpassword', 10)
        const user2 = new User({ username: 'super_admin', passwordHash: passwordHash2 })

        await user2.save()
    })

    test('login succeds', async () => {     

        const loginInfo = {
            username: "super_admin",
            password: "testpassword"
        }

        const result = await api
        .post('/api/login')
        .send(loginInfo)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        console.log("token: ", result.body.token)
        token = result.body.token

        assert.strictEqual(result.body.username.toString(), 'super_admin')
    })

    test('add blog without token', async () => {     
        
        const blog = {
            title: "Test 1",
            url: "url/test.com"
        }

        const result = await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('add blog with token', async () => {    
        const loginInfo = {
            username: "super_admin",
            password: "testpassword"
        }

        const r = await api
        .post('/api/login')
        .send(loginInfo)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        console.log("token: ", r.body.token)
        const t = r.body.token

        const blog = {
            title: 'Super Admin Blog',
            author: 'super_admin',
            url: 'test/trtrt.com',
            likes: 152
        }

        const result = await api
            .post('/api/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${t}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        //console.log(result.body);
        // Additional assertion to ensure the blog is created
        assert.ok(result.body.id)  // Assuming the response contains the blog ID
        assert.strictEqual(result.body.title, blog.title)
        assert.strictEqual(result.body.url, blog.url)
    })

    after(async () => {
      await mongoose.connection.close()
      })
})