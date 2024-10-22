
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Path to the HTML report file
const reportPath = path.join(__dirname, 'playwright-report', 'index.html');

export default defineConfig({
  testDir: './tests',
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    [
      'playwright-mail-reporter',
      {
        host: process.env.SMTP_HOST,          // SMTP host
        port: Number(process.env.SMTP_PORT),  // SMTP port
        username: process.env.SMTP_USER,      // SMTP username
        password: process.env.SMTP_PASS,      // SMTP password
        from: process.env.SENDER_EMAIL,       // Sender email address
        to: process.env.RECIPIENT_EMAIL,      // Comma-separated list of recipient emails
        subject: 'Playwright Test Results',   // Subject of the email
        attachments: [
          {
            filename: 'index.html',
            path: reportPath,   // Path to the HTML report
            contentType: 'text/html',
          }
        ]
      }
    ]
  ],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
});


// import { defineConfig, devices } from '@playwright/test';
// import dotenv from 'dotenv';
// import path from 'path';

// // Load environment variables from .env file
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// export default defineConfig({
//   testDir: './tests',
//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 1 : undefined,
//   reporter: [
//     ['html'],
//     [
//       'playwright-mail-reporter',
//       {
//         host: process.env.SMTP_HOST,          // SMTP host
//         port: Number(process.env.SMTP_PORT),  // SMTP port
//         username: process.env.SMTP_USER,      // SMTP username
//         password: process.env.SMTP_PASS,      // SMTP password
//         from: process.env.SENDER_EMAIL,       // Sender email address
//         to: process.env.RECIPIENT_EMAIL,      // Comma-separated list of recipient emails
//         subject: 'Playwright Test Results',   // Subject of the email
//       }
//     ]
//   ],
//   use: {
//     trace: 'on-first-retry',
//   },
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     }
//   ],
// });