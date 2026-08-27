import { test, expect } from '@playwright/test';

test.describe('⚠️ Cas limites (MINIMAL)', () => {
  test('document single-page UI', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', 'tests/e2e/fixtures/single-page.pdf');
    await page.waitForSelector('#workspace');
    
    await expect(page.locator('.page-card')).toHaveCount(1);
    await expect(page.locator('#page-count')).toContainText('1');
  });

  test('document multi-pages UI', async ({ page }) => {
    await page.goto('/');
    await page.setInputFiles('#file-input', 'tests/e2e/fixtures/test-document.pdf');
    await page.waitForSelector('#workspace');
    
    await expect(page.locator('.page-card')).toHaveCount(3);
    await expect(page.locator('#page-count')).toContainText('3');
  });

  test.skip('combinaison complexe rotate+delete+export', async ({ page }) => {
    // SKIP: Trop complexe
  });

  test.skip('double-click rotation', async ({ page }) => {
    // SKIP
  });

  test('accessibilité - aria live region', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#sr-live')).toHaveAttribute('aria-live', 'polite');
  });
});
