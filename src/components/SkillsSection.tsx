import { useMemo, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import {
  EXPERIENCES,
  SkillCategory,
  SKILLS,
} from '../data/portfolioData';

const SKILL_TABS: SkillCategory[] = ['전체', 'Frontend', 'Tools', 'Collaboration'];

export function SkillsSection() {
  const [selectedTab, setSelectedTab] = useState<SkillCategory>('전체');
  const [activeSkillId, setActiveSkillId] = useState<string | null>(SKILLS[0].id);
  const [openExpIds, setOpenExpIds] = useState<string[]>([EXPERIENCES[0].id]);

  const filteredSkills = useMemo(() => {
    if (selectedTab === '전체') return SKILLS;
    return SKILLS.filter((skill) => skill.category === selectedTab);
  }, [selectedTab]);

  const toggleExperience = (id: string) => {
    setOpenExpIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="skills"
      className="border-b border-slate-200 bg-slate-50 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/60"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400">
              Skills &amp; Experience
            </p>
            <h2 className="headline-balance mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              보유 역량과 실무 적용 맥락
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              단순 숙련도 점수가 아니라 어떤 프로젝트에서 어떤 문제를 해결할 때 활용했는지 함께 정리했습니다.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="보유 역량 분류 탭"
            className="flex flex-wrap items-center gap-1 self-start rounded-lg bg-slate-200/70 p-1 md:self-auto dark:bg-slate-800"
          >
            {SKILL_TABS.map((tab) => {
              const isSelected = selectedTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedTab(tab)}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-950 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => {
            const isHighlighted = activeSkillId === skill.id;
            return (
              <div
                key={skill.id}
                onMouseEnter={() => setActiveSkillId(skill.id)}
                onFocus={() => setActiveSkillId(skill.id)}
                className={`rounded-xl border bg-white p-5 transition-colors dark:bg-slate-900 ${
                  isHighlighted
                    ? 'border-blue-500/70 dark:border-blue-500/70'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {skill.category} <span aria-hidden="true">·</span> {skill.level}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="font-mono-tabular text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Track */}
                <div
                  className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {skill.description}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setActiveSkillId((prev) => (prev === skill.id ? null : skill.id))
                  }
                  aria-expanded={isHighlighted}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{skill.projectContext}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Experience, Awards & Certifications Accordion */}
        <div className="mt-14">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            경력 · 수상 · 자격 및 어학
          </h3>

          <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {EXPERIENCES.map((exp) => {
              const isOpen = openExpIds.includes(exp.id);
              const expPanelId = `exp-panel-${exp.id}`;

              return (
                <div key={exp.id} className="p-5 sm:px-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {exp.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{exp.period}</span>
                        <span aria-hidden="true">·</span>
                        <span>{exp.organization}</span>
                      </div>
                      <h4 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                        {exp.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExperience(exp.id)}
                      aria-expanded={isOpen}
                      aria-controls={expPanelId}
                      className="inline-flex min-h-[40px] items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 sm:self-center dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <span>{isOpen ? '성과 접기' : '세부 성과'}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {exp.summary}
                  </p>

                  {isOpen && (
                    <div
                      id={expPanelId}
                      className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800"
                    >
                      <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                        {exp.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                            />
                            <span>{outcome}</span>
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
