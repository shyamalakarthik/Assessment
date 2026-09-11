import { BasePage } from './BasePage';

export class AccountSummaryPage extends BasePage {
  readonly balanceCard = this.page.getByText(/balance|available balance/i);
  readonly transactionsList = this.page.locator('[data-testid="transactions"], table');

  async viewBalance() {
    await this.balanceCard.waitFor({ state: 'visible' });
  }
}
