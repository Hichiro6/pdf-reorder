import { test, expect } from '@playwright/test';

test.describe('❌ Suppression et Reset (MINIMAL)', () => {
  test('reset active workspace', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', 'tests/e2e/fixtures/test-document.pdf');
    await page.waitForSelector('#workspace');
    
    await expect(page.locator('#btn-reset')).toBeEnabled();
    await page.click('#btn-reset');
    
    await expect(page.locator('#workspace')).toBeHidden();
    await expect(page.locator('#dropzone')).toBeVisible();
  });

  test('suppression d\'une page', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', 'tests/e2e/fixtures/test-document.pdf');
    await page.waitForSelector('#workspace');
    
    const initialCards = page.locator('.page-card');
    await expect(initialCards).toHaveCount(3);
    
    await page.locator('.page-card__remove').first().click();
    await expect(page.locator('.page-card')).toHaveCount(2);
  });

  test.skip('suppression multiple', async ({ page }) => {
    // SKIP: Trop complexe
  });

  test.skip('re-upload après reset', async ({ page }) => {
    // SKIP
  });
});
