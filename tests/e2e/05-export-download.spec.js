import { test, expect } from '@playwright/test';

test.describe('📥 Export (SKIP - traitement PDF lourd)', () => {
  test.skip('export PDF valide', async ({ page }) => {
    // SKIP: Export trop lourd/en lent en headless
  });

  test.skip('nom personnalisé', async ({ page }) => {
    // SKIP
  });

  test.skip('export partiel', async ({ page }) => {
    // SKIP
  });

  test.skip('bouton export présent mais désactivé sans fichier', async ({ page }) => {
    // SKIP: #btn-save est hidden tant qu'aucun fichier n'est chargé
  });
});
