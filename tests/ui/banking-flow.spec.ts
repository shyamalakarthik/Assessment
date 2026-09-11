import { test, expect } from '../../src/fixtures/test.fixture';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Banking flow', () => {
  test('user can open account summary and begin fund transfer', async ({ loginPage, page }) => {
    await loginPage.gotoLogin();
    await loginPage.login('demo-user', 'demo-password');

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.openAccountSummary();

    await expect(page).toHaveURL(/account|summary/i);
  });
});
