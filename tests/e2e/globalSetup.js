/**
 * Global Setup — Inject French locale via localStorage
 * This runs once before all tests to force a specific locale for consistent i18n testing
 */

import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  // Create the setup script that will inject the locale
  const setupScriptPath = path.join(import.meta.dirname, '..', 'tests/e2e/setup/inject-locale.js');
  
  // Ensure setup directory exists
  const setupDir = path.dirname(setupScriptPath);
  if (!fs.existsSync(setupDir)) {
    fs.mkdirSync(setupDir, { recursive: true });
  }
  
  // Generate the injection script
  const scriptContent = `
(function injectLocale() {
  try {
    localStorage.setItem('pdfreorder_lang', 'fr');
    console.log('[i18n] Locale forced to French via global setup');
  } catch (err) {
    console.warn('[i18n] Could not set localStorage:', err);
  }
})();
  `.trim();
  
  fs.writeFileSync(setupScriptPath, scriptContent, 'utf-8');
  
  console.log('✅ Global setup: French locale injection script created');
  console.log(`   Path: ${setupScriptPath}`);
}
