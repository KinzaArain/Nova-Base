import { useLanguage } from '../i18n/LanguageContext';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ur', label: 'اردو' },
  { code: 'ko', label: '한국어' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex gap-1 rounded-full border border-nova-border bg-nova-panel p-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-3 py-1 text-xs rounded-full font-mono transition-colors ${
            lang === code
              ? 'bg-nova-amber text-nova-bg'
              : 'text-nova-muted hover:text-nova-text'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
