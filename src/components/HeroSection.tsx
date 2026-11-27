import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, FileDown, Moon, Sun, User } from 'lucide-react';
import { CANDIDATE_PROFILE, HERO_KPIS } from '../data/portfolioData';

interface HeroSectionProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onExploreProjects: () => void;
  onDownloadResume: () => void;
  onOpenResumePreview: () => void;
}

export function HeroSection({
  theme,
  onToggleTheme,
  onExploreProjects,
  onDownloadResume,
  onOpenResumePreview,
}: HeroSectionProps) {
  const kpiStripRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>(HERO_KPIS.map(() => 0));
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCounts(HERO_KPIS.map((item) => item.target));
      setHasAnimated(true);
      return;
    }

    const node = kpiStripRef.current;
    if (!node || hasAnimated) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1100;
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - elapsed, 3);
            setCounts(HERO_KPIS.map((item) => Math.round(item.target * eased)));

            if (elapsed < 1) {
              rafId = requestAnimationFrame(step);
            } else {
              setCounts(HERO_KPIS.map((item) => item.target));
            }
          };

          rafId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [hasAnimated]);

  return (
    <section
      id="hero"
      className="border-b border-slate-200 bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        {/* Top Utility Strip (Kicker & Theme Switcher — keeps header strictly 3-zone) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {CANDIDATE_PROFILE.name} <span aria-hidden="true" className="mx-1.5 text-slate-300 dark:text-slate-700">·</span>{' '}
            <span className="text-blue-600 dark:text-blue-400">{CANDIDATE_PROFILE.roleTitle}</span>
          </p>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                <span>라이트 모드</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                <span>다크 모드</span>
              </>
            )}
          </button>
        </div>

        {/* 2-Column Split Hero */}
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h1 className="headline-balance font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.2] dark:text-white">
                {CANDIDATE_PROFILE.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-[17px] dark:text-slate-300">
                {CANDIDATE_PROFILE.introLines}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span>대표 프로젝트 보기</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenResumePreview}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <span>요약 이력서 보기</span>
              </button>

              <button
                type="button"
                onClick={onDownloadResume}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                <span>PDF 다운로드</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
              {!imgError ? (
                <img
                  src={CANDIDATE_PROFILE.portraitImage}
                  alt={CANDIDATE_PROFILE.portraitAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top lg:h-full"
                />
              ) : (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8 text-center dark:from-slate-800 dark:to-slate-900">
                  <User className="h-12 w-12 text-slate-400" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {CANDIDATE_PROFILE.name} · {CANDIDATE_PROFILE.englishName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column KPI Strip Below Hero Split */}
        <div
          ref={kpiStripRef}
          className="mt-12 grid grid-cols-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
        >
          {HERO_KPIS.map((kpi, idx) => (
            <div key={kpi.id} className="px-6 py-5">
              <div className="font-display tabular-nums text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {kpi.prefix ?? ''}
                {counts[idx]}
                <span className="ml-0.5 text-blue-600 dark:text-blue-400">{kpi.suffix}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {kpi.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{kpi.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
