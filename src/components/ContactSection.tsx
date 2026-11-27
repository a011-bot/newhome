import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Mail,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import { CANDIDATE_PROFILE } from '../data/portfolioData';

interface ContactSectionProps {
  onNotify: (message: string, tone?: 'info' | 'success' | 'error') => void;
}

interface ContactFormState {
  sender: string;
  email: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  sender?: string;
  email?: string;
  message?: string;
}

const DRAFT_STORAGE_KEY = 'portfolioContactDraft';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM: ContactFormState = {
  sender: '',
  email: '',
  inquiryType: '면접·채용 제안',
  message: '',
};

export function ContactSection({ onNotify }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<ContactFormState | null>(null);
  const isFirstMount = useRef(true);

  // Restore saved draft from localStorage on initial load
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ContactFormState>;
        if (parsed.sender || parsed.email || parsed.message) {
          setForm({
            sender: parsed.sender ?? '',
            email: parsed.email ?? '',
            inquiryType: parsed.inquiryType ?? '면접·채용 제안',
            message: parsed.message ?? '',
          });
          setHasRestoredDraft(true);
        }
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
  }, []);

  // Auto-save form draft with 300ms debounce
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        const hasContent =
          form.sender.trim().length > 0 ||
          form.email.trim().length > 0 ||
          form.message.trim().length > 0;

        if (hasContent) {
          window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(form));
        } else {
          window.localStorage.removeItem(DRAFT_STORAGE_KEY);
        }
      } catch {
        // Ignore storage errors
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [form]);

  const validateForm = (state: ContactFormState): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!state.sender.trim()) {
      nextErrors.sender = '보내는 분 성함 또는 소속 기업명을 입력해 주세요.';
    }
    if (!state.email.trim()) {
      nextErrors.email = '회신받으실 이메일 주소를 입력해 주세요.';
    } else if (!EMAIL_REGEX.test(state.email.trim())) {
      nextErrors.email = '올바른 이메일 형식(예: name@company.com)으로 입력해 주세요.';
    }
    if (state.message.trim().length < 10) {
      nextErrors.message = '문의 내용을 최소 10자 이상 입력해 주세요.';
    }
    return nextErrors;
  };

  const handleFieldChange = (field: keyof ContactFormState, value: string) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    if (errors[field as keyof FormErrors]) {
      const revalidated = validateForm(nextForm);
      setErrors((prev) => ({
        ...prev,
        [field]: revalidated[field as keyof FormErrors],
      }));
    }
  };

  const handleResetDraft = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setHasRestoredDraft(false);
    try {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    onNotify('임시 저장된 문의 내용을 초기화했습니다.', 'info');
  };

  const handleCopyEmail = async () => {
    const emailText = CANDIDATE_PROFILE.email;
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(emailText);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = emailText;
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
      setCopiedEmail(true);
      onNotify(`이메일 주소(${emailText})가 클립보드에 복사되었습니다.`, 'success');
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      onNotify(`자동 복사가 지원되지 않는 환경입니다. 이메일: ${emailText}`, 'error');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      onNotify('입력 항목을 다시 확인해 주세요.', 'error');
      return;
    }

    const receiptSnapshot: ContactFormState = {
      sender: form.sender.trim(),
      email: form.email.trim(),
      inquiryType: form.inquiryType,
      message: form.message.trim(),
    };

    setSubmittedReceipt(receiptSnapshot);
    setForm(INITIAL_FORM);
    setErrors({});
    setHasRestoredDraft(false);

    try {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const buildMailtoHref = (receipt: ContactFormState) => {
    const subject = encodeURIComponent(
      `[포트폴리오 문의 - ${receipt.inquiryType}] ${receipt.sender}`
    );
    const body = encodeURIComponent(
      `보내는 분: ${receipt.sender}\n회신 이메일: ${receipt.email}\n\n${receipt.message}`
    );
    return `mailto:${CANDIDATE_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="bg-white py-20 sm:py-24 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400">
            Contact
          </p>
          <h2 className="headline-balance mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            채용 제안 및 커피챗 문의
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            면접 일정 조율, 프로젝트 코드 리뷰, 협업 제안 등 어떤 이야기든 편하게 남겨주시면 영업일 기준 24시간 내에 회신드립니다.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Channels */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>직접 연락 이메일</span>
              </div>
              <p className="font-mono-tabular mt-2 break-all text-base font-bold text-slate-900 dark:text-white">
                {CANDIDATE_PROFILE.email}
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>복사 완료</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>이메일 주소 복사</span>
                  </>
                )}
              </button>
            </div>

            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              {[
                {
                  label: 'GitHub',
                  sub: '프로젝트 소스코드 및 커밋 로그',
                  href: CANDIDATE_PROFILE.github,
                },
                {
                  label: 'Tech Blog',
                  sub: '트러블슈팅 및 UT 회고 아카이브',
                  href: CANDIDATE_PROFILE.blog,
                },
                {
                  label: 'LinkedIn',
                  sub: '학력·경력 상세 프로필',
                  href: CANDIDATE_PROFILE.linkedin,
                },
              ].map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[64px] items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {channel.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {channel.sub}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form with Auto-Draft & Validation */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900"
            >
              {hasRestoredDraft && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-800 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
                  <span>작성 중이던 임시 저장 내용을 불러왔습니다.</span>
                  <button
                    type="button"
                    onClick={handleResetDraft}
                    className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    <span>초기화</span>
                  </button>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-sender"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    성함 / 소속 기업 <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <input
                    id="contact-sender"
                    type="text"
                    value={form.sender}
                    onChange={(e) => handleFieldChange('sender', e.target.value)}
                    placeholder="예: 홍길동 / OO테크 채용팀"
                    aria-invalid={Boolean(errors.sender)}
                    aria-describedby={errors.sender ? 'error-sender' : undefined}
                    className={`mt-2 min-h-[44px] w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 ${
                      errors.sender
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-slate-300 focus:border-blue-600 dark:border-slate-700'
                    }`}
                  />
                  {errors.sender && (
                    <p
                      id="error-sender"
                      className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.sender}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    회신받을 이메일 <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="name@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={`mt-2 min-h-[44px] w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 ${
                      errors.email
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-slate-300 focus:border-blue-600 dark:border-slate-700'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="error-email"
                      className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-type"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  문의 유형
                </label>
                <select
                  id="contact-type"
                  value={form.inquiryType}
                  onChange={(e) => handleFieldChange('inquiryType', e.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="면접·채용 제안">면접·채용 제안</option>
                  <option value="커피챗 요청">커피챗 요청</option>
                  <option value="프로젝트 협업 문의">프로젝트 협업 문의</option>
                  <option value="기타 문의">기타 문의</option>
                </select>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    문의 내용 <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <span className="font-mono-tabular text-xs text-slate-400">
                    {form.message.trim().length}자 (최소 10자)
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder="면접 제안 포지션, 궁금하신 프로젝트 내용 등을 자유롭게 적어주세요."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={`mt-2 w-full rounded-lg border px-3.5 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 ${
                    errors.message
                      ? 'border-red-600 focus:border-red-600'
                      : 'border-slate-300 focus:border-blue-600 dark:border-slate-700'
                  }`}
                />
                {errors.message && (
                  <p
                    id="error-message"
                    className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  입력 내용은 브라우저에 자동 임시 저장됩니다.
                </p>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>문의 보내기</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {submittedReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
        >
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setSubmittedReceipt(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                <h3 id="contact-success-title" className="text-base font-bold text-slate-900 dark:text-white">
                  문의 내용이 접수되었습니다
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedReceipt(null)}
                aria-label="확인 창 닫기"
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <strong className="font-semibold text-slate-900 dark:text-white">
                {submittedReceipt.sender}
              </strong>
              님의 [{submittedReceipt.inquiryType}] 메시지를 정상적으로 확인했습니다.
              입력하신 이메일({submittedReceipt.email})로 빠르게 회신드리겠습니다.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
              <a
                href={buildMailtoHref(submittedReceipt)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>메일 앱으로 바로 발송</span>
              </a>
              <button
                type="button"
                onClick={() => setSubmittedReceipt(null)}
                className="inline-flex min-h-[40px] items-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
