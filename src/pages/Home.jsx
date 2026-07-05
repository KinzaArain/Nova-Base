import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { courses } from '../data/courses';
import { allCoursesComplete, overallProgress } from '../lib/progress';
import CourseCard from '../components/CourseCard';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const { t } = useLanguage();
  const { done, total } = overallProgress();
  const unlocked = allCoursesComplete();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="scanline rounded-2xl border border-nova-border bg-nova-panel px-8 py-14 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-nova-teal">
          SYSTEM BOOT // DIGITAL LITERACY
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          {t('appName')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-nova-muted">{t('tagline')}</p>
        <a
          href="#courses"
          className="mt-8 inline-block rounded-full bg-nova-amber px-6 py-3 font-medium text-nova-bg transition-transform hover:scale-105"
        >
          {t('heroCta')}
        </a>
      </section>

      <section className="mt-10 rounded-2xl border border-nova-border bg-nova-panel px-6 py-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-nova-muted">{t('yourProgress')}</span>
          <span className="font-mono text-xs text-nova-muted">{done}/{total} {t('modules').toLowerCase()}</span>
        </div>
        <div className="mt-2">
          <ProgressBar done={done} total={total} />
        </div>
      </section>

      <h2 id="courses" className="mt-12 mb-4 font-display text-2xl font-semibold">
        {t('courses')}
      </h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-nova-border bg-nova-panel px-6 py-6 text-center">
        <p className="font-mono text-xs text-nova-teal mb-2">[ FINAL ASSESSMENT ]</p>
        {unlocked ? (
          <Link
            to="/assessment"
            className="inline-block rounded-full bg-nova-teal px-6 py-2.5 font-medium text-nova-bg hover:scale-105 transition-transform"
          >
            {t('takeAssessment')}
          </Link>
        ) : (
          <p className="text-sm text-nova-muted">{t('finalAssessmentLocked')}</p>
        )}
      </section>
    </div>
  );
}
