import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.locator('input[name="username"], input#username');
  readonly passwordInput = this.page.locator('input[name="password"], input#password');
  readonly submitButton = this.page.locator('button[type="submit"], input[type="submit"]');

  async gotoLogin() {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
    await this.page.goto(`${baseUrl}/login`);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
