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

export async function downloadCertificatePDF(record) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(11, 18, 32); // nova-bg
  doc.rect(0, 0, width, height, 'F');

  // Border panel
  doc.setDrawColor(255, 180, 84); // nova-amber
  doc.setLineWidth(1.5);
  doc.rect(30, 30, width - 60, height - 60);

  doc.setTextColor(124, 138, 165); // muted
  doc.setFontSize(11);
  doc.text('NOVA BASE // CERTIFICATE OF COMPLETION', width / 2, 75, { align: 'center' });

  doc.setTextColor(232, 236, 244);
  doc.setFontSize(30);
  doc.text('Digital Literacy Program', width / 2, 115, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(124, 138, 165);
  doc.text('This certifies that', width / 2, 155, { align: 'center' });

  doc.setFontSize(26);
  doc.setTextColor(255, 180, 84);
  doc.text(record.learnerName, width / 2, 190, { align: 'center' });

  doc.setFontSize(13);
  doc.setTextColor(232, 236, 244);
  doc.text(
    'has completed Course 1: Computer Basics, Course 2: Setting Up Your Workspace,',
    width / 2,
    220,
    { align: 'center' }
  );
  doc.text(
    `and Course 3: Effective Browsing, with a final assessment score of ${record.score}%.`,
    width / 2,
    238,
    { align: 'center' }
  );

  doc.setFontSize(11);
  doc.setTextColor(79, 209, 197); // teal
  doc.text(`Skills verified: ${record.skills.join(' \u2022 ')}`, width / 2, 265, { align: 'center' });

  const issuedDate = new Date(record.issuedAt).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  doc.setFontSize(10);
  doc.setTextColor(124, 138, 165);
  doc.text(`Issued: ${issuedDate}`, 60, height - 60);
  doc.setFont('courier', 'normal');
  doc.text(`Certificate ID: ${record.id}`, 60, height - 44);

  // QR code linking to verification page
  try {
    const verifyUrl = `${window.location.origin}/verify?id=${record.id}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      margin: 1,
      color: { dark: '#0B1220', light: '#E8ECF4' },
    });
    doc.addImage(qrDataUrl, 'PNG', width - 140, height - 140, 80, 80);
    doc.setFontSize(8);
    doc.text('Scan to verify', width - 140, height - 48);
  } catch {
    // QR generation failed silently; PDF still contains the ID for manual verification.
  }

  doc.save(`NovaBase_Certificate_${record.id}.pdf`);
}
