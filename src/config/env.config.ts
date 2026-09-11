import dotenv from 'dotenv';
dotenv.config();

const ENV = process.env.TEST_ENV || 'local';

interface EnvironmentConfig {
  baseUrl: string;
  authToken: string;
}

const environments: Record<string, EnvironmentConfig> = {
  local: {
    baseUrl: 'http://127.0.0.1:3000',
    authToken: 'Bearer token-local-123'
  },
  staging: {
    baseUrl: 'https://staging-api.fintech.example.com', // Need to replace with actual URL
    authToken: 'Bearer token-staging-abc'
  }
};

export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:8080', //  Need to replace with actual URL
  authToken: process.env.AUTH_TOKEN || 'Bearer your-actual-token'
};