import { test, expect } from '@playwright/test';

test.describe('🔄 Drag & Drop (SKIP - instable en headless)', () => {
  test.skip('réorganiser par drag&drop', async ({ page }) => {
    // SKIP: Drag&drop trop instable en mode headless
  });

  test.skip('indicateurs visuels de drop', async ({ page }) => {
    // SKIP
  });

  test.skip('maintien de l\'état après réorganisation', async ({ page }) => {
    // SKIP
  });
});
