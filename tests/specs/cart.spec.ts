import { test, expect } from '../fixtures/fixtures';

test.describe('Shopping Cart Tests', () => {
  test.beforeEach(async ({ loginPage, productsPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
    
    // Add items to cart
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
  });

  test('should view cart with items', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart/);
    
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test('should remove item from cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart/);

    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBe(2);
    
    await cartPage.removeItem('Sauce Labs Backpack');
    
    const finalCount = await cartPage.getCartItemCount();
    expect(finalCount).toBe(1);
  });

  test('should display correct item names in cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart/);

    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain('Sauce Labs Backpack');
    expect(cartItems).toContain('Sauce Labs Bike Light');
  });

  test('should continue shopping from cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await cartPage.continueShopping();
    
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('should checkout from cart', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await expect(cartPage.checkoutButton).toBeVisible();
    
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one/);
  });

  test('should clear cart by removing all items', async ({ productsPage, cartPage, page }) => {
    await productsPage.goToCart();
    await expect(page).toHaveURL(/.*cart/);

    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.removeItem('Sauce Labs Bike Light');
    
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();

  });
});
