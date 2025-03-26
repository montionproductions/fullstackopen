import { useState, useEffect } from "react"
import TogglableForm from "./TogglableForm"
import blogService from "../services/blogs"

const BlogForm = (props) => {
    const { 
        title, 
        author, 
        url, 
        setTitle, 
        setAuthor, 
        setUrl, 
        inputHandle} = props

    return (
    <>
        <h1>Add blog</h1>
            <form onSubmit={inputHandle}>
                <div>title
                    <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={({target}) => setTitle(target.value)}
                    placeholder="title"
                    />
                </div>
                <div>author
                    <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({target}) => setAuthor(target.value)}
                    placeholder="author"
                    />
                </div>
                <div>url
                    <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={({target}) => setUrl(target.value)}
                    placeholder="url"
                    />
                </div>
                <button type="submit">create</button>
            </form>
    </>
    )
}

const BlogCreator = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleAddBlog = async (event) => {
        event.preventDefault()
        
        try {
          const response = await blogService.create({
            title, author, url
          })
          console.log("Blog added: ", response)
          props.setBlogs((prevBlogs) => [...prevBlogs, response]);
          props.setErrorType('success')
          setTitle('')
          setAuthor('')
          setUrl('')
          props.setErrorInfo('Blog was successfuly created by: ' + props.user.username)
          setTimeout(() => {
            props.setErrorInfo('')
          }, 5000)
        } catch (exception) {
          console.log("Blog error: ", exception)
          props.setErrorType('error')
          props.setErrorInfo('Something was wrong')
          setTimeout(() => {
            props.setErrorInfo('')
          }, 5000)
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        handleAddBlog(event)
        if(props.onFormSubmit) {
            props.onFormSubmit()   
        }
    };

    
    return (
        <>
        <TogglableForm buttonLabel="new blog" onFormSubmit={handleSubmit}>
            <BlogForm
                title={title}
                author={author}
                url={url}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setUrl={setUrl}
                inputHandle={props.onFormSubmit}
            />
        </TogglableForm>
        </>
    )
  
}
export default BlogCreator