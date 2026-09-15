import { test, expect } from '@playwright/test';
import { DataFactory } from '../../src/fixtures/test-data.factory';

test.describe('Transactions API', () => {
  test('POST /api/transactions creates a valid transfer', async ({ request }) => {
    const user = await request.post('/api/users', { data: DataFactory.getUser() }).then((response) => response.json());

    const payload = DataFactory.getTransaction(user.id);
    const response = await request.post('/api/transactions', { data: payload });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      userId: user.id,
      amount: payload.amount,
      type: payload.type,
      recipientId: payload.recipientId
    });
  });

  test('GET /api/transactions/:userId returns user transactions', async ({ request }) => {
    const user = await request.post('/api/users', { data: DataFactory.getUser() }).then((response) => response.json());
    await request.post('/api/transactions', { data: DataFactory.getTransaction(user.id) });

    const response = await request.get(`/api/transactions/${user.id}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST /api/transactions rejects invalid payload', async ({ request }) => {
    const user = await request.post('/api/users', { data: DataFactory.getUser() }).then((response) => response.json());

    const response = await request.post('/api/transactions', {
      data: {
        userId: user.id,
        amount: -10,
        type: 'transfer',
        recipientId: 'recipient-002'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('amount');
  });

  test('POST /api/transactions rejects unauthorized access', async ({ request }) => {
    const response = await request.post('/api/transactions', {
      headers: {
        Authorization: 'Bearer invalid-token'
      },
      data: {
        userId: 'user-001',
        amount: 100,
        type: 'transfer',
        recipientId: 'recipient-002'
      }
    });

    expect(response.status()).toBe(401);
  });
});