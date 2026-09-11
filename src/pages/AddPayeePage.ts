import { BasePage } from './BasePage';

export class AddPayeePage extends BasePage {
  readonly payeeNameInput = this.page.locator('input[name="payeeName"], input#payee-name');
  readonly accountNumberInput = this.page.locator('input[name="accountNumber"], input#account-number');
  readonly submitButton = this.page.getByRole('button', { name: /save|add payee/i });

  async addPayee(name: string, accountNumber: string) {
    await this.payeeNameInput.fill(name);
    await this.accountNumberInput.fill(accountNumber);
    await this.submitButton.click();
  }
}
