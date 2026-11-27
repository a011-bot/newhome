import { useMemo, useState } from 'react';
import { ArrowUpRight, Bookmark, FolderOpen, Search, X } from 'lucide-react';
import {
  ProjectCategory,
  ProjectItem,
  PROJECTS,
} from '../data/portfolioData';

interface ProjectsSectionProps {
  bookmarkedIds: string[];
  onToggleBookmark: (projectId: string) => void;
  onSelectProject: (project: ProjectItem, triggerEl: HTMLElement | null) => void;
}

const FILTER_CATEGORIES: ProjectCategory[] = [
  '전체',
  '팀 프로젝트',
  '개인 프로젝트',
  '기획·UX',
  '웹 개발',
];

export function ProjectsSection({
  bookmarkedIds,
  onToggleBookmark,
  onSelectProject,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('전체');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [brokenImageIds, setBrokenImageIds] = useState<Record<string, boolean>>({});

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === '전체' || project.categories.includes(selectedCategory);
      const matchesBookmark = !onlyBookmarked || bookmarkedIds.includes(project.id);
      const matchesSearch =
        query.length === 0 ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesBookmark && matchesSearch;
    });
  }, [selectedCategory, onlyBookmarked, searchQuery, bookmarkedIds]);

  const handleResetFilters = () => {
    setSelectedCategory('전체');
    setOnlyBookmarked(false);
    setSearchQuery('');
  };

  return (
    <section
      id="projects"
      className="border-b border-slate-200 bg-white py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400">
              Projects Archive
            </p>
            <h2 className="headline-balance mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              문제 해결 중심 프로젝트 아카이브
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              각 카드를 클릭하면 STAR 프레임워크 기반의 상세 문제 정의, 구현 액션, 트러블슈팅 기록을 확인할 수 있습니다.
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 tabular-nums dark:text-slate-400">
            표시 중 {filteredProjects.length}건 / 전체 {PROJECTS.length}건
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-4 border-y border-slate-200 py-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
          <div
            role="tablist"
            aria-label="프로젝트 카테고리 필터"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-900"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60 sm:flex-initial">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="기술 스택·키워드 검색"
                aria-label="프로젝트 키워드 검색"
                className="min-h-[40px] w-full rounded-lg border border-slate-200 bg-white pr-8 pl-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="검색어 지우기"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Bookmark Filter Toggle */}
            <button
              type="button"
              onClick={() => setOnlyBookmarked((prev) => !prev)}
              aria-pressed={onlyBookmarked}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                onlyBookmarked
                  ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${onlyBookmarked ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
              <span className="tabular-nums">북마크만 보기 ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Project Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <FolderOpen className="h-10 w-10 text-slate-400" aria-hidden="true" />
            <p className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              선택한 조건에 해당하는 프로젝트가 없습니다.
            </p>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              필터 조건이나 검색어를 초기화하고 전체 프로젝트를 확인해 보세요.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex min-h-[40px] items-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const isBookmarked = bookmarkedIds.includes(project.id);
              const isImgBroken = brokenImageIds[project.id];

              return (
                <article
                  key={project.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div>
                    {/* 16:9 Thumbnail Container */}
                    <div className="relative aspect-video overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
                      {!isImgBroken ? (
                        <img
                          src={project.thumbnail}
                          alt={project.thumbnailAlt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setBrokenImageIds((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4 text-center dark:from-slate-800 dark:to-slate-900">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {project.title}
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(project.id);
                        }}
                        aria-pressed={isBookmarked}
                        aria-label={`${project.title} 북마크 ${isBookmarked ? '해제' : '추가'}`}
                        className={`absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                          isBookmarked
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-200/90 bg-white/95 text-slate-700 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200'
                        }`}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Card Content — Zero-Pill Clean Typographic Hierarchy */}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {project.teamType}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{project.period}</span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 dark:text-white">
                        <button
                          type="button"
                          onClick={(e) => onSelectProject(project, e.currentTarget)}
                          className="text-left transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:text-blue-400"
                        >
                          {project.title}
                        </button>
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.subtitle}
                      </p>

                      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {project.contribution}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {project.techStack.join(' · ')}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-mono-tabular text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {project.impactMetric}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => onSelectProject(project, e.currentTarget)}
                        className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-slate-800 transition-colors hover:text-blue-600 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                      >
                        <span>상세 보기</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
