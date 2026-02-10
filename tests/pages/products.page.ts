import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly productItem: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
    this.productItem = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator(`.inventory_item:has-text("${productName}")`);
    const addButton = product.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator(`.inventory_item:has-text("${productName}")`);
    const removeButton = product.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  async getProductPrice(productName: string) {
    const product = this.page.locator(`.inventory_item:has-text("${productName}")`);
    const price = await product.locator('.inventory_item_price').textContent();
    return price;
  }

  async sortProducts(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartBadgeCount() {
    const text = await this.cartBadge.textContent();
    return parseInt(text || '0');
  }

  async getAllProductNames() {
    const names: string[] = [];
    const products = await this.productItem.all();
    for (const product of products) {
      const name = await product.locator('.inventory_item_name').textContent();
      if (name) names.push(name);
    }
    return names;
  }

  async isProductVisible(productName: string) {
    return await this.page.locator(`.inventory_item:has-text("${productName}")`).isVisible();
  }
}
