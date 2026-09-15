import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly alertBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertBanner = page.locator('[role="alert"], .alert, #flash-message');
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getAlertText(): Promise<string> {
    await this.alertBanner.waitFor({ state: 'visible' });
    return (await this.alertBanner.textContent()) || '';
  }
}