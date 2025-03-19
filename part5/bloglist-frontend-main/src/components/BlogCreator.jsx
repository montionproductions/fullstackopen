import Togglable from "./Togglable"

const BlogForm = (props) => {
    const { title, author, url, setTitle, setAuthor, setUrl, inputHandle } = props

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
                    />
                </div>
                <div>author
                    <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>url
                    <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
    </>
    )
}

const BlogCreator = (props) => {
   
    return (
        <>
        <Togglable buttonLabel="new blog">
            <BlogForm 
                title={props.title} 
                author={props.author}
                url={props.url}
                setTitle={props.setTitle}
                setAuthor={props.setAuthor}
                setUrl={props.setUrl}
                inputHandle={props.inputHandle}/>
        </Togglable>
        </>
    )
}
export default BlogCreator