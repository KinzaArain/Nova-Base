import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { courses } from '../data/courses';
import { useLanguage } from '../i18n/LanguageContext';
import { isModuleComplete, toggleModuleComplete } from '../lib/progress';

export default function CoursePage() {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const course = courses.find((c) => c.id === courseId);
  const [, forceRender] = useState(0);

  if (!course) return <Navigate to="/" replace />;

  const handleToggle = (moduleId) => {
    toggleModuleComplete(moduleId);
    forceRender((n) => n + 1);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/" className="text-sm text-nova-muted hover:text-nova-text">← {t('home')}</Link>
      <p className="mt-4 font-mono text-xs text-nova-teal">
        COURSE {String(course.order).padStart(2, '0')}
      </p>
      <h1 className="mt-1 font-display text-3xl font-bold">{course.title}</h1>
      <p className="text-nova-muted">{course.subtitle}</p>
      <p className="mt-3 text-nova-text/80">{course.goal}</p>

      <div className="mt-8 space-y-4">
        {course.modules.map((mod, i) => {
          const done = isModuleComplete(mod.id);
          return (
            <div
              key={mod.id}
              className={`rounded-xl border p-5 transition-colors ${
                done ? 'border-nova-teal/50 bg-nova-teal/5' : 'border-nova-border bg-nova-panel'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-nova-muted">
                    MODULE {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-lg font-semibold mt-0.5">{mod.title}</h3>
                  <p className="text-sm text-nova-muted mt-1">{mod.summary}</p>
                </div>
                <button
                  onClick={() => handleToggle(mod.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-mono transition-colors ${
                    done
                      ? 'bg-nova-teal text-nova-bg'
                      : 'border border-nova-border text-nova-muted hover:border-nova-amber hover:text-nova-amber'
                  }`}
                >
                  {done ? `[✓] ${t('completed')}` : t('markComplete')}
                </button>
              </div>
              <ul className="mt-4 space-y-2 border-t border-nova-border pt-4">
                {mod.content.map((line, idx) => (
                  <li key={idx} className="text-sm text-nova-text/90 flex gap-2">
                    <span className="text-nova-amber font-mono">›</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
