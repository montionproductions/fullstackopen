import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect } from 'vitest'

describe('blog tests', () => {
test('Blog shows title and author', () => {
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
    const { container } = render(<Blog blog={blog} user={userObj}/>)

    const div = container.querySelector('.blog')
    screen.debug(div)
    expect(div).toHaveTextContent(
        'Test name'
    )
    expect(div).toHaveTextContent(
        'Montion'
    )
})

})