import jsPDF from 'jspdf';
import QRCode from 'qrcode';

const REGISTRY_KEY = 'nova_certificate_registry';

function readRegistry() {
  try {
    return JSON.parse(localStorage.getItem(REGISTRY_KEY)) || {};
  } catch {
    return {};
  }
}

function writeRegistry(registry) {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
}

function generateCertId() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `NB-${year}-${random}`;
}

// Creates a certificate record in the local registry.
// NOTE: this registry lives in the browser's localStorage, so it only
// verifies on the same device/browser that issued it. For real cross-device
// verification, swap this module's read/write for a small backend
// (e.g. Supabase or Firebase) — the rest of the app doesn't need to change.
export function issueCertificate({ learnerName, score }) {
  const registry = readRegistry();
  let id = generateCertId();
  while (registry[id]) id = generateCertId(); // avoid collision

  const record = {
    id,
    learnerName,
    score,
    issuedAt: new Date().toISOString(),
    skills: ['Hardware Literacy', 'Safe Software Setup', 'Information Literacy'],
  };
  registry[id] = record;
  writeRegistry(registry);
  return record;
}

export function verifyCertificate(id) {
  const registry = readRegistry();
  return registry[id.trim()] || null;
}

// Color palette (kept close to the app's navy/amber brand, adapted for print)
const NAVY = [22, 33, 62]; // #16213E
const GOLD = [201, 151, 45]; // #C9972D
const GOLD_LIGHT = [230, 190, 110];
const TEXT_DARK = [30, 38, 55];
const TEXT_MUTED = [120, 128, 148];
const CREAM = [253, 252, 249];
const PANEL_LIGHT = [246, 244, 238]; // stripe texture tint

function drawStripeTexture(doc, width, height) {
  doc.setDrawColor(...PANEL_LIGHT);
  doc.setLineWidth(0.6);
  const step = 16;
  for (let x = -height; x < width + height; x += step) {
    doc.line(x, 0, x + height, height);
  }
}

function drawGoldBarWithArrows(doc, x, y, w, h) {
  doc.setFillColor(...GOLD);
  doc.rect(x, y, w, h, 'F');
  // outward-pointing flag arrows at each end
  doc.triangle(x, y, x, y + h, x - h * 1.4, y + h / 2, 'F');
  doc.triangle(x + w, y, x + w, y + h, x + w + h * 1.4, y + h / 2, 'F');
}

function drawSeal(doc, cx, cy) {
  // outer ring
  doc.setFillColor(...GOLD);
  doc.circle(cx, cy, 26, 'F');
  doc.setFillColor(...NAVY);
  doc.circle(cx, cy, 21, 'F');
  // checkmark
  doc.setDrawColor(...GOLD_LIGHT);
  doc.setLineWidth(2.2);
  doc.line(cx - 9, cy + 1, cx - 2, cy + 8);
  doc.line(cx - 2, cy + 8, cx + 11, cy - 8);
  // ribbon tails
  doc.setFillColor(...GOLD);
  doc.triangle(cx - 14, cy + 20, cx - 2, cy + 20, cx - 8, cy + 42, 'F');
  doc.triangle(cx + 2, cy + 20, cx + 14, cy + 20, cx + 8, cy + 42, 'F');
}

export async function downloadCertificatePDF(record) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const cx = width / 2;

  // Background + subtle diagonal stripe texture
  doc.setFillColor(...CREAM);
  doc.rect(0, 0, width, height, 'F');
  drawStripeTexture(doc, width, height);

  // Logo mark: gold chevron + "NOVA BASE"
  const logoY = 70;
  doc.setFillColor(...GOLD);
  doc.triangle(cx - 78, logoY - 8, cx - 78, logoY + 8, cx - 68, logoY, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...NAVY);
  doc.text('NOVA BASE', cx - 60, logoY + 5, { align: 'left' });

  // Title
  doc.setFont('times', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(...NAVY);
  doc.text('Certificate of Achievement', cx, 118, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Digital Literacy Launchpad Program \u2014 proudly presented to', cx, 140, { align: 'center' });

  // Gold accent bar (top of navy band)
  const bandX = 60;
  const bandW = width - 120;
  const bandTop = 165;
  const bandH = 175;
  drawGoldBarWithArrows(doc, bandX, bandTop - 8, bandW, 6);

  // Navy band
  doc.setFillColor(...NAVY);
  doc.rect(bandX, bandTop, bandW, bandH, 'F');

  // Learner name
  doc.setFont('times', 'italic');
  doc.setFontSize(32);
  doc.setTextColor(...GOLD_LIGHT);
  doc.text(record.learnerName, cx, bandTop + 55, { align: 'center' });
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(cx - 130, bandTop + 66, cx + 130, bandTop + 66);

  // Short course description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11.5);
  doc.setTextColor(...CREAM);
  doc.text(
    'has successfully completed the Nova Base program, covering computer fundamentals,',
    cx,
    bandTop + 92,
    { align: 'center' }
  );
  doc.text(
    'safe software setup, and effective, critical use of the internet.',
    cx,
    bandTop + 108,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GOLD_LIGHT);
  doc.text(`Skills verified: ${record.skills.join(' \u2022 ')}`, cx, bandTop + 128, { align: 'center' });

  // Completion date badge
  const issuedDate = new Date(record.issuedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  const badgeW = 220;
  doc.rect(cx - badgeW / 2, bandTop + bandH - 30, badgeW, 22);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...GOLD_LIGHT);
  doc.text(`COMPLETED ${issuedDate.toUpperCase()}  \u2022  SCORE ${record.score}%`, cx, bandTop + bandH - 15, {
    align: 'center',
  });

  // Gold accent bar (bottom of navy band)
  drawGoldBarWithArrows(doc, bandX, bandTop + bandH + 2, bandW, 6);

  // Signature row
  const sigY = bandTop + bandH + 90;
  // Left: seal
  drawSeal(doc, cx - 220, sigY - 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('NOVA BASE \u2014 VERIFIED', cx - 220, sigY + 48, { align: 'center' });

  // Right: founder signature
  doc.setFont('times', 'italic');
  doc.setFontSize(22);
  doc.setTextColor(...TEXT_DARK);
  doc.text('Kinza', cx + 220, sigY - 6, { align: 'center' });
  doc.setDrawColor(...TEXT_MUTED);
  doc.setLineWidth(0.75);
  doc.line(cx + 160, sigY + 6, cx + 280, sigY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.text('Kinza \u2014 Founder, Nova Base', cx + 220, sigY + 20, { align: 'center' });

  // Footer: certificate ID + QR (kept small, for the verification flow)
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(`Certificate ID: ${record.id}`, bandX, height - 34);

  try {
    const verifyUrl = `${window.location.origin}/verify?id=${record.id}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      color: { dark: '#16213E', light: '#FDFCF9' },
    });
    doc.addImage(qrDataUrl, 'PNG', width - bandX - 46, height - 80, 46, 46);
    doc.setFontSize(7.5);
    doc.text('Scan to verify', width - bandX - 23, height - 28, { align: 'center' });
  } catch {
    // QR generation failed silently; the PDF still shows the ID for manual verification.
  }

  doc.save(`NovaBase_Certificate_${record.id}.pdf`);
}
