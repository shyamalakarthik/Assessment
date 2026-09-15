import { test, expect } from '../../src/fixtures/test.fixture';
import { DataFactory } from '../../src/fixtures/test-data.factory';

test.describe('Banking flow UI', () => {
  test('registered user can create a transaction and see success feedback', async ({ registrationPage, fundTransferPage, page }) => {
    const user = DataFactory.getUser();
    await registrationPage.open();
    await registrationPage.register(user.name, user.email, user.accountType);

    await fundTransferPage.open();
    await fundTransferPage.makeTransfer('Jane Smith', '150.25', 'Weekly payroll');

    await expect(page.getByText(/transfer.*success|receipt|submitted/i)).toBeVisible();
  });

  test('user can open account summary and review balance', async ({ registrationPage, dashboardPage, page }) => {
    const user = DataFactory.getUser();
    await registrationPage.open();
    await registrationPage.register(user.name, user.email, user.accountType);

    await dashboardPage.goToAccountSummary();

    await expect(page).toHaveURL(/summary|dashboard/i);
    await expect(page.getByText(/balance|total balance/i)).toBeVisible();
  });
});