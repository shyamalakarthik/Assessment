import type { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/') {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
    await this.page.goto(`${baseUrl}${path}`);
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
