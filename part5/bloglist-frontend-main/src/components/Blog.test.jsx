import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect } from 'vitest'

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

        screen.debug();
        expect(screen.getByText("Likes: 69")).toBeDefined();
        expect(screen.getByText("Url: test.com")).toBeDefined();
    });

})