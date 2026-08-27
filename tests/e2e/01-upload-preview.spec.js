import { test, expect } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FIXTURES_DIR = join(__dirname, 'fixtures');

async function simpleUpload(page, filename) {
  const filePath = join(FIXTURES_DIR, filename);
  const fileChooser = page.waitForEvent('filechooser');
  await page.click('#dropzone');
  const chooser = await fileChooser;
  await chooser.setFiles(filePath);
  await page.waitForSelector('#workspace', { state: 'attached' });
}

test.describe('📁 Upload basique (MINIMAL)', () => {
  test('upload PDF simple → workspace visible', async ({ page }) => {
    await page.goto('/');
    await simpleUpload(page, 'test-document.pdf');
    await expect(page.locator('#workspace')).toBeVisible();
    await expect(page.locator('#filename')).toBeVisible();
    await expect(page.locator('#page-count')).toBeVisible();
  });

  test('dropzone visible au chargement', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#dropzone')).toBeVisible();
  });

  test('checkboxes apparaissent après upload', async ({ page }) => {
    await page.goto('/');
    await simpleUpload(page, 'test-document.pdf');
    await expect(page.locator('.page-card__checkbox')).toHaveCount(3);
    await expect(page.locator('.page-card')).toHaveCount(3);
  });
});
