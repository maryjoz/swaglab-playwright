import { test, expect } from '../fixtures/fixtures';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ loginPage, productsPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
    
    // Add items to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    
    // Navigate to checkout
    await productsPage.goToCart();
  });

  test('should complete checkout with valid information', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.proceedToOrderReview();
    
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect(checkoutPage.orderSummary).toBeVisible();
  });

  test('should display order items in review', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await checkoutPage.proceedToOrderReview();
    
    const orderItems = await checkoutPage.getOrderItems();
    expect(orderItems).toContain('Sauce Labs Backpack');
    expect(orderItems).toContain('Sauce Labs Bike Light');
  });

  test('should display order total', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo('Bob', 'Johnson', '67890');
    await checkoutPage.proceedToOrderReview();
    
    const total = await checkoutPage.getOrderTotal();
    expect(total).toBeTruthy();
    expect(total).toContain('Total');
  });

  test('should complete order after review', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo('Alice', 'Brown', '11111');
    await checkoutPage.proceedToOrderReview();
    
    await expect(checkoutPage.finishButton).toBeVisible();
    await checkoutPage.finishOrder();
    
    await expect(page).toHaveURL(/.*checkout-complete/);
    await expect(page.locator('.complete-header')).toBeVisible();
  });

  test('should cancel checkout and return to cart', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCheckoutInfo('Tom', 'Clark', '22222');
    await checkoutPage.proceedToOrderReview();

    await checkoutPage.cancel();
    
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('should validate checkout info before proceeding', async ({ cartPage, checkoutPage, page }) => {
    await cartPage.proceedToCheckout();
    
    // Try to proceed without filling info
    await checkoutPage.proceedToOrderReview();
    
    // Should still be on checkout step one
    await expect(page).toHaveURL(/.*checkout-step-one/);
  });

  test('should display finish button on order review', async ({ cartPage, checkoutPage }) => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo('Sarah', 'White', '33333');
    await checkoutPage.proceedToOrderReview();
    
    const isFinishVisible = await checkoutPage.isFinishButtonVisible();
    expect(isFinishVisible).toBeTruthy();
  });
});
