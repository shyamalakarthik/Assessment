# FinTech Quality Assurance Automation Framework

This project is a sample quality assurance automation framework for a digital banking and fintech application. It simulates how a company can test both the user-facing website and the backend APIs that power customer banking actions such as creating users, submitting transfers, and checking account information.

The goal is simple: validate that the application behaves correctly before it is released to customers. This framework helps teams catch issues early, reduce risk, and automate repeatable checks that would otherwise take a long time to do manually.

---

## What this project does

This framework tests two main areas:

1. API checks
   - Creating a user
   - Retrieving a user by ID
   - Creating a transaction
   - Fetching a user’s transaction history
   - Validating bad input and unauthorized access

2. User interface checks
   - Registering a new customer
   - Logging in to a dashboard
   - Reviewing account summary
   - Adding a payee
   - Submitting a fund transfer
   - Checking validation errors and success messages

The project uses Playwright, a modern browser automation tool, to run these tests in a reliable and repeatable way.

---

## Why this matters

In a real fintech environment, even small mistakes can have serious consequences. A wrong validation rule, a failed API request, or a broken transfer flow can affect customers and business operations. This framework helps verify that the most important journeys work correctly and that errors are caught early.

---

## Project structure

The project is organized so it is easy to understand and maintain:

- src/config
  - Holds environment configuration such as local, staging, or production settings.

- src/fixtures
  - Includes test data and shared setup used by the test suite.

- src/pages
  - Contains page objects that represent screens such as login, dashboard, registration, and transfer pages.

- src/mock
  - Includes a lightweight mock server that simulates the fintech backend and UI behavior.

- tests/api
  - Contains backend API automation tests.

- tests/ui
  - Contains browser-based user journey tests.

- tests/auth.setup.ts
  - Creates a reusable session used by authenticated UI tests.

- playwright.config.ts
  - Defines how tests run, which browsers to use, and what reports to generate.

---

## How to install and run

### 1. Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 2. Run the full test suite

```bash
npx playwright test
```

This will run all API and UI tests in the project.

### 3. Run only API tests

```bash
npx playwright test tests/api
```

### 4. Run only UI tests

```bash
npx playwright test tests/ui
```

### 5. Open the HTML report

```bash
npx playwright show-report
```

This opens the HTML test report in the browser.

### 6. Generate Allure report

```bash
npm run allure:generate
```

### 7. Open the Allure report

```bash
npm run allure:open
```

---

## What the application simulates

This project does not depend on a real banking system. Instead, it uses a mock service to replicate a fintech environment in a safe, controlled way. This is useful because it allows the team to test features without needing a live production environment.

The mock application includes basic flows such as:
- registering a user
- logging in
- viewing a dashboard
- checking account information
- creating a payee
- submitting a transfer
- validating bad data
- rejecting unauthorized access

---

## Test scenarios included

### API tests
These confirm that backend endpoints behave correctly:
- valid users can be created
- invalid emails are rejected
- users can be fetched by ID
- transactions can be created
- transactions can be retrieved for a user
- invalid transaction values are blocked
- unauthorized requests are rejected

### UI tests
These confirm that the browser experience is working as expected:
- a customer can register successfully
- the system shows validation errors when input is invalid
- a user can complete a transfer flow
- account summary pages load correctly

---

## Environment configuration

The project uses environment values stored in the `.env` file. These values help control where the tests are pointed.

Typical values include:
- base API URL
- browser UI URL
- login credentials
- authentication token

If needed, these values can be adjusted for local, staging, or production-like environments.

---

## Reporting and visibility

When tests run, the framework produces useful reports that help teams understand what happened:
- HTML reports for a standard browser view
- JSON output for automation pipelines
- Allure reports for richer test storytelling and easier debugging
- Screenshots and videos on failures for visual review

This makes it easier to understand failures without manually repeating the full test flow.

---

## Why this is a good QA framework example

This project demonstrates good quality engineering principles:
- automation instead of manual repetitive testing
- separation of concerns between pages, data, and configuration
- coverage for both UI and API testing
- validation of error paths, not just happy paths
- reporting that helps with debugging and communication

---

## Simple summary

Think of this project as a small but realistic testing setup for a fintech application. It helps confirm that customer-facing flows and backend logic work correctly, and it gives teams a safe and repeatable way to catch issues before they reach real users.

---

## Ready to use

Once dependencies are installed, you can run the tests directly and generate reports without needing any additional setup beyond the project files already included.

If you want, I can also create a second version of this README that is more formal and more suitable for a GitHub repository submission or interview package.
