import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { verifyCertificate } from '../lib/certificate';

export default function VerifyPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [id, setId] = useState(searchParams.get('id') || '');
  const [status, setStatus] = useState(null); // null | 'checking' | record | 'not-found'

  const runCheck = (certId) => {
    if (!certId.trim()) return;
    setStatus('checking');
    setTimeout(() => {
      const record = verifyCertificate(certId);
      setStatus(record || 'not-found');
    }, 500);
  };

  useEffect(() => {
    if (searchParams.get('id')) runCheck(searchParams.get('id'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <Link to="/" className="text-sm text-nova-muted hover:text-nova-text">← {t('home')}</Link>
      <h1 className="mt-4 font-display text-3xl font-bold">{t('verify')}</h1>

      <div className="mt-6 flex gap-3">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="NB-2026-XXXX"
          className="flex-1 rounded-lg border border-nova-border bg-nova-panel px-4 py-2 font-mono text-nova-text placeholder:text-nova-muted focus:border-nova-amber outline-none"
        />
        <button
          onClick={() => runCheck(id)}
          className="rounded-lg bg-nova-amber px-4 py-2 font-medium text-nova-bg hover:scale-105 transition-transform"
        >
          {t('checkStatus')}
        </button>
      </div>

      {status === 'checking' && (
        <p className="mt-6 font-mono text-sm text-nova-muted animate-pulse">{t('querying')}</p>
      )}

      {status === 'not-found' && (
        <div className="mt-6 rounded-xl border border-nova-red/50 bg-nova-red/5 p-6 font-mono">
          <p className="text-nova-red">✕ {t('notFound')}</p>
        </div>
      )}

      {status && status !== 'checking' && status !== 'not-found' && (
        <div className="mt-6 rounded-xl border border-nova-teal/50 bg-nova-teal/5 p-6 font-mono">
          <p className="text-nova-teal">✓ {t('accessGranted')}</p>
          <div className="mt-4 space-y-1 text-sm text-nova-text/90">
            <p>Name: {status.learnerName}</p>
            <p>Certificate ID: {status.id}</p>
            <p>Score: {status.score}%</p>
            <p>Issued: {new Date(status.issuedAt).toLocaleDateString()}</p>
            <p>Skills: {status.skills.join(', ')}</p>
          </div>
        </div>
      )}

      <p className="mt-8 text-xs text-nova-muted">
        Note: this MVP verifies certificates issued in the same browser. A production
        deployment would check a shared backend so any device can verify any certificate.
      </p>
    </div>
  );
}
