
import { test, expect } from '@playwright/test';

test.describe('Todo App Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Homepage', () => {
    test('should have responsive hero section', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8
      const heroTitle = page.locator('h1');
      await expect(heroTitle).toHaveCSS('font-size', '36px');

      await page.setViewportSize({ width: 768, height: 1024 }); // iPad
      await expect(heroTitle).toHaveCSS('font-size', '48px');
    });

    test('should have responsive feature section', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const featureGrid = page.locator('div.grid.md\:grid-cols-3');
      const gridTemplateColumns = await featureGrid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
      expect(gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');

      await page.setViewportSize({ width: 768, height: 1024 });
      const newGridTemplateColumns = await featureGrid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
      expect(newGridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
    });
  });

  test.describe('Todos Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/todos');
    });

    test('should have responsive header', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const header = page.locator('header');
      const flexDirection = await header.evaluate(el => getComputedStyle(el).flexDirection);
      expect(flexDirection).toBe('column');

      await page.setViewportSize({ width: 768, height: 1024 });
      const newFlexDirection = await header.evaluate(el => getComputedStyle(el).flexDirection);
      expect(newFlexDirection).toBe('row');
    });

    test('should have responsive todo items', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const todoItem = page.locator('.flex.flex-col.sm\:flex-row').first();
      const flexDirection = await todoItem.evaluate(el => getComputedStyle(el).flexDirection);
      expect(flexDirection).toBe('column');

      await page.setViewportSize({ width: 768, height: 1024 });
      const newFlexDirection = await todoItem.evaluate(el => getComputedStyle(el).flexDirection);
      expect(newFlexDirection).toBe('row');
    });
  });

  test.describe('Navbar', () => {
    test('should have a mobile menu on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const menuButton = page.locator('button[aria-label="Toggle menu"]');
      await expect(menuButton).toBeVisible();

      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(menuButton).toBeHidden();
    });
  });
});
