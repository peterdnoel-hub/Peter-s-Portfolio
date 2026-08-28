import { useEffect, useMemo, useState, type FormEvent } from 'react';

const FEATURES = [
  {
    id: 'focus',
    title: 'Focus sessions',
    body: 'Timed writing blocks with a quiet clock and no tabs begging for attention.',
  },
  {
    id: 'drafts',
    title: 'Living drafts',
    body: 'Keep morning notes, essay starts, and half-formed ideas in one calm stream.',
  },
  {
    id: 'export',
    title: 'Clean export',
    body: 'Send finished work to Markdown or plain text without reformatting gymnastics.',
  },
] as const;

const DURATIONS = [15, 25, 45] as const;

type FeatureId = (typeof FEATURES)[number]['id'];
type Duration = (typeof DURATIONS)[number];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export const NoriDeskLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featureId, setFeatureId] = useState<FeatureId>('focus');
  const [duration, setDuration] = useState<Duration>(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [draft, setDraft] = useState(
    'The harbor was quiet enough to hear the ferry ropes settle. She opened a new page and wrote the first sentence without looking for permission.',
  );
  const [focusMode, setFocusMode] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const feature = useMemo(
    () => FEATURES.find((item) => item.id === featureId) ?? FEATURES[0],
    [featureId],
  );

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, secondsLeft]);

  function chooseDuration(next: Duration) {
    setDuration(next);
    setSecondsLeft(next * 60);
    setRunning(false);
  }

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email.');
      setSubscribed(false);
      return;
    }
    setEmailError('');
    setSubscribed(true);
  }

  return (
    <div className={`min-h-full w-full text-[var(--ink)] ${focusMode ? 'bg-[#f4f7fa]' : 'nori-atmosphere'}`}>
      <header className="sticky top-0 z-40 border-b border-[var(--ink)]/8 bg-[var(--mist)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Nori Desk
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#demo" className="transition-opacity hover:opacity-70">
              Demo
            </a>
            <a href="#features" className="transition-opacity hover:opacity-70">
              Features
            </a>
            <a href="#start" className="transition-opacity hover:opacity-70">
              Start
            </a>
            <button
              type="button"
              onClick={() => setFocusMode((value) => !value)}
              className="rounded-md border border-[var(--ink)]/15 px-3 py-2 transition hover:border-[var(--ink)]/35"
            >
              {focusMode ? 'Exit focus' : 'Focus mode'}
            </button>
          </nav>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--ink)]/15 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-0.5 bg-[var(--ink)] transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 bg-[var(--ink)] transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-[var(--ink)] transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[var(--ink)]/10 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="#demo" onClick={() => setMenuOpen(false)}>
                Demo
              </a>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Features
              </a>
              <a href="#start" onClick={() => setMenuOpen(false)}>
                Start
              </a>
              <button
                type="button"
                className="text-left"
                onClick={() => {
                  setFocusMode((value) => !value);
                  setMenuOpen(false);
                }}
              >
                {focusMode ? 'Exit focus' : 'Focus mode'}
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="animate-soft-pan absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, rgba(238,243,247,0.92) 0%, rgba(238,243,247,0.55) 38%, rgba(26,39,64,0.35) 100%), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2000&q=80')",
              }}
            />
          </div>

          <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 py-28 md:px-8">
            <p className="animate-rise font-display text-5xl font-semibold tracking-tight text-[var(--ink)] md:text-7xl">
              Nori Desk
            </p>
            <h1 className="animate-rise-delay-1 mt-5 max-w-2xl font-display text-3xl font-medium leading-tight text-[var(--ink)] md:text-5xl">
              A quiet place to finish the page.
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-lg text-base text-[var(--ink)]/75 md:text-lg">
              Timed focus, living drafts, and calm tools for writers who want fewer interruptions and more finished sentences.
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <a
                href="#start"
                className="rounded-md bg-[var(--marigold)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Start writing free
              </a>
              <a
                href="#demo"
                className="rounded-md border border-[var(--ink)]/20 bg-white/60 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white"
              >
                Try the timer
              </a>
            </div>
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Try a focus block
            </h2>
            <p className="mt-4 text-[var(--ink)]/70 md:text-lg">
              Choose a duration, start the clock, and keep writing in the demo pad below.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-2xl border border-[var(--ink)]/10 bg-white/70 p-6 backdrop-blur md:p-8">
              <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
                <span className="animate-pulse-ring absolute inset-0 rounded-full border border-[var(--marigold)]/40" />
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-[var(--ink)]/10 bg-[var(--paper)]">
                  <p className="font-display text-4xl font-semibold tabular-nums">{formatTime(secondsLeft)}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--ink)]/55">
                    {running ? 'Writing' : secondsLeft === 0 ? 'Complete' : 'Ready'}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Session length">
                {DURATIONS.map((item) => {
                  const active = item === duration;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => chooseDuration(item)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                        active
                          ? 'bg-[var(--ink)] text-white'
                          : 'border border-[var(--ink)]/15 text-[var(--ink)] hover:border-[var(--ink)]/35'
                      }`}
                    >
                      {item} min
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setRunning((value) => !value)}
                  disabled={secondsLeft === 0}
                  className="rounded-md bg-[var(--marigold)] px-4 py-2.5 text-sm font-semibold text-white transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {running ? 'Pause' : 'Start'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    setSecondsLeft(duration * 60);
                  }}
                  className="rounded-md border border-[var(--ink)]/15 px-4 py-2.5 text-sm font-semibold transition hover:border-[var(--ink)]/35"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--ink)]/10 bg-white/80 p-5 backdrop-blur md:p-6">
              <label htmlFor="nori-draft" className="text-sm font-medium text-[var(--ink)]/70">
                Demo draft
              </label>
              <textarea
                id="nori-draft"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={12}
                className={`mt-3 w-full resize-none rounded-xl border border-[var(--ink)]/10 bg-[var(--paper)] p-4 text-base leading-relaxed outline-none transition focus:border-[var(--marigold)] ${
                  focusMode ? 'font-display text-lg' : ''
                }`}
              />
              <p className="mt-3 text-sm text-[var(--ink)]/55">
                {draft.trim().split(/\s+/).filter(Boolean).length} words · focus mode{' '}
                {focusMode ? 'on' : 'off'}
              </p>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-y border-[var(--ink)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(238,243,247,0.9))] px-5 py-20 md:px-8 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                Built for the middle of a draft
              </h2>
              <p className="mt-4 text-[var(--ink)]/70 md:text-lg">
                Switch through the tools you actually reach for when the sentence gets stubborn.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3" role="tablist" aria-label="Product features">
              {FEATURES.map((item) => {
                const active = item.id === featureId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFeatureId(item.id)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      active
                        ? 'border-[var(--marigold)] bg-white'
                        : 'border-[var(--ink)]/10 bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    <p className="font-display text-xl font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm text-[var(--ink)]/65">{item.body}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-[var(--ink)]/10 bg-white p-6 md:p-8" role="tabpanel">
              <p className="font-display text-2xl font-semibold">{feature.title}</p>
              <p className="mt-3 max-w-2xl text-[var(--ink)]/70">{feature.body}</p>
              <p className="mt-5 text-sm text-[var(--marigold)]">
                Tip: use Focus mode in the header to quiet the chrome while you try the demo pad.
              </p>
            </div>
          </div>
        </section>

        <section id="start" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                Start your next chapter with Nori Desk
              </h2>
              <p className="mt-4 max-w-md text-[var(--ink)]/70 md:text-lg">
                Early access is free for writers. Leave your email and we will send a quiet invite — no launch fireworks.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="rounded-2xl border border-[var(--ink)]/10 bg-white/80 p-5 backdrop-blur md:p-6"
              noValidate
            >
              <label htmlFor="nori-email" className="block text-sm font-medium">
                Email
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="nori-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError('');
                    setSubscribed(false);
                  }}
                  placeholder="writer@studio.com"
                  className="w-full rounded-md border border-[var(--ink)]/15 bg-[var(--paper)] px-4 py-3 outline-none transition focus:border-[var(--marigold)]"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'nori-email-error' : undefined}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Request invite
                </button>
              </div>
              {emailError && (
                <p id="nori-email-error" className="mt-3 text-sm text-red-700" role="alert">
                  {emailError}
                </p>
              )}
              {subscribed && !emailError && (
                <p className="mt-3 text-sm text-[var(--marigold)]" role="status">
                  Invite requested. Check your inbox when your desk is ready.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ink)]/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-[var(--ink)]/60 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg font-semibold text-[var(--ink)]">Nori Desk</p>
          <p>Focus tools for writers who prefer quiet progress.</p>
        </div>
      </footer>
    </div>
  );
};
