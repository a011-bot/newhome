import { useEffect, useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Link2,
  X,
} from 'lucide-react';
import { ProjectItem, PROJECTS } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  isBookmarked: boolean;
  onToggleBookmark: (projectId: string) => void;
  onCopyDeepLink: (projectId: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onClose: () => void;
}

export function ProjectModal({
  project,
  isBookmarked,
  onToggleBookmark,
  onCopyDeepLink,
  onSelectProject,
  onClose,
}: ProjectModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const [brokenSlides, setBrokenSlides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSlideIndex(0);
    setLinkCopied(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && project.slides.length > 1) {
        setSlideIndex((prev) => (prev - 1 + project.slides.length) % project.slides.length);
      } else if (event.key === 'ArrowRight' && project.slides.length > 1) {
        setSlideIndex((prev) => (prev + 1) % project.slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((item) => item.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const activeSlide = project.slides[slideIndex] ?? project.slides[0];
  const slideKey = `${project.id}-${slideIndex}`;

  const handleCopyClick = () => {
    onCopyDeepLink(project.id);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Window */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[860px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Sticky Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-blue-600 dark:text-blue-400">{project.teamType}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{project.period}</span>
              <span aria-hidden="true">·</span>
              <span>{project.role}</span>
            </div>
            <h2
              id="project-modal-title"
              className="mt-1 font-display text-lg font-bold text-slate-900 sm:text-xl dark:text-white"
            >
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyClick}
              aria-label="프로젝트 공유 링크 복사"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {linkCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span>복사됨</span>
                </>
              ) : (
                <>
                  <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">링크 복사</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(project.id)}
              aria-pressed={isBookmarked}
              aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="상세 모달 닫기"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Image Carousel */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
            <div className="relative aspect-video">
              {!brokenSlides[slideKey] ? (
                <img
                  src={activeSlide.image}
                  alt={activeSlide.alt}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setBrokenSlides((prev) => ({ ...prev, [slideKey]: true }))
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-sm text-slate-500">
                  {activeSlide.caption}
                </div>
              )}

              {project.slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIndex((prev) => (prev - 1 + project.slides.length) % project.slides.length)
                    }
                    aria-label="이전 스크린샷"
                    className="absolute top-1/2 left-3 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-200/80 bg-white/90 text-slate-800 transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-900/90 dark:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIndex((prev) => (prev + 1) % project.slides.length)
                    }
                    aria-label="다음 스크린샷"
                    className="absolute top-1/2 right-3 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-200/80 bg-white/90 text-slate-800 transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-900/90 dark:text-white"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs text-slate-600 dark:text-slate-300">{activeSlide.caption}</p>
              {project.slides.length > 1 && (
                <div className="flex items-center gap-1.5" role="group" aria-label="슬라이드 선택">
                  {project.slides.map((slide, idx) => (
                    <button
                      key={slide.caption}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      aria-label={`${idx + 1}번 이미지 보기`}
                      aria-current={idx === slideIndex ? 'true' : undefined}
                      className={`h-2 rounded-full transition-all ${
                        idx === slideIndex
                          ? 'w-5 bg-blue-600 dark:bg-blue-400'
                          : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Meta Summary Row */}
          <div className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-950/60">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">역할 및 기여도</p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                {project.contribution}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">핵심 정량 성과</p>
              <p className="font-mono-tabular mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                {project.impactValue}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">활용 기술 스택</p>
              <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                {project.techStack.join(' · ')}
              </p>
            </div>
          </div>

          {/* STAR Problem-Solving Breakdown */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                01. 상황 및 문제 정의 (Situation &amp; Task)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.star.situation}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {project.star.task}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                02. 해결 액션 및 구현 전략 (Action)
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.star.action.map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                03. 검증된 성과 (Result)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {project.star.result}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                트러블슈팅 및 기술적 회고
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.star.troubleshooting}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex flex-wrap items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span>GitHub 저장소</span>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>배포 데모 보기</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectProject(prevProject)}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>이전</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <span>다음</span>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
