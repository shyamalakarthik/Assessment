import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#username, input[name="username"]');
    this.passwordInput = page.locator('#password, input[name="password"]');
    this.submitButton = page.locator('button[type="submit"], #login-btn');
    this.errorMessage = page.locator('.error-message, #login-error, [role="alert"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
