import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/portfolioData';
import { NavSectionId } from './Header';

interface FooterProps {
  onNavigate: (sectionId: NavSectionId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY >= 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-900 py-10 text-slate-300 dark:border-t dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="font-display text-sm font-bold text-white">
              {CANDIDATE_PROFILE.name} ({CANDIDATE_PROFILE.englishName})
            </p>
            <p className="mt-1 text-xs text-slate-400">
              직무 중심 문제 해결 역량 아카이브 · Last Updated {CANDIDATE_PROFILE.lastUpdated}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="hover:text-white"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('projects');
              }}
              className="hover:text-white"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('skills');
              }}
              className="hover:text-white"
            >
              Skills
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="hover:text-white"
            >
              Contact
            </a>
            <span className="text-slate-500">© 2026 {CANDIDATE_PROFILE.englishName}</span>
          </div>
        </div>
      </footer>

      {showTopButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="페이지 최상단으로 이동"
          className="fixed right-5 bottom-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white/95 text-slate-800 shadow-md backdrop-blur-sm transition-colors hover:bg-blue-600 hover:border-blue-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 dark:hover:bg-blue-600"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
