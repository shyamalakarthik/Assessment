import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddPayeePage extends BasePage {
  readonly payeeNameInput: Locator;
  readonly payeeAccountNumberInput: Locator;
  readonly payeeAccountTypeSelect: Locator;
  readonly submitButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.payeeNameInput = page.locator('#payeeName, input[name="payeeName"]');
    this.payeeAccountNumberInput = page.locator('#accountNumber, input[name="accountNumber"]');
    this.payeeAccountTypeSelect = page.locator('#accountType, select[name="accountType"]');
    this.submitButton = page.locator('button#add-payee-btn, button[type="submit"]');
    this.confirmationMessage = page.locator('#payee-success, .success-message, [role="status"]');
  }

  async addPayee(name: string, accountNumber: string, type: 'Savings' | 'Checking' = 'Checking'): Promise<void> {
    await this.payeeNameInput.fill(name);
    await this.payeeAccountNumberInput.fill(accountNumber);
    await this.payeeAccountTypeSelect.selectOption(type);
    await this.submitButton.click();
  }
}