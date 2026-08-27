(function injectLocale() {
  try {
    localStorage.setItem('pdfreorder_lang', 'fr');
    console.log('[i18n] Locale forced to French via global setup');
  } catch (err) {
    console.warn('[i18n] Could not set localStorage:', err);
  }
})();