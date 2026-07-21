import { test, expect } from '@playwright/test'

test('home page loads and shows the primary heading', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.ok()).toBeTruthy()
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /to get started, edit the page\.tsx file\./i,
    }),
  ).toBeVisible()
})
