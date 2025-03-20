import { useState } from "react"

const Blog = ({blog}) => {
  const [showAll, setShowAll] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const handleViewButton = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
    setButtonText(!showAll ? 'hide' : 'view')
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
          <p>Url: {blog.url}<button>like</button></p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>  
  )
}

export default Blog