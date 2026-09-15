import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FundTransferPage extends BasePage {
  readonly recipientDropdown: Locator;
  readonly amountInput: Locator;
  readonly descriptionInput: Locator;
  readonly transferButton: Locator;
  readonly successBanner: Locator;
  readonly fieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.recipientDropdown = page.locator('#recipientId, select[name="recipientId"], input[name="recipientId"]');
    this.amountInput = page.locator('#amount, input[name="amount"]');
    this.descriptionInput = page.locator('#description, input[name="description"]');
    this.transferButton = page.locator('#submit-transfer, button[type="submit"]');
    this.successBanner = page.locator('.transfer-success, #receipt-id, [role="status"], text=/transfer.*success|receipt|submitted/i');
    this.fieldError = page.locator('.field-error, .invalid-feedback, [role="alert"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('/transfer');
  }

  async makeTransfer(recipient: string, amount: string, note: string = 'Test Transfer'): Promise<void> {
    const recipientField = this.page.locator('#recipientId, select[name="recipientId"], input[name="recipientId"]');

    if (await recipientField.count()) {
      const fieldType = await recipientField.evaluate((el) => el.tagName.toLowerCase());
      if (fieldType === 'select') {
        await recipientField.selectOption({ label: recipient });
      } else {
        await recipientField.fill(recipient);
      }
    }

    await this.amountInput.fill(amount);
    await this.descriptionInput.fill(note);
    await this.transferButton.click();
  }
}