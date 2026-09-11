import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  test('GET /users returns a successful response', async ({ request }) => {
    const response = await request.get(`${process.env.API_BASE_URL ?? 'https://api.example.com'}/users`);
    expect(response.ok()).toBeTruthy();
  });
});
