import { test, expect } from '../../src/fixtures/test.fixture';
import { DataFactory } from '../../src/fixtures/test-data.factory';

test.describe('Authentication UI', () => {
  test('user can register with valid details', async ({ registrationPage, page }) => {
    const payload = DataFactory.getUser();

    await registrationPage.open();
    await registrationPage.register(payload.name, payload.email, payload.accountType);

    await expect(page).toHaveURL(/dashboard|register/i);
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('user registration shows validation message for invalid email', async ({ registrationPage, page }) => {
    const payload = DataFactory.getInvalidUser();

    await registrationPage.open();
    await registrationPage.register(payload.name, payload.email, payload.accountType);

    await expect(page.locator('#registration-error')).toBeVisible();
    await expect(page.locator('#registration-error')).toContainText(/invalid.*email|email.*format/i);
    await expect(page).toHaveURL(/register/i);
  });
});