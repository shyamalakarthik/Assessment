import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly accountTypeSelect: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('#name, input[name="name"]');
    this.emailInput = page.locator('#email, input[name="email"]');
    this.accountTypeSelect = page.locator('#accountType, select[name="accountType"]');
    this.submitButton = page.locator('button[type="submit"], #register-btn');
    this.errorMessage = page.locator('#registration-error, .error-message, [role="alert"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('/register');
  }

  async register(name: string, email: string, accountType: string = 'premium'): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);

    if (await this.accountTypeSelect.count()) {
      await this.accountTypeSelect.selectOption({ value: accountType.toLowerCase() });
    }

    await this.submitButton.click();
  }
}
