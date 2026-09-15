import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { AUTH_FILE } from '../playwright.config';
import { config } from '../src/config/env.config';

setup('Global Authentication Setup', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login(config.testUser.username, config.testUser.password);
  await expect(dashboardPage.welcomeHeader).toBeVisible();

  await page.context().storageState({ path: AUTH_FILE });
});