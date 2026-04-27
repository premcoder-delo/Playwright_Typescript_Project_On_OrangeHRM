import { defineConfig, devices } from '@playwright/test';
import './src/core/config/env';

export default defineConfig({
  /* ---------------- GLOBAL SETTINGS ---------------- */
  testDir: './src',
  testMatch: ['**/*.spec.ts'],
  timeout: 60000,

  expect: {
    timeout: 30000,
  },

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],

  outputDir: 'test-results/',

  use: {
    baseURL: process.env.BASE_URL,

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  /* ---------------- PROJECTS ---------------- */

  projects: [
    // Setup Project (Login once)
    {
      name: 'setup',
      testMatch: 'src/ui/login/global.setup.ts',
    },
    {
      name: 'ios-setup',
      testMatch: 'src/ui/login/mobile.global.setup.ts',
      use: {
        ...devices['iPhone 14 Pro'],
      },
    },
    {
      name: 'android-setup',
      testMatch: 'src/ui/login/mobile.global.setup.ts',
      use: {
        ...devices['Pixel 7'],
      },
    },

    // UI Browsers
    {
      name: 'chromium',
      testDir: './src/ui',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/auth.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      testDir: './src/ui',
      use: {
        ...devices['Desktop Firefox'],
        storageState: './playwright/.auth/auth.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testDir: './src/ui',
      use: {
        ...devices['Desktop Safari'],
        storageState: './playwright/.auth/auth.json',
      },
      dependencies: ['setup'],
    },

    //API Tests (separate execution context)
    {
      name: 'api',
      testDir: './src/api',

      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
    //A11y Tests (Accessibility Tests)
    {
      name: 'a11y',
      testDir: './src/accessibility',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './playwright/.auth/auth.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-ios',
      testDir: './src/ui',
      use: {
        ...devices['iPhone 14 Pro'],
        storageState: './playwright/.auth/ios-auth.json',
      },
      dependencies: ['ios-setup'],
    },
    {
      name: 'mobile-android',
      testDir: './src/ui',
      use: {
        ...devices['Pixel 7'],
        storageState: './playwright/.auth/android-auth.json',
      },
      dependencies: ['android-setup'],
    },
  ],
});