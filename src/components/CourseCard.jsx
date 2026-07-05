import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { courseProgress, isCourseComplete } from '../lib/progress';
import ProgressBar from './ProgressBar';

export default function CourseCard({ course }) {
  const { t } = useLanguage();
  const { done, total } = courseProgress(course);
  const complete = isCourseComplete(course);

  return (
    <Link
      to={`/course/${course.id}`}
      className="group block rounded-2xl border border-nova-border bg-nova-panel p-6 transition-colors hover:border-nova-amber/60 hover:bg-nova-panel-hover"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-nova-teal">
          COURSE {String(course.order).padStart(2, '0')}
        </span>
        {complete && (
          <span className="rounded-full bg-nova-teal/15 px-2 py-0.5 text-xs font-mono text-nova-teal">
            [✓] {t('completed')}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold">{course.title}</h3>
      <p className="text-sm text-nova-muted">{course.subtitle}</p>
      <p className="mt-3 text-sm text-nova-text/80">{course.goal}</p>
      <div className="mt-5">
        <ProgressBar done={done} total={total} />
      </div>
    </Link>
  );
}
