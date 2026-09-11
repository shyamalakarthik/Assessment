import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly welcomeMessage = this.page.getByText(/welcome|dashboard/i);
  readonly accountSummaryLink = this.page.getByRole('link', { name: /account summary/i });
  readonly addPayeeLink = this.page.getByRole('link', { name: /add payee/i });
  readonly transferFundsLink = this.page.getByRole('link', { name: /fund transfer|transfer funds/i });

  async openAccountSummary() {
    await this.accountSummaryLink.click();
  }

  async openAddPayee() {
    await this.addPayeeLink.click();
  }

  async openFundTransfer() {
    await this.transferFundsLink.click();
  }
}
