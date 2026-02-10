import { Page } from '@playwright/test';

/**
 * Test data and utilities for Sauce Demo tests
 */

export const TEST_USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard test user with no issues',
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'Account is locked',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'User with visual glitches',
  },
  PERFORMANCE: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'User with performance issues',
  },
};

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
  TSHIRT_RED: 'Test.allTheThings() T-Shirt (Red)',
};

export const SORT_OPTIONS = {
  A_TO_Z: 'az',
  Z_TO_A: 'za',
  PRICE_LOW_TO_HIGH: 'lohi',
  PRICE_HIGH_TO_LOW: 'hilo',
};

/**
 * Wait for element to be stable (no animations)
 */
export async function waitForElementStability(page: Page, selector: string, timeout = 5000) {
  const locator = page.locator(selector);
  await locator.waitFor({ state: 'visible', timeout });
}

/**
 * Get numeric price value from price string
 */
export function getPriceValue(priceString: string): number {
  const match = priceString?.match(/\d+\.\d+/);
  return match ? parseFloat(match[0]) : 0;
}

/**
 * Verify that an array is sorted in ascending order
 */
export function isArraySorted(arr: (string | number)[], ascending = true): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (ascending) {
      if (arr[i] > arr[i + 1]) return false;
    } else {
      if (arr[i] < arr[i + 1]) return false;
    }
  }
  return true;
}
