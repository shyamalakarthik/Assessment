import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/env.config';
import path from 'path';

export const AUTH_FILE = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  webServer: {
    command: 'npx tsc --outDir dist && node dist/src/mock/mock-server.js',
    url: 'http://127.0.0.1:3000/health',
    reuseExistingServer: false,
    timeout: 120000
  },
  use: {
    baseURL: config.uiBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: {
        baseURL: config.uiBaseUrl,
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'UI-Auth-Tests',
      testMatch: /tests\/ui\/auth\.spec\.ts/,
      use: {
        baseURL: config.uiBaseUrl,
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'UI-Banking-Tests',
      testMatch: /tests\/ui\/banking-flow\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        baseURL: config.uiBaseUrl,
        storageState: AUTH_FILE,
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'API-Tests',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL: config.baseUrl,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
          Authorization: config.authToken
        }
      }
    }
  ]
});