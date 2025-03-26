import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect, vi } from 'vitest'

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

    it("calls event handler twice when like button is clicked twice", async () => {
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
    });

})