import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import BlogCreator from './components/BlogCreator'
import ErrorHandler from './components/ErrorHandler'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [blogs, setBlogs] = useState([])
  const [errorInfo, setErrorInfo] = useState('')
  const [errorType, setErrorType] = useState('success')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("handleLogin, ", username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log("username: ", user)
      setErrorType('success')
      setErrorInfo('User successfuly logged!')
      setTimeout(() => {
        setErrorInfo('')
      }, 3000)
    } catch (exception) {
      setErrorType('error')
      setErrorInfo('Wrong username or password')
      setTimeout(() => {
        setErrorInfo(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        title, author, url
      })
      console.log("Blog added: ", response)
      setBlogs((prevBlogs) => [...prevBlogs, response]);
      setErrorType('success')
      setErrorInfo('Blog was successfuly created by: ' + user.username)
      setTimeout(() => {
        setErrorInfo('')
      }, 5000)
    } catch (exception) {
      console.log("Blog error: ", exception)
      setErrorType('error')
      setErrorInfo('Something was wrong')
      setTimeout(() => {
        setErrorInfo('')
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    //console.log('..')
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  return (
    <div>
      <ErrorHandler
        msg={errorInfo}
        typeError={errorType}/>
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        inputHandle={handleLogin}
        user={user}
        handleLogout={handleLogout}
      />
      {user !== null ? (
      <>
        <BlogCreator
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          inputHandle={handleAddBlog}
        />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>) : <></>}
      
    </div>
  )
}

export default App