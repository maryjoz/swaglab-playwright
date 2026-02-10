# Sauce Demo Playwright Test Suite

A example test automation project for [https://www.saucedemo.com/](https://www.saucedemo.com/) using Playwright and TypeScript.

## Overview

This project provides automated UI tests for the Sauce Labs demo e-commerce application, covering:
- User authentication (login)
- Product browsing and filtering
- Shopping cart management
- Checkout and order completion

## Project Structure

```
saucedemo-playwright/
├── tests/
│   ├── fixtures/
│   │   └── fixtures.ts              # Custom test fixtures for page objects
│   ├── pages/
│   │   ├── login.page.ts            # Login page object model
│   │   ├── products.page.ts         # Products page object model
│   │   ├── cart.page.ts             # Shopping cart page object model
│   │   └── checkout.page.ts         # Checkout page object model
│   └── specs/
│       ├── login.spec.ts            # Login test suite
│       ├── products.spec.ts         # Products page test suite
│       ├── cart.spec.ts             # Shopping cart test suite
│       └── checkout.spec.ts         # Checkout flow test suite
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

## Installation

1. Clone or navigate to the project directory:
```bash
cd saucedemo-playwright
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The project is configured in `playwright.config.ts` with the following settings:

- **Base URL**: https://www.saucedemo.com
- **Browsers**: Chromium, Firefox, and WebKit
- **Reporter**: HTML test report
- **Screenshots**: Captured on failure only
- **Videos**: Retained on failure only
- **Traces**: Recorded on first retry

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### View test report
```bash
npm run report
```

## Page Object Models

### LoginPage
Handles login functionality with methods for:
- `goto()` - Navigate to login page
- `login(username, password)` - Perform login
- `getErrorMessage()` - Retrieve error message text
- `isErrorDisplayed()` - Check if error is visible

### ProductsPage
Handles product catalog with methods for:
- `addProductToCart(productName)` - Add item to cart
- `removeProductFromCart(productName)` - Remove item from cart
- `sortProducts(sortOption)` - Sort products
- `getAllProductNames()` - Get list of all products
- `getCartBadgeCount()` - Get cart item count
- `goToCart()` - Navigate to cart page

### CartPage
Handles shopping cart with methods for:
- `getCartItemCount()` - Get number of items
- `getCartItemNames()` - Get item names in cart
- `removeItem(productName)` - Remove specific item
- `proceedToCheckout()` - Start checkout process
- `continueShopping()` - Return to products page

### CheckoutPage
Handles checkout process with methods for:
- `fillCheckoutInfo(firstName, lastName, postalCode)` - Fill checkout form
- `proceedToOrderReview()` - Move to review step
- `finishOrder()` - Complete the order
- `getOrderTotal()` - Retrieve order total
- `getOrderItems()` - Get items in order

## Test Suites

### Login Tests (`login.spec.ts`)
- Valid login with correct credentials
- Invalid credentials error handling
- Empty username/password validation
- Locked out user handling

### Products Tests (`products.spec.ts`)
- Display all products
- Add single/multiple products to cart
- Remove products from cart
- Sort products by name and price
- Navigate to cart
- Get product prices

### Cart Tests (`cart.spec.ts`)
- View cart with items
- Remove items from cart
- Verify item names and count
- Continue shopping
- Proceed to checkout
- Clear entire cart

### Checkout Tests (`checkout.spec.ts`)
- Complete checkout with valid information
- Verify order items in review
- Display order total
- Complete order successfully
- Cancel checkout
- Validate required fields
- View order confirmation

## Test Users

The Sauce Demo site provides these test users:

| Username | Password | Notes |
|----------|----------|-------|
| standard_user | secret_sauce | Standard test user |
| locked_out_user | secret_sauce | Account locked |
| problem_user | secret_sauce | Visual glitches |
| performance_glitch_user | secret_sauce | Slower loading |

## Debugging

### Debug single test
```bash
npx playwright test tests/specs/login.spec.ts --debug
```

### Debug specific test case
```bash
npx playwright test login.spec.ts -g "should successfully login" --debug
```

### Enable traces for investigation
Traces are automatically captured on first retry. View them:
```bash
npx playwright show-trace trace.zip
```

## CI/CD Integration

This project can be integrated with GitHub Actions or other CI/CD systems. The configuration supports:
- Automatic retry on CI
- Single worker mode on CI
- Trace/screenshot/video capture

## Best Practices

1. **Page Object Model**: All page interactions go through page objects
2. **Fixtures**: Custom fixtures provide consistent test setup
3. **Test Isolation**: Each test is independent and can run in any order
4. **Waits**: Implicit waits handled by Playwright locators
5. **Assertions**: Use expect() for all validations
6. **Naming**: Test names clearly describe what is being tested

## Troubleshooting

### Tests timeout
- Increase timeout in playwright.config.ts
- Check network connectivity
- Verify website is accessible

### Selector issues
- Use `[data-test]` attributes (most reliable)
- Avoid overly specific CSS selectors
- Use has-text() for flexible matching

### Flaky tests
- Add explicit waits for elements
- Increase retry count in config
- Use waitFor() conditions

## Contributing

When adding new tests:
1. Create corresponding page object methods
2. Follow naming conventions (camelCase for methods)
3. Add descriptive test names
4. Include test documentation
5. Ensure tests are independent

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Sauce Demo Site](https://www.saucedemo.com)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## License

MIT
