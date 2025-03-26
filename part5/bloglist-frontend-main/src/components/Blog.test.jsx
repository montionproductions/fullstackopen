import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect, vi } from 'vitest'
import BlogCreator from './BlogCreator'
import { useState } from 'react'

describe('blog tests', () => {
    const blog = {
        title: 'Test name',
        url: 'test.com',
        author: 'Montion',
        likes: 69
    }

    const userObj = {
        username: 'Montion',
        token: 'testtoken'
    }

    it("shows only title and author by default", () => {
        render(<Blog blog={blog} user={userObj} />);
    
        expect(screen.getByText(/Test name/i)).toBeDefined();
        expect(screen.getByText(/Montion/i)).toBeDefined();
        expect(screen.queryByText("Likes: 69")).toBeNull();
        expect(screen.queryByText("Url: test.com")).toBeNull();
    });

    it("shows details when the 'view' button is clicked", async () => {
        render(<Blog blog={blog} user={userObj} />);
        const user = userEvent.setup();

        const viewButton = screen.getByText("view");
        await user.click(viewButton);

        //screen.debug();
        expect(screen.getByText("Likes: 69")).toBeDefined();
        expect(screen.getByText("Url: test.com")).toBeDefined();
    });

    /*it("calls event handler twice when like button is clicked twice", async () => {
        const mockLikeHandler = vi.fn(); // Creamos un mock de la función

        render(<Blog blog={blog} user={userObj} onLike={mockLikeHandler} />);
        
        const user = userEvent.setup();

        // Clic en "view" para mostrar el botón "like"
        const viewButton = screen.getByText("view");
        await user.click(viewButton);

        //screen.debug()

        // Ahora buscamos el botón "like" y lo presionamos dos veces
        const likeButton = screen.getByRole("button", { name: /like/i });
        await user.click(likeButton);
        await user.click(likeButton);

        screen.debug()

        // Verificamos que la función mock fue llamada dos veces
        expect(mockLikeHandler).toHaveBeenCalledTimes(2);
    });*/


    /*
    
    <BlogCreator
          setBlogs={setBlogs}
          setErrorType={setErrorType}
          setErrorInfo={setErrorInfo}
          user={user}/>
    
          */
    it('<NoteForm /> updates parent state and calls onSubmit', async () => {
        const createBlog = vi.fn()  // Mock de la función que se llama al enviar el formulario

        const errorType = vi.fn()

        render(<BlogCreator 
            onFormSubmit={createBlog} 
            setErrorType={errorType}
            setErrorInfo={() => {}}
            />)

        const user = userEvent.setup()

        // Verificar que el botón "new blog" está en el documento
        const newBlogButton = screen.getByText('new blog')
        expect(newBlogButton).toBeInTheDocument()

        // Simula el clic en "new blog" para mostrar el formulario
        await user.click(newBlogButton)

        // Verifica que el formulario es visible
        const form = screen.getByText('Add blog')
        expect(form).toBeInTheDocument()

        // Rellenar los campos del formulario
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')

        await user.type(titleInput, 'New Blog Title')
        await user.type(authorInput, 'Blog Author')
        await user.type(urlInput, 'http://newblog.com')

        // Simula el clic en "create"
        const createButton = screen.getByText('create')
        await user.click(createButton)

        // Verifica que la función createBlog fue llamada
        expect(createBlog).toHaveBeenCalledTimes(1)

        // Verifica que la función fue llamada con los datos correctos
        const firstCall = createBlog.mock.calls
        /*expect(firstCall.title).toBe('New Blog Title')
        expect(firstCall.author).toBe('Blog Author')
        expect(firstCall.url).toBe('http://newblog.com')*/
    })

})