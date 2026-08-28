import { useEffect, useMemo, useState, type FormEvent } from 'react';

const MATERIALS = [
  {
    id: 'cedar',
    name: 'Weathered Cedar',
    tone: '#8b6a4a',
    description: 'Soft grain, silvered edges, built for open-air living.',
  },
  {
    id: 'slate',
    name: 'Slate Composite',
    tone: '#5d6b73',
    description: 'Cool mineral finish that shrugs off rain and sun.',
  },
  {
    id: 'pine',
    name: 'Pine Green Steel',
    tone: '#1f5c45',
    description: 'Powder-coated frames with alpine-trail durability.',
  },
] as const;

const SETS = [
  {
    id: 'deck',
    title: 'Deck Line',
    pieces: 4,
    price: 2480,
    blurb: 'Lounge chairs, side table, and a low bench for evening gatherings.',
  },
  {
    id: 'terrace',
    title: 'Terrace Line',
    pieces: 6,
    price: 3640,
    blurb: 'Dining for six with modular benches that reconfigure for guests.',
  },
  {
    id: 'ridge',
    title: 'Ridge Line',
    pieces: 8,
    price: 5120,
    blurb: 'Full patio system with storage ottomans and a weather canopy kit.',
  },
] as const;

type MaterialId = (typeof MATERIALS)[number]['id'];
type SetId = (typeof SETS)[number]['id'];

export const RidgeframeLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [materialId, setMaterialId] = useState<MaterialId>('cedar');
  const [setId, setSetId] = useState<SetId>('terrace');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [joined, setJoined] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const material = useMemo(
    () => MATERIALS.find((item) => item.id === materialId) ?? MATERIALS[0],
    [materialId],
  );
  const selectedSet = useMemo(
    () => SETS.find((item) => item.id === setId) ?? SETS[1],
    [setId],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function handleJoin(event: FormEvent) {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email to join the build list.');
      setJoined(false);
      return;
    }
    setEmailError('');
    setJoined(true);
  }

  return (
    <div className="min-h-full w-full bg-[var(--mist)] text-[var(--ink)]">
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[var(--ink)]/10 bg-[var(--mist)]/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
            Ridgeframe
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#materials" className="transition-opacity hover:opacity-70">
              Materials
            </a>
            <a href="#configure" className="transition-opacity hover:opacity-70">
              Configure
            </a>
            <a href="#waitlist" className="transition-opacity hover:opacity-70">
              Waitlist
            </a>
            <a
              href="#waitlist"
              className="bg-[var(--pine)] px-4 py-2 text-[var(--mist)] transition-transform hover:-translate-y-0.5"
            >
              Reserve a set
            </a>
          </nav>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[var(--ink)]/20 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-0.5 bg-[var(--ink)] transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 bg-[var(--ink)] transition ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-[var(--ink)] transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[var(--ink)]/10 bg-[var(--mist)] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="#materials" onClick={() => setMenuOpen(false)}>
                Materials
              </a>
              <a href="#configure" onClick={() => setMenuOpen(false)}>
                Configure
              </a>
              <a href="#waitlist" onClick={() => setMenuOpen(false)}>
                Waitlist
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0 hero-grain">
            <div
              className="animate-drift absolute inset-0 scale-105 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(20,32,24,0.55) 0%, rgba(31,92,69,0.28) 42%, rgba(197,213,223,0.2) 100%), url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--mist)] via-transparent to-[var(--ink)]/20" />
          </div>

          <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
            <p className="animate-fade-up font-display text-4xl font-extrabold tracking-tight text-white drop-shadow md:text-6xl lg:text-7xl">
              Ridgeframe
            </p>
            <h1 className="animate-fade-up-delay-1 mt-4 max-w-2xl font-display text-2xl font-bold leading-tight text-white md:text-4xl">
              Outdoor furniture built for ridgelines, decks, and long seasons.
            </h1>
            <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base text-white/90 md:text-lg">
              Modular pieces in cedar, slate, and pine-green steel — designed to live outside without looking temporary.
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <a
                href="#configure"
                className="bg-[var(--pine)] px-5 py-3 text-sm font-semibold text-[var(--mist)] transition hover:-translate-y-0.5"
              >
                Configure a set
              </a>
              <a
                href="#materials"
                className="border border-white/70 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore materials
              </a>
            </div>
          </div>
        </section>

        <section id="materials" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
              Materials that weather with you
            </h2>
            <p className="mt-4 text-[var(--stone)] md:text-lg">
              Choose a finish. Watch the frame tone shift as you compare what belongs on your patio.
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div
              className="relative min-h-[280px] overflow-hidden border border-[var(--ink)]/10 transition-colors duration-500 md:min-h-[420px]"
              style={{ background: `linear-gradient(145deg, ${material.tone} 0%, #c5d5df 70%, #e8eef2 100%)` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-display text-2xl font-bold text-white drop-shadow">
                  {material.name}
                </p>
                <p className="mt-2 max-w-md text-white/90">{material.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3" role="radiogroup" aria-label="Material finish">
              {MATERIALS.map((item) => {
                const active = item.id === materialId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMaterialId(item.id)}
                    className={`flex items-center gap-4 border px-4 py-4 text-left transition ${
                      active
                        ? 'border-[var(--pine)] bg-white shadow-[0_10px_30px_rgba(20,32,24,0.08)]'
                        : 'border-[var(--ink)]/15 bg-transparent hover:border-[var(--ink)]/35'
                    }`}
                  >
                    <span
                      className="h-10 w-10 shrink-0 border border-black/10"
                      style={{ backgroundColor: item.tone }}
                      aria-hidden
                    />
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="mt-1 block text-sm text-[var(--stone)]">{item.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="configure"
          className="border-y border-[var(--ink)]/10 bg-[linear-gradient(180deg,#dfe8ee_0%,#e8eef2_100%)] px-5 py-20 md:px-8 md:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Configure your set
              </h2>
              <p className="mt-4 text-[var(--stone)] md:text-lg">
                Pick a line, then reserve it in {material.name.toLowerCase()}. Pricing updates live as you choose.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3" role="tablist" aria-label="Furniture sets">
              {SETS.map((item) => {
                const active = item.id === setId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSetId(item.id)}
                    className={`border p-5 text-left transition ${
                      active
                        ? 'border-[var(--pine)] bg-white'
                        : 'border-[var(--ink)]/15 bg-white/40 hover:bg-white/70'
                    }`}
                  >
                    <p className="font-display text-xl font-bold">{item.title}</p>
                    <p className="mt-2 text-sm text-[var(--stone)]">{item.pieces} pieces</p>
                    <p className="mt-4 text-2xl font-semibold tracking-tight">
                      ${item.price.toLocaleString()}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 border border-[var(--ink)]/10 bg-white p-6 md:p-8">
              <p className="font-display text-2xl font-bold">
                {selectedSet.title} · {material.name}
              </p>
              <p className="mt-3 max-w-2xl text-[var(--stone)]">{selectedSet.blurb}</p>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-[var(--stone)]">Estimated total</p>
                  <p className="mt-1 font-display text-4xl font-extrabold">
                    ${selectedSet.price.toLocaleString()}
                  </p>
                </div>
                <a
                  href="#waitlist"
                  className="bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--mist)] transition hover:-translate-y-0.5"
                >
                  Save this configuration
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Join the spring build list
              </h2>
              <p className="mt-4 max-w-md text-[var(--stone)] md:text-lg">
                Limited runs ship twice a year. Leave your email and we will confirm your {selectedSet.title} in{' '}
                {material.name}.
              </p>
            </div>

            <form onSubmit={handleJoin} className="border border-[var(--ink)]/15 bg-white p-5 md:p-6" noValidate>
              <label htmlFor="ridge-email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="ridge-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailError('');
                    setJoined(false);
                  }}
                  placeholder="you@studio.com"
                  className="w-full border border-[var(--ink)]/20 bg-[var(--mist)] px-4 py-3 outline-none transition focus:border-[var(--pine)]"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? 'ridge-email-error' : undefined}
                />
                <button
                  type="submit"
                  className="shrink-0 bg-[var(--pine)] px-5 py-3 text-sm font-semibold text-[var(--mist)] transition hover:-translate-y-0.5"
                >
                  Join waitlist
                </button>
              </div>
              {emailError && (
                <p id="ridge-email-error" className="mt-3 text-sm text-red-700" role="alert">
                  {emailError}
                </p>
              )}
              {joined && !emailError && (
                <p className="mt-3 text-sm text-[var(--pine)]" role="status">
                  You are on the list for {selectedSet.title} in {material.name}. We will write soon.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ink)]/10 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[var(--stone)] md:flex-row md:items-center md:justify-between">
          <p className="font-display text-base font-bold text-[var(--ink)]">Ridgeframe</p>
          <p>Outdoor systems for decks, terraces, and open air.</p>
        </div>
      </footer>
    </div>
  );
};
