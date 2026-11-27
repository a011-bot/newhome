import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ABOUT_TIMELINE,
  CORE_STRENGTHS,
  PROBLEM_SOLVING_STEPS,
} from '../data/portfolioData';

export function AboutSection() {
  const [openTimelineIds, setOpenTimelineIds] = useState<string[]>([ABOUT_TIMELINE[0].id]);

  const toggleTimeline = (id: string) => {
    setOpenTimelineIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="about"
      className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/60"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400">
            About Me
          </p>
          <h2 className="headline-balance mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            화면을 그리기 전에 문제를 먼저 정의합니다
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            단순히 기능을 구현하는 데 그치지 않고, 사용자의 불편 지점을 관찰·가설·검증의 3단계로 풀어냅니다.
          </p>
        </div>

        {/* Core Strengths (3 Columns) */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CORE_STRENGTHS.map((item) => (
            <article
              key={item.index}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="font-mono-tabular text-xs font-semibold text-blue-600 dark:text-blue-400">
                {item.index}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* 3-Step Problem Solving Process */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              문제 해결 작업 프로세스
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              모든 프로젝트에 공통 적용하는 실무 검증 사이클
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {PROBLEM_SOLVING_STEPS.map((phase, index) => (
              <div key={phase.step} className="relative">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>{phase.step}</span>
                  {index < PROBLEM_SOLVING_STEPS.length - 1 && (
                    <span aria-hidden="true" className="hidden text-slate-300 md:inline dark:text-slate-700">
                      →
                    </span>
                  )}
                </div>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {phase.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {phase.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Activity Timeline Accordion */}
        <div className="mt-10">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            학력 및 주요 활동 연대기
          </h3>

          <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {ABOUT_TIMELINE.map((item) => {
              const isExpanded = openTimelineIds.includes(item.id);
              const panelId = `timeline-panel-${item.id}`;

              return (
                <div key={item.id} className="p-5 sm:px-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-mono-tabular font-medium text-blue-600 dark:text-blue-400">
                          {item.period}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.organization}</span>
                      </div>
                      <h4 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleTimeline(item.id)}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      className="inline-flex min-h-[40px] items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 sm:self-center dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <span>{isExpanded ? '접기' : '자세히 보기'}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.summary}
                  </p>

                  {isExpanded && (
                    <div
                      id={panelId}
                      className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800"
                    >
                      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                        {item.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
