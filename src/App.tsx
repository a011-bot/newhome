import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header, NavSectionId } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { CANDIDATE_PROFILE, ProjectItem, PROJECTS } from './data/portfolioData';

const BOOKMARK_STORAGE_KEY = 'bookmarkedProjects';
const THEME_STORAGE_KEY = 'portfolioTheme';
const SECTION_ORDER: NavSectionId[] = ['hero', 'about', 'projects', 'skills', 'contact'];

interface ToastState {
  id: number;
  message: string;
  tone: 'info' | 'success' | 'error';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [activeSection, setActiveSection] = useState<NavSectionId>('hero');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = window.localStorage.getItem(BOOKMARK_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (message: string, tone: 'info' | 'success' | 'error' = 'info') => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      const id = Date.now();
      setToast({ id, message, tone });
      toastTimerRef.current = window.setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, 3200);
    },
    []
  );

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  // Scroll Spy via IntersectionObserver
  useEffect(() => {
    const elements = SECTION_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as NavSectionId);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Deep-link (?project=proj-01) support on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    if (!projectId) return;

    const match = PROJECTS.find((item) => item.id === projectId);
    if (match) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const y = projectsSection.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: Math.max(0, y) });
      }
      setSelectedProject(match);
    }
  }, []);

  const handleNavigate = useCallback((sectionId: NavSectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const headerOffset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth',
    });
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleDownloadResume = async () => {
    try {
      const response = await fetch(CANDIDATE_PROFILE.resumePath, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Resume file unavailable');
      }

      const link = document.createElement('a');
      link.href = CANDIDATE_PROFILE.resumePath;
      link.download = CANDIDATE_PROFILE.resumeFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('이력서 PDF 다운로드를 시작합니다.', 'success');
    } catch {
      showToast(
        '이력서 파일을 불러올 수 없습니다. 하단 이메일로 요청해 주세요.',
        'error'
      );
    }
  };

  const handleToggleBookmark = (projectId: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(projectId);
      const next = exists
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId];

      try {
        window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(next));
      } catch {
        showToast(
          '브라우저 저장소 제한으로 북마크가 현재 세션에만 유지됩니다.',
          'info'
        );
      }

      showToast(
        exists ? '북마크에서 해제했습니다.' : '관심 프로젝트로 북마크했습니다.',
        'info'
      );
      return next;
    });
  };

  const handleOpenProject = (project: ProjectItem, triggerEl: HTMLElement | null) => {
    modalTriggerRef.current = triggerEl;
    setSelectedProject(project);

    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.replaceState(null, '', url.toString());
  };

  const handleSwitchProjectInModal = (project: ProjectItem) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.replaceState(null, '', url.toString());
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState(null, '', url.toString());

    window.requestAnimationFrame(() => {
      modalTriggerRef.current?.focus();
    });
  };

  const handleCopyDeepLink = async (projectId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    const shareUrl = url.toString();

    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      showToast('프로젝트 공유 링크가 클립보드에 복사되었습니다.', 'success');
    } else {
      showToast('링크 복사에 실패했습니다. 주소창 URL을 복사해 주세요.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onDownloadResume={handleDownloadResume}
      />

      <main>
        <HeroSection
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onExploreProjects={() => handleNavigate('projects')}
          onDownloadResume={handleDownloadResume}
          onOpenResumePreview={() => setResumePreviewOpen(true)}
        />

        <AboutSection />

        <ProjectsSection
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectProject={handleOpenProject}
        />

        <SkillsSection />

        <ContactSection onNotify={showToast} />
      </main>

      <Footer onNavigate={handleNavigate} />

      <ProjectModal
        project={selectedProject}
        isBookmarked={
          selectedProject ? bookmarkedIds.includes(selectedProject.id) : false
        }
        onToggleBookmark={handleToggleBookmark}
        onCopyDeepLink={handleCopyDeepLink}
        onSelectProject={handleSwitchProjectInModal}
        onClose={handleCloseModal}
      />

      <ResumeModal
        open={resumePreviewOpen}
        onClose={() => setResumePreviewOpen(false)}
        onDownloadPdf={handleDownloadResume}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center gap-2.5">
            {toast.tone === 'success' && (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            )}
            {toast.tone === 'error' && (
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
            )}
            {toast.tone === 'info' && (
              <Info className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
            )}
            <span>{toast.message}</span>
          </div>

          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="알림 닫기"
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
