# Wallet API Load Tests

This directory contains k6 load tests for the Wallet API endpoints:

1. `wallet-get-test.ts` - Tests the GET /api/wallets/:id endpoint
2. `wallet-transaction-post-test.ts` - Tests the POST /api/wallets/:id/transactions endpoint
3. `wallet-transactions-get-test.ts` - Tests the GET /api/wallets/:id/transactions endpoint

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed
- Node.js and npm/yarn

## Running the tests

### 1. Build the tests

First, build the TypeScript tests:

```bash
npm run bundle
```

This will compile the TypeScript files in the `src` directory and output the bundled JavaScript files to the `dist` directory.

### 2. Run individual tests

Run each test individually using the k6 command:

```bash
# Test GET /api/wallets/:id
k6 run dist/fetch_wallets.test.js

# Test POST /persons/:personId/wallets
k6 run dist/create_wallets.test.js

# Test POST /persons
k6 run dist/create_persons.test.js
```

### 3. Customizing the tests

You can customize the tests using environment variables:

```bash
# Use a different API base URL
k6 run -e API_BASE_URL=https://staging-api.example.com/api dist/wallet-get-test.js

# Use a specific wallet ID
k6 run -e WALLET_ID=wallet123 dist/wallet-transactions-get-test.js
```

## Test Configuration

Each test includes configurable options:

- **Virtual Users (VUs)**: Number of concurrent users
- **Duration**: How long the test runs
- **Thresholds**: Performance criteria that tests must meet
- **Stages**: Ramp-up and ramp-down settings for VUs

You can adjust these in each test file or override them when running k6:

```bash
k6 run --vus 100 --duration 5m dist/wallet-get-test.js
```

## Viewing Results

k6 provides real-time metrics in the terminal. For more advanced visualization:

```bash
# Output to JSON for further processing
k6 run --out json=results.json dist/wallet-get-test.js

# Use the k6 Cloud service
k6 run --out cloud dist/wallet-get-test.js
```

See the [k6 documentation](https://k6.io/docs/) for more information on running tests and analyzing results. 