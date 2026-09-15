import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AccountSummaryPage } from '../pages/AccountSummaryPage';
import { AddPayeePage } from '../pages/AddPayeePage';
import { FundTransferPage } from '../pages/FundTransferPage';

type FintechPages = {
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  dashboardPage: DashboardPage;
  accountSummaryPage: AccountSummaryPage;
  addPayeePage: AddPayeePage;
  fundTransferPage: FundTransferPage;
};

export const test = base.extend<FintechPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  accountSummaryPage: async ({ page }, use) => {
    await use(new AccountSummaryPage(page));
  },
  addPayeePage: async ({ page }, use) => {
    await use(new AddPayeePage(page));
  },
  fundTransferPage: async ({ page }, use) => {
    await use(new FundTransferPage(page));
  }
});

export { expect } from '@playwright/test';