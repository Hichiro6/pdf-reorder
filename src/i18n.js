/**
 * i18n.js — PDF Reorder
 * 7-language internationalization (EN/FR/DE/ES/PT/NL/IT)
 */

export const STORAGE_KEY = 'pdfreorder_lang';

export const LANGUAGES = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
  pt: { code: 'pt', name: 'Português', flag: '🇵🇹' },
  nl: { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  it: { code: 'it', name: 'Italiano', flag: '🇮🇹' },
};

export const TRANSLATIONS = {
  en: {
    'app.title': 'PDF Reorder — Rotate & Reorder Pages',
    'app.tagline': 'Reorganize, rotate, and remove pages from your PDF — 100% in your browser',
    'header.tagline': 'Reorganize, rotate, and remove pages from your PDF',
    'privacy.badge': '🔒 100% client-side — your documents never leave your browser',
    'privacy.tooltip': 'Your PDF never leaves your browser. No upload, no server.',
    'dropzone.title': 'Drop your PDF here',
    'dropzone.subtitle': 'or click to browse',
    'dropzone.accept': 'PDF files only',
    'workspace.filename': 'File: {name}',
    'workspace.pages': '{count} pages',
    'workspace.addAnother': 'Add another PDF',
    'workspace.reset': 'Reset',
    'pages.title': 'Pages',
    'pages.hint': 'Drag to reorder • Click rotate icon to rotate • Click X to remove',
    'pages.rotateLeft': 'Rotate left',
    'pages.rotateRight': 'Rotate right',
    'pages.remove': 'Remove page',
    'pages.moveTo': 'Move to position',
    'pages.selectAll': 'Select all',
    'pages.deselectAll': 'Deselect all',
    'pages.rotationApplied': 'Rotation applied',
    'controls.title': 'Settings',
    'controls.outputName': 'Output filename',
    'controls.pageRange': 'Page range (optional)',
    'controls.pageRangeHint': 'e.g. 1-3,5,7-9 or leave empty for all',
    'btn.apply': 'Apply rotation to selected',
    'btn.save': 'Save reordered PDF',
    'btn.saving': 'Saving…',
    'progress.processing': 'Processing page {current} of {total}…',
    'progress.finalizing': 'Finalizing PDF…',
    'progress.completed': 'PDF saved successfully!',
    'result.label': 'Your reordered PDF is ready',
    'result.size': 'Size: {size}',
    'result.pages': '{count} pages',
    'btn.download': 'Download PDF',
    'btn.downloadStarted': 'Download started',
    'error.noFile': 'Please select a PDF file first',
    'error.invalidPdf': 'Invalid or corrupted PDF file',
    'error.passwordProtected': 'This PDF is password-protected and cannot be processed',
    'error.saveFailed': 'Failed to save PDF: {msg}',
    'error.pageRange': 'Invalid page range format',
    'label.language': 'Language',
    'privacy.link': 'View on GitHub',
    'footer.bmc': 'Buy me a coffee',
  },
  fr: {
    'app.title': 'PDF Reorder — Pivoter et réorganiser les pages',
    'app.tagline':
      'Réorganisez, pivotez et supprimez les pages de votre PDF — 100% dans votre navigateur',
    'header.tagline': 'Réorganisez, pivotez et supprimez les pages de votre PDF',
    'privacy.badge': '🔒 100% côté client — vos documents ne quittent jamais votre navigateur',
    'privacy.tooltip': 'Votre PDF ne quitte jamais votre navigateur. Aucun envoi, aucun serveur.',
    'dropzone.title': 'Déposez votre PDF ici',
    'dropzone.subtitle': 'ou cliquez pour parcourir',
    'dropzone.accept': 'Fichiers PDF uniquement',
    'workspace.filename': 'Fichier : {name}',
    'workspace.pages': '{count} pages',
    'workspace.addAnother': 'Ajouter un autre PDF',
    'workspace.reset': 'Réinitialiser',
    'pages.title': 'Pages',
    'pages.hint':
      "Glissez pour réorganiser • Cliquez sur l'icône de rotation • Cliquez sur X pour supprimer",
    'pages.rotateLeft': 'Pivoter à gauche',
    'pages.rotateRight': 'Pivoter à droite',
    'pages.remove': 'Supprimer la page',
    'pages.moveTo': 'Déplacer à la position',
    'pages.selectAll': 'Tout sélectionner',
    'pages.deselectAll': 'Tout désélectionner',
    'pages.rotationApplied': 'Rotation appliquée',
    'controls.title': 'Paramètres',
    'controls.outputName': 'Nom du fichier de sortie',
    'controls.pageRange': 'Plage de pages (optionnel)',
    'controls.pageRangeHint': 'ex. 1-3,5,7-9 ou laisser vide pour tout',
    'btn.apply': 'Appliquer la rotation aux sélectionnées',
    'btn.save': 'Enregistrer le PDF réorganisé',
    'btn.saving': 'Enregistrement…',
    'progress.processing': 'Traitement de la page {current} sur {total}…',
    'progress.finalizing': 'Finalisation du PDF…',
    'progress.completed': 'PDF enregistré avec succès !',
    'result.label': 'Votre PDF réorganisé est prêt',
    'result.size': 'Taille : {size}',
    'result.pages': '{count} pages',
    'btn.download': 'Télécharger le PDF',
    'btn.downloadStarted': 'Téléchargement commencé',
    'error.noFile': "Veuillez d'abord sélectionner un fichier PDF",
    'error.invalidPdf': 'Fichier PDF invalide ou corrompu',
    'error.passwordProtected': 'Ce PDF est protégé par mot de passe et ne peut pas être traité',
    'error.saveFailed': "Échec de l'enregistrement du PDF : {msg}",
    'error.pageRange': 'Format de plage de pages invalide',
    'label.language': 'Langue',
    'privacy.link': 'Voir sur GitHub',
    'footer.bmc': 'Offrez-moi un café',
  },
  de: {
    'app.title': 'PDF Reorder — Seiten drehen und neu anordnen',
    'app.tagline': 'Seiten neu anordnen, drehen und entfernen — 100% in Ihrem Browser',
    'header.tagline': 'Seiten neu anordnen, drehen und entfernen',
    'privacy.badge': '🔒 100% clientseitig — Ihre Dokumente verlassen niemals Ihren Browser',
    'privacy.tooltip': 'Ihre PDF verlässt niemals Ihren Browser. Kein Upload, kein Server.',
    'dropzone.title': 'PDF hier ablegen',
    'dropzone.subtitle': 'oder klicken zum Durchsuchen',
    'dropzone.accept': 'Nur PDF-Dateien',
    'workspace.filename': 'Datei: {name}',
    'workspace.pages': '{count} Seiten',
    'workspace.addAnother': 'Weitere PDF hinzufügen',
    'workspace.reset': 'Zurücksetzen',
    'pages.title': 'Seiten',
    'pages.hint': 'Ziehen zum Sortieren • Klick auf Symbol zum Drehen • Klick auf X zum Entfernen',
    'pages.rotateLeft': 'Nach links drehen',
    'pages.rotateRight': 'Nach rechts drehen',
    'pages.remove': 'Seite entfernen',
    'pages.moveTo': 'An Position verschieben',
    'pages.selectAll': 'Alle auswählen',
    'pages.deselectAll': 'Alle abwählen',
    'pages.rotationApplied': 'Rotation angewendet',
    'controls.title': 'Einstellungen',
    'controls.outputName': 'Ausgabedateiname',
    'controls.pageRange': 'Seitenbereich (optional)',
    'controls.pageRangeHint': 'z.B. 1-3,5,7-9 oder leer für alle',
    'btn.apply': 'Rotation auf Auswahl anwenden',
    'btn.save': 'Neu angeordnete PDF speichern',
    'btn.saving': 'Speichern…',
    'progress.processing': 'Verarbeite Seite {current} von {total}…',
    'progress.finalizing': 'PDF wird finalisiert…',
    'progress.completed': 'PDF erfolgreich gespeichert!',
    'result.label': 'Ihre neu angeordnete PDF ist bereit',
    'result.size': 'Größe: {size}',
    'result.pages': '{count} Seiten',
    'btn.download': 'PDF herunterladen',
    'btn.downloadStarted': 'Download gestartet',
    'error.noFile': 'Bitte wählen Sie zuerst eine PDF-Datei aus',
    'error.invalidPdf': 'Ungültige oder beschädigte PDF-Datei',
    'error.passwordProtected': 'Diese PDF ist passwortgeschützt und kann nicht verarbeitet werden',
    'error.saveFailed': 'PDF konnte nicht gespeichert werden: {msg}',
    'error.pageRange': 'Ungültiges Seitenbereichsformat',
    'label.language': 'Sprache',
    'privacy.link': 'Auf GitHub ansehen',
    'footer.bmc': 'Kaffee spendieren',
  },
  es: {
    'app.title': 'PDF Reorder — Rotar y reordenar páginas',
    'app.tagline': 'Reorganiza, rota y elimina páginas de tu PDF — 100% en tu navegador',
    'header.tagline': 'Reorganiza, rota y elimina páginas de tu PDF',
    'privacy.badge': '🔒 100% lado cliente — tus documentos nunca salen de tu navegador',
    'privacy.tooltip': 'Tu PDF nunca sale de tu navegador. Sin subidas, sin servidor.',
    'dropzone.title': 'Suelta tu PDF aquí',
    'dropzone.subtitle': 'o haz clic para explorar',
    'dropzone.accept': 'Solo archivos PDF',
    'workspace.filename': 'Archivo: {name}',
    'workspace.pages': '{count} páginas',
    'workspace.addAnother': 'Añadir otro PDF',
    'workspace.reset': 'Restablecer',
    'pages.title': 'Páginas',
    'pages.hint': 'Arrastra para reordenar • Clic en rotar • Clic en X para eliminar',
    'pages.rotateLeft': 'Rotar a la izquierda',
    'pages.rotateRight': 'Rotar a la derecha',
    'pages.remove': 'Eliminar página',
    'pages.moveTo': 'Mover a la posición',
    'pages.selectAll': 'Seleccionar todo',
    'pages.deselectAll': 'Deseleccionar todo',
    'pages.rotationApplied': 'Rotación aplicada',
    'controls.title': 'Configuración',
    'controls.outputName': 'Nombre del archivo de salida',
    'controls.pageRange': 'Rango de páginas (opcional)',
    'controls.pageRangeHint': 'ej. 1-3,5,7-9 o vacío para todas',
    'btn.apply': 'Aplicar rotación a selección',
    'btn.save': 'Guardar PDF reordenado',
    'btn.saving': 'Guardando…',
    'progress.processing': 'Procesando página {current} de {total}…',
    'progress.finalizing': 'Finalizando PDF…',
    'progress.completed': '¡PDF guardado con éxito!',
    'result.label': 'Tu PDF reordenado está listo',
    'result.size': 'Tamaño: {size}',
    'result.pages': '{count} páginas',
    'btn.download': 'Descargar PDF',
    'btn.downloadStarted': 'Descarga iniciada',
    'error.noFile': 'Por favor, selecciona primero un archivo PDF',
    'error.invalidPdf': 'Archivo PDF inválido o corrupto',
    'error.passwordProtected': 'Este PDF está protegido con contraseña y no puede procesarse',
    'error.saveFailed': 'Error al guardar el PDF: {msg}',
    'error.pageRange': 'Formato de rango de páginas inválido',
    'label.language': 'Idioma',
    'privacy.link': 'Ver en GitHub',
    'footer.bmc': 'Invítame a un café',
  },
  pt: {
    'app.title': 'PDF Reorder — Rodar e reorganizar páginas',
    'app.tagline': 'Reorganize, rode e remova páginas do seu PDF — 100% no seu navegador',
    'header.tagline': 'Reorganize, rode e remova páginas do seu PDF',
    'privacy.badge': '🔒 100% lado cliente — seus documentos nunca saem do seu navegador',
    'privacy.tooltip': 'O seu PDF nunca sai do seu navegador. Sem upload, sem servidor.',
    'dropzone.title': 'Solte seu PDF aqui',
    'dropzone.subtitle': 'ou clique para procurar',
    'dropzone.accept': 'Apenas arquivos PDF',
    'workspace.filename': 'Arquivo: {name}',
    'workspace.pages': '{count} páginas',
    'workspace.addAnother': 'Adicionar outro PDF',
    'workspace.reset': 'Redefinir',
    'pages.title': 'Páginas',
    'pages.hint': 'Arraste para reordenar • Clique em rodar • Clique em X para remover',
    'pages.rotateLeft': 'Rodar à esquerda',
    'pages.rotateRight': 'Rodar à direita',
    'pages.remove': 'Remover página',
    'pages.moveTo': 'Mover para posição',
    'pages.selectAll': 'Selecionar tudo',
    'pages.deselectAll': 'Desselecionar tudo',
    'controls.title': 'Configurações',
    'controls.outputName': 'Nome do arquivo de saída',
    'controls.pageRange': 'Intervalo de páginas (opcional)',
    'controls.pageRangeHint': 'ex. 1-3,5,7-9 ou vazio para todas',
    'btn.apply': 'Aplicar rotação à seleção',
    'btn.save': 'Salvar PDF reorganizado',
    'btn.saving': 'Salvando…',
    'progress.processing': 'Processando página {current} de {total}…',
    'progress.finalizing': 'Finalizando PDF…',
    'progress.completed': 'PDF salvo com sucesso!',
    'result.label': 'Seu PDF reorganizado está pronto',
    'result.size': 'Tamanho: {size}',
    'result.pages': '{count} páginas',
    'btn.download': 'Baixar PDF',
    'btn.downloadStarted': 'Download iniciado',
    'error.noFile': 'Por favor, selecione primeiro um arquivo PDF',
    'error.invalidPdf': 'Arquivo PDF inválido ou corrompido',
    'error.passwordProtected': 'Este PDF é protegido por senha e não pode ser processado',
    'error.saveFailed': 'Falha ao salvar o PDF: {msg}',
    'error.pageRange': 'Formato de intervalo de páginas inválido',
    'label.language': 'Idioma',
    'privacy.link': 'Ver no GitHub',
    'footer.bmc': 'Pague-me um café',
  },
  nl: {
    'app.title': "PDF Reorder — Pagina's draaien en herschikken",
    'app.tagline': "Herschik, roteer en verwijder pagina's van je PDF — 100% in je browser",
    'header.tagline': "Herschik, roteer en verwijder pagina's van je PDF",
    'privacy.badge': '🔒 100% client-side — je documenten verlaten nooit je browser',
    'privacy.tooltip': 'Je PDF verlaat nooit je browser. Geen upload, geen server.',
    'dropzone.title': 'Sleep je PDF hierheen',
    'dropzone.subtitle': 'of klik om te bladeren',
    'dropzone.accept': 'Alleen PDF-bestanden',
    'workspace.filename': 'Bestand: {name}',
    'workspace.pages': "{count} pagina's",
    'workspace.addAnother': 'Andere PDF toevoegen',
    'workspace.reset': 'Resetten',
    'pages.title': "Pagina's",
    'pages.hint': 'Sleep om te herschikken • Klik op roteren • Klik op X om te verwijderen',
    'pages.rotateLeft': 'Naar links draaien',
    'pages.rotateRight': 'Naar rechts draaien',
    'pages.remove': 'Pagina verwijderen',
    'pages.moveTo': 'Verplaats naar positie',
    'pages.selectAll': 'Alles selecteren',
    'pages.deselectAll': 'Alles deselecteren',
    'pages.rotationApplied': 'Rotatie toegepast',
    'controls.title': 'Instellingen',
    'controls.outputName': 'Uitvoerbestandsnaam',
    'controls.pageRange': 'Paginabereik (optioneel)',
    'controls.pageRangeHint': 'bijv. 1-3,5,7-9 of leeg voor alles',
    'btn.apply': 'Rotatie toepassen op selectie',
    'btn.save': 'Herschikte PDF opslaan',
    'btn.saving': 'Opslaan…',
    'progress.processing': 'Pagina {current} van {total} verwerken…',
    'progress.finalizing': 'PDF finaliseren…',
    'progress.completed': 'PDF succesvol opgeslagen!',
    'result.label': 'Je herschikte PDF is klaar',
    'result.size': 'Grootte: {size}',
    'result.pages': "{count} pagina's",
    'btn.download': 'PDF downloaden',
    'btn.downloadStarted': 'Download gestart',
    'error.noFile': 'Selecteer eerst een PDF-bestand',
    'error.invalidPdf': 'Ongeldig of beschadigd PDF-bestand',
    'error.passwordProtected': 'Deze PDF is met wachtwoord beveiligd en kan niet worden verwerkt',
    'error.saveFailed': 'PDF opslaan mislukt: {msg}',
    'error.pageRange': 'Ongeldig paginabereikformaat',
    'label.language': 'Taal',
    'privacy.link': 'Bekijk op GitHub',
    'footer.bmc': 'Trakteer me op een koffie',
  },
  it: {
    'app.title': 'PDF Reorder — Ruota e riordina le pagine',
    'app.tagline': 'Riorganizza, ruota e rimuovi pagine dal tuo PDF — 100% nel tuo browser',
    'header.tagline': 'Riorganizza, ruota e rimuovi pagine dal tuo PDF',
    'privacy.badge': '🔒 100% lato client — i tuoi documenti non lasciano mai il tuo browser',
    'privacy.tooltip': 'Il tuo PDF non lascia mai il tuo browser. Nessun upload, nessun server.',
    'dropzone.title': 'Trascina qui il tuo PDF',
    'dropzone.subtitle': 'o clicca per sfogliare',
    'dropzone.accept': 'Solo file PDF',
    'workspace.filename': 'File: {name}',
    'workspace.pages': '{count} pagine',
    'workspace.addAnother': 'Aggiungi un altro PDF',
    'workspace.reset': 'Reimposta',
    'pages.title': 'Pagine',
    'pages.hint': 'Trascina per riordinare • Clicca su ruota • Clicca su X per rimuovere',
    'pages.rotateLeft': 'Ruota a sinistra',
    'pages.rotateRight': 'Ruota a destra',
    'pages.remove': 'Rimuovi pagina',
    'pages.moveTo': 'Sposta alla posizione',
    'pages.selectAll': 'Seleziona tutto',
    'pages.deselectAll': 'Deseleziona tutto',
    'pages.rotationApplied': 'Rotazione applicata',
    'controls.title': 'Impostazioni',
    'controls.outputName': 'Nome file di output',
    'controls.pageRange': 'Intervallo pagine (opzionale)',
    'controls.pageRangeHint': 'es. 1-3,5,7-9 o vuoto per tutte',
    'btn.apply': 'Applica rotazione alla selezione',
    'btn.save': 'Salva PDF riordinato',
    'btn.saving': 'Salvataggio…',
    'progress.processing': 'Elaborazione pagina {current} di {total}…',
    'progress.finalizing': 'Finalizzazione PDF…',
    'progress.completed': 'PDF salvato con successo!',
    'result.label': 'Il tuo PDF riordinato è pronto',
    'result.size': 'Dimensione: {size}',
    'result.pages': '{count} pagine',
    'btn.download': 'Scarica PDF',
    'btn.downloadStarted': 'Download avviato',
    'error.noFile': 'Seleziona prima un file PDF',
    'error.invalidPdf': 'File PDF non valido o danneggiato',
    'error.passwordProtected': 'Questo PDF è protetto da password e non può essere elaborato',
    'error.saveFailed': 'Salvataggio PDF fallito: {msg}',
    'error.pageRange': 'Formato intervallo pagine non valido',
    'label.language': 'Lingua',
    'privacy.link': 'Vedi su GitHub',
    'footer.bmc': 'Offrimi un caffè',
  },
};

let currentLang = 'en';

export function getCurrentLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (LANGUAGES[lang]) {
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_e) {
      // Storage unavailable
    }
    applyTranslations();
    updateLanguageButtons();
  }
}

export function t(key, params = {}) {
  let str = TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.en?.[key] ?? key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replaceAll(`{${k}}`, String(v));
  }
  return str;
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (TRANSLATIONS[currentLang]?.[key]) {
      el.textContent = TRANSLATIONS[currentLang][key];
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const attrSpec = el.dataset.i18nAttr;
    for (const pair of attrSpec.split(',')) {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (TRANSLATIONS[currentLang]?.[key]) {
        el.setAttribute(attr, TRANSLATIONS[currentLang][key]);
      }
    }
  });

  document.documentElement.lang = currentLang;
}

export function initI18n() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (_e) {
    // Storage unavailable
  }

  if (saved && LANGUAGES[saved]) {
    currentLang = saved;
  } else {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (LANGUAGES[browserLang]) {
      currentLang = browserLang;
    }
  }

  applyTranslations();
  setupLanguageSelector();
}

function setupLanguageSelector() {
  const container = document.getElementById('lang-selector');
  if (!container) return;

  container.className = 'lang-selector';
  container.setAttribute('role', 'group');
  container.setAttribute('aria-label', t('label.language'));

  for (const [code, { name, flag }] of Object.entries(LANGUAGES)) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-btn';
    btn.textContent = flag;
    btn.title = name;
    btn.setAttribute('aria-label', name);
    btn.dataset.lang = code;
    if (code === currentLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.setAttribute('aria-pressed', 'false');
    }
    btn.addEventListener('click', () => {
      if (code !== currentLang) {
        setLanguage(code);
      }
    });
    container.appendChild(btn);
  }
}

function updateLanguageButtons() {
  const container = document.getElementById('lang-selector');
  if (!container) return;
  container.querySelectorAll('.lang-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}
