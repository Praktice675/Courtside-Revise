import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

test('home page renders the getting-started heading', () => {
  render(<Home />)
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /to get started, edit the page\.tsx file\./i,
    }),
  ).toBeDefined()
})
