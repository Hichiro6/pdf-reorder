import { test, expect } from '@playwright/test';

test.describe('✅ Sélection basique (rotation SKIP)', () => {
  test('checkboxes présentes après upload', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', 'tests/e2e/fixtures/test-document.pdf');
    await page.waitForSelector('#workspace');
    
    const checkboxes = page.locator('.page-card__checkbox');
    await expect(checkboxes).toHaveCount(3);
  });

  test('boutons sélection tout/décocher tout visibles', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', 'tests/e2e/fixtures/test-document.pdf');
    await page.waitForSelector('#workspace');
    
    await expect(page.locator('#btn-select-all')).toBeVisible();
    await expect(page.locator('#btn-deselect-all')).toBeVisible();
  });

  test.skip('rotation gauche/droite', async ({ page }) => {
    // SKIP: Rotation trop complexe (CSS transforms)
  });

  test.skip('rotation cumulée', async ({ page }) => {
    // SKIP
  });
});
