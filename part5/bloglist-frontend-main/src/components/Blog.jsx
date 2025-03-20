import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog, user}) => {
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
        } catch (exception) {
          console.log(exception)
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
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}<button onClick={handleViewButton}>{buttonText}</button>
      </div>
      {showAll && (
        <div>
          <p>Likes: {blog.likes}</p>
          <p>Url: {blog.url}<button onClick={handleLikeButton}>like</button></p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>  
  )
}

export default Blog