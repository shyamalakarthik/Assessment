import { test, expect } from '@playwright/test';
import { DataFactory } from '../../src/fixtures/test-data.factory';

test.describe('Users API', () => {
  test('POST /api/users creates a user with valid payload', async ({ request }) => {
    const payload = DataFactory.getUser();
    const response = await request.post('/api/users', { data: payload });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      name: payload.name,
      email: payload.email,
      accountType: payload.accountType
    });
    expect(body.id).toBeTruthy();
  });

  test('GET /api/users/:id returns a created user', async ({ request }) => {
    const payload = DataFactory.getUser();
    const createResponse = await request.post('/api/users', { data: payload });
    const createdUser = await createResponse.json();

    const response = await request.get(`/api/users/${createdUser.id}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(createdUser.id);
    expect(body.email).toBe(payload.email);
  });

  test('POST /api/users rejects invalid email payload', async ({ request }) => {
    const payload = DataFactory.getInvalidUser();
    const response = await request.post('/api/users', { data: payload });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('email');
  });

  test('GET /api/users/:id returns 404 for an unknown user', async ({ request }) => {
    const response = await request.get('/api/users/unknown-user-id');

    expect(response.status()).toBe(404);
  });

  test('POST /api/users rejects unauthorized requests', async ({ request }) => {
    const payload = DataFactory.getUser();
    const response = await request.post('/api/users', {
      headers: {
        Authorization: 'Bearer invalid-token'
      },
      data: payload
    });

    expect(response.status()).toBe(401);
  });
});