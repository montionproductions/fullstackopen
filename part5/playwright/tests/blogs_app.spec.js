const { test, expect } = require('@playwright/test')
const { describe, beforeEach } = require('node:test')

describe('Blog app', () => {
    test('login form can be opened', async ({ page }) => { 
        await page.goto('http://localhost:5173')
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('root')
        await page.getByTestId('password').fill('testpassword')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('User logged: root')).toBeVisible()
      })

    describe('when logged in', () => {
        test('a new blog can be created', async ({ page }) => {
            await page.goto('http://localhost:5173')
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('root')
            await page.getByTestId('password').fill('testpassword')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('User logged: root')).toBeVisible()

            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByTestId('title').fill('Fullstack Open Source')
            await page.getByTestId('author').fill('Frank Montion')
            await page.getByTestId('url').fill('http://localhost:5173')
            await page.getByRole('button', { name: 'create' }).click()
            //await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
    })  
})