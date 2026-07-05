import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-20 border-b border-nova-border bg-nova-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-nova-amber animate-pulse" />
          <span className="font-display text-lg font-semibold tracking-tight">
            {t('appName')}
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link to="/" className="text-sm text-nova-muted hover:text-nova-text transition-colors">
            {t('home')}
          </Link>
          <Link to="/verify" className="text-sm text-nova-muted hover:text-nova-text transition-colors">
            {t('verify')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
