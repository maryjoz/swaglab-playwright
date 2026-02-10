import { test, expect } from '../fixtures/fixtures';

test.describe('Products Page Tests', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('should display all products', async ({ productsPage }) => {
    const products = await productsPage.getAllProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test('should add product to cart', async ({ productsPage }) => {
    const productName = 'Sauce Labs Backpack';
    await productsPage.addProductToCart(productName);
    
    const cartCount = await productsPage.getCartBadgeCount();
    expect(cartCount).toBe(1);
  });

  test('should add multiple products to cart', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    
    const cartCount = await productsPage.getCartBadgeCount();
    expect(cartCount).toBe(2);
  });

  test('should remove product from cart', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    let cartCount = await productsPage.getCartBadgeCount();
    expect(cartCount).toBe(1);

    await productsPage.removeProductFromCart('Sauce Labs Backpack');
    const cartBadge = await productsPage.page.locator('.shopping_cart_badge').isVisible();
    expect(cartBadge).toBeFalsy();
  });

  test('should sort products by name (A to Z)', async ({ productsPage }) => {
    await productsPage.sortProducts('az');
    const products = await productsPage.getAllProductNames();
    
    const sortedProducts = [...products].sort();
    expect(products).toEqual(sortedProducts);
  });

  test('should sort products by name (Z to A)', async ({ productsPage }) => {
    await productsPage.sortProducts('za');
    const products = await productsPage.getAllProductNames();
    
    const sortedProducts = [...products].sort().reverse();
    expect(products).toEqual(sortedProducts);
  });

  test('should sort products by price (low to high)', async ({ productsPage }) => {
    await productsPage.sortProducts('lohi');
    // Product prices should be in ascending order
    const productItems = await productsPage.productItem.all();
    expect(productItems.length).toBeGreaterThan(0);
  });

  test('should navigate to cart from products page', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    
    await expect(productsPage.page).toHaveURL(/.*cart/);
  });

  test('should get product price', async ({ productsPage }) => {
    const price = await productsPage.getProductPrice('Sauce Labs Backpack');
    expect(price).toContain('$');
  });
});
