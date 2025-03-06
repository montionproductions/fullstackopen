const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

/*const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})*/

test('dummy returns one', () => {
  const blogs = [{
    title: "Test name 1",
    author: "Author name test",
    url: "url/test",
    likes: 2
  }]

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})