/**
 * main.js — PDF Reorder
 * Reorder, rotate, and remove pages using pdf-lib and pdfjs-dist
 */

import { PDFDocument, Degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { initI18n, t } from './i18n.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  './pdf.worker.min.mjs',
  import.meta.url,
).toString();

// State
let pdfDoc = null;
let pages = []; // [{ id, pageNum, thumbnail, rotation }]
let selectedPages = new Set();

// Elements
const dropzoneSection = document.getElementById('dropzone-section');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const addMoreBtn = document.getElementById('btn-add-more');
const workspace = document.getElementById('workspace');
const filenameEl = document.getElementById('filename');
const pageCountEl = document.getElementById('page-count');
const resetBtn = document.getElementById('btn-reset');
const pagesGrid = document.getElementById('pages-grid');
const selectAllBtn = document.getElementById('btn-select-all');
const deselectAllBtn = document.getElementById('btn-deselect-all');
const rotateLeftBtn = document.getElementById('btn-rotate-left');
const rotateRightBtn = document.getElementById('btn-rotate-right');
const applyRotationBtn = document.getElementById('btn-apply-rotation');
const outputNameInput = document.getElementById('output-name');
const pageRangeInput = document.getElementById('page-range');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressPercent = document.getElementById('progress-percent');
const progressText = document.getElementById('progress-text');
const resultInfo = document.getElementById('result-info');
const resultDetails = document.getElementById('result-details');
const saveBtn = document.getElementById('btn-save');
const downloadBtn = document.getElementById('btn-download');
const srLive = document.getElementById('sr-live');

// === Initialization ===
async function init() {
  await initI18n();
  setupEventListeners();
}

function setupEventListeners() {
  // Dropzone
  dropzone.addEventListener('dragover', handleDragOver);
  dropzone.addEventListener('dragleave', handleDragLeave);
  dropzone.addEventListener('drop', handleDrop);
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });
  fileInput.addEventListener('change', handleFileSelect);

  // Add more
  addMoreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Reset
  resetBtn.addEventListener('click', resetAll);

  // Selection controls
  selectAllBtn.addEventListener('click', selectAllPages);
  deselectAllBtn.addEventListener('click', deselectAllPages);

  // Rotation
  rotateLeftBtn.addEventListener('click', () => rotateSelected(-90));
  rotateRightBtn.addEventListener('click', () => rotateSelected(90));
  applyRotationBtn.addEventListener('click', () => {
    pages.forEach((p, idx) => {
      const card = pagesGrid.querySelector(`[data-page-num="${idx + 1}"]`);
      if (card) {
        card.style.transform = `rotate(${p.rotation}deg)`;
      }
    });
    announce(t('progress.finalizing'));
  });

  // Save
  saveBtn.addEventListener('click', savePdf);

  // Download
  downloadBtn.addEventListener('click', downloadPdf);
}

// === Drag & Drop Handlers ===
function handleDragOver(e) {
  e.preventDefault();
  dropzone.classList.add('dragover');
}

function handleDragLeave(e) {
  e.preventDefault();
  dropzone.classList.remove('dragover');
}

async function handleDrop(e) {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  const files = Array.from(e.dataTransfer.files).filter((f) => f.type === 'application/pdf');
  await handleFiles(files);
}

async function handleFileSelect(e) {
  const files = Array.from(e.target.files).filter((f) => f.type === 'application/pdf');
  await handleFiles(files);
  fileInput.value = '';
}

async function handleFiles(files) {
  if (files.length === 0) return;

  for (const file of files) {
    try {
      await loadPdf(file);
    } catch (err) {
      console.error('Failed to load PDF:', file.name, err);
      announce(t('error.invalidPdf'));
    }
  }
}

// === PDF Loading ===
async function loadPdf(file) {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    pdfDoc = await loadingTask.promise;

    // Check password protection
    if (pdfDoc.fingerprint === null) {
      throw new Error(t('error.passwordProtected'));
    }

    pages = [];

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 0.5 });

      // Render thumbnail
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      await page.render({
        canvasContext: ctx,
        viewport: viewport,
      }).promise;

      const thumbnail = canvas.toDataURL('image/png');

      pages.push({
        id: crypto.randomUUID(),
        pageNum,
        rotation: 0,
        thumbnail,
        width: viewport.width,
        height: viewport.height,
      });
    }

    workspace.hidden = false;
    filenameEl.textContent = `${file.name}`;
    pageCountEl.textContent = t('workspace.pages', { count: pdfDoc.numPages });
    renderPages();
    announce(`${pdfDoc.numPages} pages loaded`);
  } catch (err) {
    if (err.message.includes('password') || err.name === 'PasswordException') {
      throw new Error(t('error.passwordProtected'));
    }
    throw err;
  }
}

// === Rendering ===
function renderPages() {
  pagesGrid.innerHTML = '';

  pages.forEach((page, idx) => {
    const card = createPageCard(page, idx);
    pagesGrid.appendChild(card);
  });
}

function createPageCard(page, index) {
  const card = document.createElement('div');
  card.className = 'page-card';
  card.draggable = true;
  card.dataset.pageNum = index + 1;
  card.dataset.id = page.id;
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `Page ${index + 1}`);

  // Thumbnail wrapper
  const thumbWrapper = document.createElement('div');
  thumbWrapper.className = 'page-card__thumb';

  const img = document.createElement('img');
  img.src = page.thumbnail;
  img.className = 'page-card__img';
  img.alt = `Page ${index + 1}`;
  thumbWrapper.appendChild(img);

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'page-card__checkbox';
  checkbox.checked = selectedPages.has(index);
  checkbox.setAttribute('aria-label', `Select page ${index + 1}`);
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      selectedPages.add(index);
    } else {
      selectedPages.delete(index);
    }
    card.classList.toggle('page-card--selected', checkbox.checked);
    announce(`Page ${index + 1} ${checkbox.checked ? 'selected' : 'deselected'}`);
  });

  // Number badge
  const badge = document.createElement('span');
  badge.className = 'page-card__number';
  badge.textContent = index + 1;

  // Rotation indicator
  const rotationIndicator = document.createElement('span');
  rotationIndicator.className = 'page-card__rotation';
  rotationIndicator.textContent = '↻';
  rotationIndicator.style.display = page.rotation !== 0 ? 'inline' : 'none';
  rotationIndicator.title = `${page.rotation}° rotated`;

  // Remove button
  const removeBtn = document.createElement('button');
  removeBtn.className = 'page-card__remove';
  removeBtn.innerHTML = '×';
  removeBtn.setAttribute('aria-label', t('pages.remove'));
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removePage(index);
  });

  // Rotate buttons overlay
  const rotateOverlay = document.createElement('div');
  rotateOverlay.className = 'page-card__rotate-overlay';

  const rotateLeft = document.createElement('button');
  rotateLeft.className = 'page-card__rotate-btn';
  rotateLeft.innerHTML = '↺';
  rotateLeft.setAttribute('aria-label', t('pages.rotateLeft'));
  rotateLeft.addEventListener('click', (e) => {
    e.stopPropagation();
    rotatePage(index, -90);
  });

  const rotateRight = document.createElement('button');
  rotateRight.className = 'page-card__rotate-btn';
  rotateRight.innerHTML = '↻';
  rotateRight.setAttribute('aria-label', t('pages.rotateRight'));
  rotateRight.addEventListener('click', (e) => {
    e.stopPropagation();
    rotatePage(index, 90);
  });

  rotateOverlay.appendChild(rotateLeft);
  rotateOverlay.appendChild(rotateRight);

  card.appendChild(thumbWrapper);
  card.appendChild(checkbox);
  card.appendChild(badge);
  card.appendChild(rotationIndicator);
  card.appendChild(removeBtn);
  card.appendChild(rotateOverlay);

  // Sync selected state visually
  card.classList.toggle('page-card--selected', selectedPages.has(index));

  // Drag events
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);
  card.addEventListener('dragover', handleDragOverCard);
  card.addEventListener('dragenter', handleDragEnterCard);
  card.addEventListener('dragleave', handleDragLeaveCard);
  card.addEventListener('drop', handleDropCard);

  // Click checkbox toggle
  card.addEventListener('click', (e) => {
    if (
      e.target !== checkbox &&
      !e.target.closest('.page-card__remove') &&
      !e.target.closest('.page-card__rotate-btn')
    ) {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        selectedPages.add(index);
      } else {
        selectedPages.delete(index);
      }
      card.classList.toggle('page-card--selected', checkbox.checked);
    }
  });

  return card;
}

// === Drag & Drop Reordering ===
let draggedPageIndex = null;

function handleDragStart(e) {
  draggedPageIndex = parseInt(e.currentTarget.dataset.pageNum, 10) - 1;
  e.currentTarget.classList.add('page-card--dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove('page-card--dragging');
  draggedPageIndex = null;
  pagesGrid.querySelectorAll('.page-card').forEach((c) => {
    c.classList.remove('page-card--drag-over');
  });
}

function handleDragOverCard(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnterCard(e) {
  e.preventDefault();
  const targetIdx = parseInt(e.currentTarget.dataset.pageNum, 10) - 1;
  if (targetIdx !== draggedPageIndex) {
    e.currentTarget.classList.add('page-card--drag-over');
  }
}

function handleDragLeaveCard(e) {
  e.currentTarget.classList.remove('page-card--drag-over');
}

function handleDropCard(e) {
  e.preventDefault();
  const targetIdx = parseInt(e.currentTarget.dataset.pageNum, 10) - 1;

  if (draggedPageIndex !== null && targetIdx !== draggedPageIndex) {
    const [moved] = pages.splice(draggedPageIndex, 1);
    pages.splice(targetIdx, 0, moved);

    // Update selected set
    const newSelected = new Set();
    selectedPages.forEach((idx) => {
      let newIdx = idx;
      if (idx === draggedPageIndex) {
        newIdx = targetIdx;
      } else if (draggedPageIndex < targetIdx) {
        if (idx > draggedPageIndex && idx <= targetIdx) {
          newIdx = idx - 1;
        }
      } else {
        if (idx >= targetIdx && idx < draggedPageIndex) {
          newIdx = idx + 1;
        }
      }
      newSelected.add(newIdx);
    });
    selectedPages = newSelected;

    renderPages();
    announce('Page order changed');
  }

  pagesGrid.querySelectorAll('.page-card').forEach((c) => {
    c.classList.remove('page-card--drag-over');
  });
}

// === Selection Controls ===
function selectAllPages() {
  for (let i = 0; i < pages.length; i++) {
    selectedPages.add(i);
  }
  pagesGrid.querySelectorAll('.page-card').forEach((card) => {
    card.classList.add('page-card--selected');
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.checked = true;
  });
  announce(t('pages.selectAll'));
}

function deselectAllPages() {
  selectedPages.clear();
  pagesGrid.querySelectorAll('.page-card').forEach((card) => {
    card.classList.remove('page-card--selected');
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.checked = false;
  });
  announce(t('pages.deselectAll'));
}

// === Rotation ===
function rotatePage(index, degrees) {
  const page = pages[index];
  page.rotation = (page.rotation + degrees) % 360;
  if (page.rotation < 0) page.rotation += 360;

  const card = pagesGrid.querySelector(`[data-page-num="${index + 1}"]`);
  if (card) {
    card.style.transform = `rotate(${page.rotation}deg)`;
    const indicator = card.querySelector('.page-card__rotation');
    if (indicator) {
      indicator.style.display = page.rotation !== 0 ? 'inline' : 'none';
    }
  }

  announce(`Page ${index + 1} rotated ${degrees}°`);
}

function rotateSelected(degrees) {
  let count = 0;
  for (const idx of selectedPages) {
    if (idx >= 0 && idx < pages.length) {
      rotatePage(idx, degrees);
      count++;
    }
  }
  announce(`${count} pages rotated`);
}

// === Removal ===
function removePage(index) {
  pages.splice(index, 1);

  // Update selected set
  const newSelected = new Set();
  selectedPages.forEach((idx) => {
    if (idx < index) {
      newSelected.add(idx);
    } else if (idx > index) {
      newSelected.add(idx - 1);
    }
  });
  selectedPages = newSelected;

  renderPages();
  pageCountEl.textContent = t('workspace.pages', { count: pages.length });
  announce(`Page ${index + 1} removed`);
}

// === UI Updates ===
function announce(message) {
  srLive.textContent = message;
}

function resetAll() {
  pdfDoc = null;
  pages = [];
  selectedPages.clear();
  pagesGrid.innerHTML = '';
  workspace.hidden = true;
  dropzoneSection.hidden = false;
  progressContainer.hidden = true;
  resultInfo.hidden = true;
  downloadBtn.hidden = true;
  saveBtn.hidden = false;
  fileInput.value = '';
  outputNameInput.value = 'reordered';
  pageRangeInput.value = '';
  announce('Reset complete');
}

// === PDF Saving ===
async function savePdf() {
  if (!pdfDoc) {
    alert(t('error.noFile'));
    return;
  }

  const outputFile = outputNameInput.value || 'reordered';
  const pageRangeStr = pageRangeInput.value.trim();

  saveBtn.disabled = true;
  saveBtn.textContent = t('btn.saving');
  progressContainer.hidden = false;
  progressFill.style.width = '0%';
  progressPercent.textContent = '0%';
  resultInfo.hidden = true;
  downloadBtn.hidden = true;

  try {
    const newPdfDoc = await PDFDocument.create();

    // Parse page range if provided
    let pageIndices = [];
    if (pageRangeStr) {
      pageIndices = parsePageRange(pageRangeStr, pages.length);
      if (pageIndices.length === 0) {
        throw new Error(t('error.pageRange'));
      }
    } else {
      // Use all pages in current order
      for (let i = 0; i < pages.length; i++) {
        pageIndices.push(i);
      }
    }

    for (let i = 0; i < pageIndices.length; i++) {
      const pageIndex = pageIndices[i];
      const pageData = pages[pageIndex];

      if (!pageData) continue;

      progressText.textContent = t('progress.processing', {
        current: i + 1,
        total: pageIndices.length,
      });
      const percent = Math.round(((i + 1) / pageIndices.length) * 100);
      progressFill.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;

      // Copy page from original PDF
      const [embeddedPage] = await newPdfDoc.copyPages(pdfDoc, [pageData.pageNum - 1]);
      // Apply original rotation + user rotation (pdf-lib expects Degrees wrapper)
      const currentRotation = embeddedPage.getRotation().angle;
      const newRotation = currentRotation + pageData.rotation;
      embeddedPage.setRotation(Degrees(newRotation));

      newPdfDoc.addPage(embeddedPage);
    }

    progressText.textContent = t('progress.finalizing');
    const pdfBytes = await newPdfDoc.save();

    // Store for download — revoke any previous blob URL to prevent memory leak
    if (window.currentPdfBlobUrl) {
      URL.revokeObjectURL(window.currentPdfBlobUrl);
    }
    window.currentPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    progressFill.style.width = '100%';
    progressPercent.textContent = '100%';
    resultInfo.hidden = false;
    resultDetails.textContent = t('result.pages', { count: pageIndices.length });
    saveBtn.hidden = true;
    downloadBtn.hidden = false;
    downloadBtn.textContent = outputFile.endsWith('.pdf') ? outputFile : `${outputFile}.pdf`;
    announce(t('progress.completed'));
  } catch (err) {
    console.error('PDF save failed:', err);
    progressText.textContent = t('error.saveFailed', { msg: err.message });
    resultInfo.querySelector('.result-label').textContent = t('error.saveFailed', {
      msg: err.message,
    });
    resultInfo.style.background = 'rgba(232, 69, 69, 0.1)';
    resultInfo.style.borderColor = 'var(--danger)';
    resultInfo.hidden = false;
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = t('btn.save');
  }
}

function parsePageRange(rangeStr, totalPages) {
  const indices = new Set();
  const parts = rangeStr.split(',').map((p) => p.trim());

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map((n) => parseInt(n.trim(), 10) - 1);
      if (Number.isNaN(start) || Number.isNaN(end)) continue;
      for (let i = start; i <= end; i++) {
        if (i >= 0 && i < totalPages) indices.add(i);
      }
    } else {
      const num = parseInt(part, 10) - 1;
      if (!Number.isNaN(num) && num >= 0 && num < totalPages) {
        indices.add(num);
      }
    }
  }

  return Array.from(indices).sort((a, b) => a - b);
}

async function downloadPdf() {
  if (!window.currentPdfBlob) return;

  const outputFile = outputNameInput.value || 'reordered';
  const filename = outputFile.endsWith('.pdf') ? outputFile : `${outputFile}.pdf`;
  const url = URL.createObjectURL(window.currentPdfBlob);
  window.currentPdfBlobUrl = url;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke object URL to prevent memory leak
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  announce(t('btn.downloadStarted'));
}

// Start
init();
