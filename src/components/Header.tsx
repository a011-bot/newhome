import { useEffect, useState } from 'react';
import { FileDown, Menu, X } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/portfolioData';

export type NavSectionId = 'hero' | 'about' | 'projects' | 'skills' | 'contact';

interface HeaderProps {
  activeSection: NavSectionId;
  onNavigate: (sectionId: NavSectionId) => void;
  onDownloadResume: () => void;
}

const NAV_ITEMS: { id: Exclude<NavSectionId, 'hero'>; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ activeSection, onNavigate, onDownloadResume }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (id: NavSectionId) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-sm transition-colors dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-8 px-5 sm:px-6">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-white"
          >
            {CANDIDATE_PROFILE.englishName}
          </a>

          {/* Zone 2: 4 Single-line Navigation Links (Desktop >= 1024px) */}
          <nav aria-label="주 메뉴" className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-blue-600 dark:bg-blue-400"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action (Desktop) / Hamburger Toggle (Mobile & Tablet) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onDownloadResume}
              className="hidden lg:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-600 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
              <span>이력서 PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="모바일 메뉴 열기"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="내비게이션 메뉴">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-[1px] transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-drawer"
            className="fixed inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col justify-between border-l border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <span className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {CANDIDATE_PROFILE.englishName}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="메뉴 닫기"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="모바일 메뉴 목록" className="mt-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.id);
                      }}
                      className={`flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-200 pt-5 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadResume();
                }}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                <span>이력서 PDF 다운로드</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
