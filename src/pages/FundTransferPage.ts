import { BasePage } from './BasePage';

export class FundTransferPage extends BasePage {
  readonly amountInput = this.page.locator('input[name="amount"], input#amount');
  readonly descriptionInput = this.page.locator('input[name="description"], input#description');
  readonly continueButton = this.page.getByRole('button', { name: /continue|next/i });
  readonly confirmButton = this.page.getByRole('button', { name: /confirm|submit/i });

  async transferFunds(amount: string, description?: string) {
    await this.amountInput.fill(amount);
    if (description) {
      await this.descriptionInput.fill(description);
    }
    await this.continueButton.click();
    await this.confirmButton.click();
  }
}
