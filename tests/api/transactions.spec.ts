import { test, expect } from '@playwright/test';

test.describe('Transactions API', () => {
  test('GET /transactions returns a successful response', async ({ request }) => {
    const response = await request.get(`${process.env.API_BASE_URL ?? 'https://api.example.com'}/transactions`);
    expect(response.ok()).toBeTruthy();
  });
});
