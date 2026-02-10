import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly orderSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.orderSummary = page.locator('.summary_info');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async proceedToOrderReview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async isOrderSummaryVisible() {
    return await this.orderSummary.isVisible();
  }

  async getOrderTotal() {
    const total = await this.page.locator('.summary_total').textContent();
    return total;
  }

  async getOrderItems() {
    const items: string[] = [];
    const summaryItems = await this.page.locator('.cart_item_label').all();
    for (const item of summaryItems) {
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) items.push(name);
    }
    return items;
  }

  async isFinishButtonVisible() {
    return await this.finishButton.isVisible();
  }
}
