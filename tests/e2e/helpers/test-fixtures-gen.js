/**
 * Helpers pour générer des fichiers de test
 * Génère PDF avec pdf-lib, images avec encodeur PNG (zlib + CRC32)
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const fixturesDir = path.join(__dirname, '..', 'fixtures');

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xEDB88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

/**
 * Calcule le CRC32 d'un buffer
 */
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

/**
 * Crée un PDF de test avec une ou plusieurs pages
 */
export async function createTestPdf(options = {}) {
  const { pages = 3, filename = 'test.pdf' } = options;
  
  const pdfDoc = await PDFDocument.create();
  
  for (let i = 0; i < pages; i++) {
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    page.drawText(`Page ${i + 1}`, {
      x: 50,
      y: page.getHeight() - 50,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });
    
    page.drawText(`Contenu de la page ${i + 1}`, {
      x: 50,
      y: page.getHeight() - 80,
      size: 12,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(fixturesDir, filename);
  
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, pdfBytes);
  return filePath;
}

/**
 * Crée un PNG de test (minimal)
 */
export function createTestImage(size = 100, filename = 'test.png') {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);       // width
  ihdrData.writeUInt32BE(size, 4);       // height
  ihdrData[8] = 8;                       // bit depth
  ihdrData[9] = 2;                       // color type RGB
  ihdrData[10] = 0;                      // compression
  ihdrData[11] = 0;                      // filter
  ihdrData[12] = 0;                      // interlace
  
  const ihdrCrc = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]));
  const ihdrCrcBuf = Buffer.alloc(4);
  ihdrCrcBuf.writeUInt32BE(ihdrCrc, 0);
  const ihdrChunk = Buffer.concat([
    Buffer.from([0, 0, 0, 13]),
    Buffer.from('IHDR'),
    ihdrData,
    ihdrCrcBuf,
  ]);
  
  // Image data (simple gradient)
  const rawData = Buffer.alloc((size + 1) * size);
  for (let y = 0; y < size; y++) {
    rawData[y * (size + 1)] = 0; // filter byte
    for (let x = 0; x < size; x++) {
      const offset = y * (size + 1) + 1 + x * 3;
      rawData[offset] = (x * 255 / size) | 0;     // R
      rawData[offset + 1] = (y * 255 / size) | 0; // G
      rawData[offset + 2] = 128;                 // B
    }
  }
  
  const compressed = zlib.deflateSync(rawData);
  const idatCrc = crc32(Buffer.concat([Buffer.from('IDAT'), compressed]));
  const idatLengthBuf = Buffer.alloc(4);
  idatLengthBuf.writeUInt32BE(compressed.length, 0);
  const idatCrcBuf = Buffer.alloc(4);
  idatCrcBuf.writeUInt32BE(idatCrc, 0);
  const idatChunk = Buffer.concat([
    idatLengthBuf,
    Buffer.from('IDAT'),
    compressed,
    idatCrcBuf,
  ]);
  
  // IEND
  const iendCrc = crc32(Buffer.from('IEND'));
  const iendCrcBuf = Buffer.alloc(4);
  iendCrcBuf.writeUInt32BE(iendCrc, 0);
  const iendChunk = Buffer.concat([
    Buffer.from([0, 0, 0, 0]),
    Buffer.from('IEND'),
    iendCrcBuf,
  ]);
  
  const png = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  const filePath = path.join(fixturesDir, filename);
  
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, png);
  return filePath;
}

/**
 * Génère tous les fixtures nécessaires
 */
export async function generateAllFixtures() {
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }
  
  // PDFs
  await createTestPdf({ pages: 3, filename: 'test-document.pdf' });
  await createTestPdf({ pages: 5, filename: 'multi-page-test.pdf' });
  await createTestPdf({ pages: 6, filename: 'reorder-test.pdf' });
  await createTestPdf({ pages: 4, filename: 'remove-test.pdf' });
  await createTestPdf({ pages: 3, filename: 'export-test.pdf' });
  await createTestPdf({ pages: 10, filename: 'edge-case-10pages.pdf' });
  await createTestPdf({ pages: 1, filename: 'single-page.pdf' });
  await createTestPdf({ pages: 3, filename: 'rotation-test.pdf' });
  
  // Image
  createTestImage(200, 'test-image.png');
  
  // Invalid file for rejection tests
  const invalidPath = path.join(fixturesDir, 'invalid.txt');
  if (!fs.existsSync(invalidPath)) {
    fs.writeFileSync(invalidPath, 'This is not a PDF.\n');
  }
  
  console.log('✅ All fixtures generated');
}
