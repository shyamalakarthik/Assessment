import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Authentication', () => {
  test('user can log in with valid credentials', async ({ loginPage, page }) => {
    await loginPage.gotoLogin();
    await loginPage.login('demo-user', 'demo-password');

    await expect(page).toHaveURL(/dashboard|home/i);
  });
});
