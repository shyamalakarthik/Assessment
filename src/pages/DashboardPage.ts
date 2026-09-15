import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly welcomeHeader: Locator;
  readonly navAccountSummary: Locator;
  readonly navFundTransfer: Locator;
  readonly navAddPayee: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeader = page.locator('#welcome-user, .user-greeting, h1');
    this.navAccountSummary = page.locator('#nav-summary');
    this.navFundTransfer = page.locator('#nav-transfer');
    this.navAddPayee = page.locator('#nav-payee');
    this.logoutButton = page.locator('#logout, button[name="logout"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('/dashboard');
  }

  async goToAccountSummary(): Promise<void> {
    await this.navAccountSummary.click();
  }

  async goToFundTransfer(): Promise<void> {
    await this.navFundTransfer.click();
  }

  async goToAddPayee(): Promise<void> {
    await this.navAddPayee.click();
  }
}