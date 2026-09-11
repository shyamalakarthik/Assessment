import 'dotenv/config';
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

setup('authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLogin();
  await loginPage.login(
    process.env.USERNAME ?? 'demo-user',
    process.env.PASSWORD ?? 'demo-password',
  );

  await expect(page).toHaveURL(/dashboard|home/i);
  await page.context().storageState({ path: '.auth/user.json' });
});
