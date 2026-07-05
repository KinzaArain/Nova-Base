import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { finalAssessment, PASS_THRESHOLD } from '../data/courses';
import { useLanguage } from '../i18n/LanguageContext';
import {
  allCoursesComplete,
  saveAssessmentResult,
  getAssessmentResult,
  canRetakeAssessment,
} from '../lib/progress';
import { issueCertificate, downloadCertificatePDF } from '../lib/certificate';

const COOLDOWN_MS = 24 * 60 * 60 * 1000;

export default function AssessmentPage() {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(getAssessmentResult());
  const [name, setName] = useState('');
  const [certRecord, setCertRecord] = useState(null);
  const [downloading, setDownloading] = useState(false);

  if (!allCoursesComplete()) return <Navigate to="/" replace />;

  const retakeAllowed = canRetakeAssessment();

  const handleSelect = (qId, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    const correct = finalAssessment.filter((q) => answers[q.id] === q.answer).length;
    const score = Math.round((correct / finalAssessment.length) * 100);
    const passed = score >= PASS_THRESHOLD;
    const newResult = {
      score,
      passed,
      passedAt: new Date().toISOString(),
      cooldownUntil: passed ? null : Date.now() + COOLDOWN_MS,
    };
    saveAssessmentResult(newResult);
    setResult(newResult);
  };

  const handleGenerateCertificate = () => {
    if (!name.trim()) return;
    const record = issueCertificate({ learnerName: name.trim(), score: result.score });
    setCertRecord(record);
  };

  const handleDownload = async () => {
    setDownloading(true);
    await downloadCertificatePDF(certRecord);
    setDownloading(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link to="/" className="text-sm text-nova-muted hover:text-nova-text">← {t('home')}</Link>
      <h1 className="mt-4 font-display text-3xl font-bold">{t('finalAssessment')}</h1>
      <p className="text-nova-muted mt-1">10 questions · pass with {PASS_THRESHOLD}% or higher.</p>

      {result && !certRecord && (
        <div
          className={`mt-6 rounded-xl border p-5 font-mono text-sm ${
            result.passed
              ? 'border-nova-teal/50 bg-nova-teal/5 text-nova-teal'
              : 'border-nova-red/50 bg-nova-red/5 text-nova-red'
          }`}
        >
          <p>{t('yourScore')}: {result.score}%</p>
          <p className="mt-1">{result.passed ? t('passed') : t('failed')}</p>
        </div>
      )}

      {result?.passed && !certRecord && (
        <div className="mt-6 rounded-xl border border-nova-border bg-nova-panel p-5">
          <label className="block text-sm text-nova-muted mb-2">Name for certificate</label>
          <div className="flex gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kinzah Arain"
              className="flex-1 rounded-lg border border-nova-border bg-nova-bg px-4 py-2 text-nova-text placeholder:text-nova-muted focus:border-nova-amber outline-none"
            />
            <button
              onClick={handleGenerateCertificate}
              className="rounded-lg bg-nova-amber px-4 py-2 font-medium text-nova-bg hover:scale-105 transition-transform"
            >
              Generate
            </button>
          </div>
        </div>
      )}

      {certRecord && (
        <div className="mt-6 rounded-xl border border-nova-teal/50 bg-nova-teal/5 p-6 text-center">
          <p className="font-mono text-xs text-nova-teal">CERTIFICATE ISSUED</p>
          <p className="mt-2 font-mono text-lg">{certRecord.id}</p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-4 rounded-full bg-nova-teal px-6 py-2.5 font-medium text-nova-bg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {downloading ? '...' : t('downloadCertificate')}
          </button>
        </div>
      )}

      {(!result || (!result.passed && retakeAllowed)) && (
        <div className="mt-8 space-y-6">
          {finalAssessment.map((q, i) => (
            <div key={q.id} className="rounded-xl border border-nova-border bg-nova-panel p-5">
              <p className="font-mono text-xs text-nova-muted mb-2">Q{i + 1}</p>
              <p className="font-medium mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={`block w-full text-left rounded-lg border px-4 py-2 text-sm transition-colors ${
                      answers[q.id] === idx
                        ? 'border-nova-amber bg-nova-amber/10 text-nova-amber'
                        : 'border-nova-border text-nova-text/90 hover:border-nova-teal/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== finalAssessment.length}
            className="w-full rounded-full bg-nova-amber py-3 font-medium text-nova-bg disabled:opacity-40 hover:scale-[1.02] transition-transform"
          >
            {t('submit')}
          </button>
        </div>
      )}

      {result && !result.passed && !retakeAllowed && (
        <p className="mt-6 text-sm text-nova-muted font-mono">
          Retake unlocks {new Date(result.cooldownUntil).toLocaleString()}.
        </p>
      )}
    </div>
  );
}
