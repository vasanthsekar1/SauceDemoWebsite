import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig({
  testDir: './tests',
  reporter: [
    ["list"],
    ["json", {
      outputFile: "playwright-report/results.json"
    }]],
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    testIdAttribute: "data-test"

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
