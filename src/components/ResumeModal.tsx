import { useEffect } from 'react';
import { FileDown, Mail, Printer, X } from 'lucide-react';
import {
  ABOUT_TIMELINE,
  CANDIDATE_PROFILE,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
}

export function ResumeModal({ open, onClose, onDownloadPdf }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="no-print fixed inset-0 bg-slate-950/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header Toolbar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              1-Page Summary Resume
            </p>
            <h2
              id="resume-modal-title"
              className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white"
            >
              {CANDIDATE_PROFILE.name} 요약 이력서 미리보기
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>인쇄하기</span>
            </button>

            <button
              type="button"
              onClick={onDownloadPdf}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>PDF 저장</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="이력서 미리보기 닫기"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8">
          {/* Resume Header */}
          <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  {CANDIDATE_PROFILE.name}{' '}
                  <span className="text-base font-medium text-slate-500 dark:text-slate-400">
                    ({CANDIDATE_PROFILE.englishName})
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {CANDIDATE_PROFILE.roleTitle}
                </p>
              </div>

              <div className="space-y-1 text-xs text-slate-600 sm:text-right dark:text-slate-300">
                <p className="font-mono-tabular flex items-center gap-1.5 sm:justify-end">
                  <Mail className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  <span>{CANDIDATE_PROFILE.email}</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  github.com/seojunkim-dev · velog.io/@seojunkim
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {CANDIDATE_PROFILE.introLines}
            </p>
          </div>

          {/* Selected Projects Summary */}
          <div className="mt-6">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
              대표 문제 해결 프로젝트
            </h4>
            <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {PROJECTS.slice(0, 4).map((project) => (
                <div key={project.id} className="p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </p>
                    <span className="font-mono-tabular text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {project.impactMetric}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {project.period} · {project.role} · {project.techStack.join(', ')}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.star.result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Experience */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
                학력 및 주요 활동
              </h4>
              <ul className="mt-3 space-y-3">
                {ABOUT_TIMELINE.map((item) => (
                  <li key={item.id} className="text-xs">
                    <p className="font-mono-tabular text-slate-500 dark:text-slate-400">
                      {item.period}
                    </p>
                    <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">{item.organization}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">
                실무 · 수상 · 자격 및 핵심 기술
              </h4>
              <ul className="mt-3 space-y-3">
                {EXPERIENCES.map((exp) => (
                  <li key={exp.id} className="text-xs">
                    <p className="font-mono-tabular text-slate-500 dark:text-slate-400">
                      {exp.period} · {exp.category}
                    </p>
                    <p className="mt-0.5 font-semibold text-slate-900 dark:text-white">
                      {exp.title}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  핵심 기술 스택
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {SKILLS.map((s) => s.name).join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
