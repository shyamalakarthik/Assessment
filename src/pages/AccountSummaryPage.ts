import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountSummaryPage extends BasePage {
  readonly totalBalance: Locator;
  readonly transactionRows: Locator;

  constructor(page: Page) {
    super(page);
    this.totalBalance = page.locator('#account-balance, .balance-amount');
    this.transactionRows = page.locator('table.transactions tbody tr');
  }

  async getBalance(): Promise<string> {
    return (await this.totalBalance.textContent()) || '';
  }
}
