import dotenv from 'dotenv';
dotenv.config();

export interface EnvConfig {
  baseUrl: string;
  uiBaseUrl: string;
  authToken: string;
  port: number;
  testUser: {
    username: string;
    password: string;
  };
}

const ENV = (process.env.TEST_ENV || 'local').toLowerCase();

const environments: Record<string, EnvConfig> = {
  local: {
    baseUrl: process.env.BASE_URL || 'http://127.0.0.1:3000',
    uiBaseUrl: process.env.UI_BASE_URL || 'http://127.0.0.1:3000',
    authToken: process.env.AUTH_TOKEN || 'Bearer test-token',
    port: Number(process.env.PORT || 3000),
    testUser: {
      username: process.env.TEST_USERNAME || 'demo-user',
      password: process.env.TEST_PASSWORD || 'demo-password'
    }
  },
  staging: {
    baseUrl: process.env.BASE_URL || 'https://staging-api.fintech.example.com',
    uiBaseUrl: process.env.UI_BASE_URL || 'https://staging-app.fintech.example.com',
    authToken: process.env.AUTH_TOKEN || 'Bearer staging-auth-token',
    port: Number(process.env.PORT || 3000),
    testUser: {
      username: process.env.TEST_USERNAME || 'staging-user',
      password: process.env.TEST_PASSWORD || 'staging-password'
    }
  },
  production: {
    baseUrl: process.env.BASE_URL || 'https://api.fintech.example.com',
    uiBaseUrl: process.env.UI_BASE_URL || 'https://app.fintech.example.com',
    authToken: process.env.AUTH_TOKEN || 'Bearer prod-auth-token',
    port: Number(process.env.PORT || 3000),
    testUser: {
      username: process.env.TEST_USERNAME || 'prod-user',
      password: process.env.TEST_PASSWORD || 'prod-password'
    }
  }
};

export const config: EnvConfig = environments[ENV] || environments.local;