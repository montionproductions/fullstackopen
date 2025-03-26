import { useState, useEffect } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, user, onLike, setBlogsUpdated}) => {
  const [showAll, setShowAll] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const handleViewButton = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
    setButtonText(!showAll ? 'hide' : 'view')
  }

  const handleLikeButton = async () => {
    //event.preventDefault()
    const {id, title, author, url, likes} = blog
    console.log("handleLike, ", id, user.username, user.token)
        try {
          const updatedBlog = {
            title,
            author,
            url,
            likes: likes + 1, // Actualizar solo los likes
          };
          
          const response = await blogService.updateLikes(id, updatedBlog, user.token)
          console.log(response)
          if(onLike) {
            onLike()
          }
          setBlogsUpdated(true)
        } catch (exception) {
          console.log(exception)
        }
  }

  const hookRemove = async () => {
    try {     
      const response = await blogService.remove(blog.id, user.token)
      //console.log(response)
      setBlogsUpdated(true)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = () => {
    if (window.confirm("Do you really want remove this?")) {
      hookRemove()
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}<button onClick={handleViewButton}>{buttonText}</button>
      </div>
      {showAll && (
        <div>
          <p>Likes: {blog.likes}</p>
          <p>Url: {blog.url}<button onClick={handleLikeButton}>like</button></p>
          <p>Author: {blog.author}</p>
          {blog.author === user.username ? 
            <button onClick={handleRemove}>remove</button> : <></>}
        </div>
      )}
    </div>  
  )
}

export default Blog