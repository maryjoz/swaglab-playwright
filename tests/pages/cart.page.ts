import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async removeItem(productName: string) {
    const item = this.page.locator(`.cart_item:has-text("${productName}")`);
    const removeButton = item.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async getCartItemCount() {
    const items = await this.cartItems.all();
    return items.length;
  }

  async getCartItemNames() {
    const names: string[] = [];
    const items = await this.cartItems.all();
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async getCartTotal() {
    const total = await this.page.locator('.summary_total').textContent();
    return total;
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async isCheckoutButtonVisible() {
    return await this.checkoutButton.isVisible();
  }

  async isCartEmpty() {
    const items = await this.cartItems.all();
    return items.length === 0;
  }
}
