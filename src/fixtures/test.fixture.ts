import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export type TestFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }: { page: Page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
