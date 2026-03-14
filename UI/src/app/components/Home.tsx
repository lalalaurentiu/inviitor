import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Job, judeteRomania } from '../types/job';
import { ArrowRight, Banknote, Briefcase, Building2, Check, ChevronDown, Laptop2, MapPin, Search, Sparkles } from 'lucide-react';
import { formatSalary } from '../hooks/useJobs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LoadingState } from './LoadingState';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from './ui/utils';

interface HomeProps {
  jobs: Job[];
  totalJobs: number;
  salaryFloor: number | null;
  salaryFloorCurrency: string | null;
  companies: string[];
}

const createIllustration = (
  eyebrow: string,
  title: string,
  accent: string,
  background: string,
  glow: string
) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#f8fafc" />
        </linearGradient>
        <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96" />
          <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.92" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)" />
      <circle cx="980" cy="120" r="200" fill="${glow}" opacity="0.28" />
      <circle cx="180" cy="640" r="220" fill="${accent}" opacity="0.14" />
      <rect x="96" y="96" width="1008" height="608" rx="40" fill="url(#card)" />
      <rect x="150" y="150" width="240" height="18" rx="9" fill="${accent}" opacity="0.88" />
      <rect x="150" y="198" width="430" height="30" rx="15" fill="#0f172a" opacity="0.84" />
      <rect x="150" y="244" width="340" height="18" rx="9" fill="#64748b" opacity="0.36" />
      <rect x="150" y="314" width="360" height="250" rx="28" fill="#ffffff" />
      <rect x="544" y="314" width="220" height="116" rx="28" fill="${accent}" opacity="0.9" />
      <rect x="790" y="314" width="170" height="250" rx="28" fill="#dbeafe" />
      <rect x="544" y="448" width="220" height="116" rx="28" fill="#e2e8f0" />
      <rect x="150" y="596" width="810" height="20" rx="10" fill="#94a3b8" opacity="0.28" />
      <text x="150" y="466" font-family="Georgia, serif" font-size="34" fill="#0f172a">${eyebrow}</text>
      <text x="150" y="406" font-family="Georgia, serif" font-size="52" fill="#0f172a">${title}</text>
    </svg>
  `)}`;

const heroImage = createIllustration('Platforma de recrutare', 'Joburi actualizate rapid', '#0f766e', '#ecfeff', '#67e8f9');

export function Home({ jobs, totalJobs, salaryFloor, salaryFloorCurrency, companies }: HomeProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanie, setSelectedCompanie] = useState('');
  const [selectedJudet, setSelectedJudet] = useState<string>('all');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const featuredJobs = useMemo(
    () => [...jobs].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6),
    [jobs]
  );

  const topCities = useMemo(() => {
    const counts = jobs.reduce<Record<string, number>>((acc, job) => {
      acc[job.localitate] = (acc[job.localitate] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([city, count]) => ({ city, count }));
  }, [jobs]);

  const latestSalary = typeof salaryFloor === 'number' ? formatSalary(salaryFloor, null, salaryFloorCurrency) : null;

  const handleSearch = () => {
    setIsNavigating(true);

    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (selectedCompanie.trim()) params.set('companies', selectedCompanie.trim());
    if (selectedJudet !== 'all') params.set('counties', selectedJudet);

    const destination = params.toString() ? `/cautare?${params.toString()}` : '/cautare';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navigate(destination);
      });
    });
  };

  if (isNavigating) {
    return <LoadingState fullScreen message="Se incarca..." subtitle="Pregatim rezultatele cautarii." />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),linear-gradient(180deg,_#f4fbfb_0%,_#ecfeff_45%,_#f8fafc_100%)] text-sky-950">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-[-6rem] top-10 h-72 w-72 rounded-full bg-teal-300/45 blur-3xl" />
        <div className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-100/80 blur-3xl" />
      </div>

      <header className="border-b border-teal-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3 text-sky-950">
            <img src="/joblio_logo.png" alt="Joblio" className="h-10 w-auto object-contain" />
          </Link>
          <nav aria-label="Navigare principală" className="hidden items-center gap-6 text-sm text-sky-800/80 md:flex">
            <a href="#joburi-recomandate" className="transition-colors hover:text-teal-700">Joburi noi</a>
            <a href="#orase-populare" className="transition-colors hover:text-teal-700">Orașe populare</a>
            <a href="#intrebari-frecvente" className="transition-colors hover:text-teal-700">Întrebări frecvente</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <Badge className="mb-5 border border-teal-200 bg-white/85 text-teal-800 shadow-sm shadow-teal-100">
              <Sparkles className="mr-2 h-4 w-4" />
              Platformă cu joburi din România
            </Badge>
            <h1 className="max-w-3xl text-4xl leading-tight tracking-tight text-sky-950 md:text-6xl">
              Găsește joburi în România mai rapid, cu filtre clare și anunțuri ușor de comparat.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-900/70">
              Explorează locuri de muncă din IT, marketing, HR, project management și alte domenii.
              Pagina principală evidențiază joburile recente, orașele active și companiile care recrutează acum.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={handleSearch} className="h-12 px-6 text-base">
                Vezi toate joburile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href="#joburi-recomandate"
                className="inline-flex h-12 items-center justify-center rounded-md border border-teal-200 bg-white/85 px-6 text-base font-medium text-teal-900 transition-colors hover:bg-teal-50"
              >
                Vezi joburile recomandate
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-teal-100 bg-white/85 p-4 shadow-sm shadow-teal-100/70 backdrop-blur-xl">
                <dt className="text-sm text-sky-800/70">Joburi active</dt>
                <dd className="mt-2 text-3xl font-semibold text-sky-950">{totalJobs.toLocaleString('ro-RO')}</dd>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-white/85 p-4 shadow-sm shadow-sky-100/70 backdrop-blur-xl">
                <dt className="text-sm text-sky-800/70">Companii</dt>
                <dd className="mt-2 text-3xl font-semibold text-sky-950">{companies.length.toLocaleString('ro-RO')}</dd>
              </div>
              <div className="rounded-2xl border border-cyan-100 bg-white/85 p-4 shadow-sm shadow-cyan-100/70 backdrop-blur-xl">
                <dt className="text-sm text-sky-800/70">Județe</dt>
                <dd className="mt-2 text-3xl font-semibold text-sky-950">{judeteRomania.length}</dd>
              </div>
              <div className="rounded-2xl border border-teal-100 bg-white/85 p-4 shadow-sm shadow-teal-100/70 backdrop-blur-xl">
                <dt className="text-sm text-sky-800/70">Salariu de la</dt>
                <dd className="mt-2 min-h-[1.75rem] text-sky-950 sm:min-h-[2rem]">
                  {latestSalary ? (
                    <span className="block max-w-full break-words text-sm font-medium leading-6 text-sky-900 [overflow-wrap:anywhere] sm:text-base">
                      {latestSalary}
                    </span>
                  ) : (
                    <span className="block max-w-full break-words text-sm font-medium leading-6 text-slate-500 [overflow-wrap:anywhere] sm:text-base">
                      Nespecificat
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-xl shadow-cyan-200/60 backdrop-blur-xl">
            <img
              src={heroImage}
              alt="Ilustrație pentru căutarea de joburi în România"
              className="mb-6 h-64 w-full rounded-[1.5rem] object-cover md:h-80"
            />

            <div className="rounded-[1.5rem] border border-teal-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(236,254,255,0.94))] p-5 shadow-sm shadow-teal-100/80">
              <h2 className="text-xl font-semibold text-sky-950">Caută jobul potrivit</h2>
              <p className="mt-2 text-sm leading-6 text-sky-900/70">
                Filtrează după titlu, companie sau județ pentru a ajunge rapid la anunțurile relevante.
              </p>

              <div className="mt-5 grid gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-600/70" />
                  <Input
                    type="text"
                    placeholder="Ex: Front-End Developer, Cluj, Marketing"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                    className="h-12 border-teal-100 bg-white/95 pl-12 text-sky-950 placeholder:text-sky-800/45"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Popover open={isCompanyOpen} onOpenChange={setIsCompanyOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          'border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*=text-])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap outline-none transition-[color,box-shadow] focus-visible:ring-[3px] data-[size=default]:h-12 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
                          'border-teal-100 bg-white text-sky-950'
                        )}
                        data-placeholder={!selectedCompanie ? '' : undefined}
                      >
                        <span className={!selectedCompanie ? 'line-clamp-1 text-sky-800/50' : 'line-clamp-1 text-sky-950'}>
                          {selectedCompanie || 'Toate companiile'}
                        </span>
                        <ChevronDown className="size-4 shrink-0 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Cauta compania..." />
                        <CommandList>
                          <CommandEmpty>Nu exista companii potrivite.</CommandEmpty>
                          <CommandItem
                            value="Toate companiile"
                            onSelect={() => {
                              setSelectedCompanie('');
                              setIsCompanyOpen(false);
                            }}
                          >
                            <Check className={`mr-2 h-4 w-4 ${selectedCompanie ? 'opacity-0' : 'opacity-100'}`} />
                            Toate companiile
                          </CommandItem>
                          {companies.map((company) => (
                            <CommandItem
                              key={company}
                              value={company}
                              onSelect={() => {
                                setSelectedCompanie(company);
                                setIsCompanyOpen(false);
                              }}
                            >
                              <Check className={`mr-2 h-4 w-4 ${selectedCompanie === company ? 'opacity-100' : 'opacity-0'}`} />
                              {company}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Select value={selectedJudet} onValueChange={setSelectedJudet}>
                    <SelectTrigger className="h-12 border-teal-100 bg-white text-sky-950">
                      <SelectValue placeholder="Toate județele" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate județele</SelectItem>
                      {judeteRomania.map((judet) => (
                        <SelectItem key={judet} value={judet}>
                          {judet}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSearch} className="h-12 text-base">
                  Caută joburi
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-8">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-teal-100 bg-white/85 p-6 shadow-sm shadow-teal-100/70">
              <Briefcase className="mb-4 h-8 w-8 text-emerald-700" />
              <h2 className="text-xl font-semibold text-sky-950">Anunțuri clare și ușor de parcurs</h2>
              <p className="mt-3 text-sm leading-7 text-sky-900/70">
                Fiecare job afișează titlul, compania, orașul, salariul și o descriere scurtă pentru o comparație rapidă.
              </p>
            </article>
            <article className="rounded-3xl border border-sky-100 bg-white/85 p-6 shadow-sm shadow-sky-100/70">
              <MapPin className="mb-4 h-8 w-8 text-sky-700" />
              <h2 className="text-xl font-semibold text-sky-950">Filtrare după județ și localitate</h2>
              <p className="mt-3 text-sm leading-7 text-sky-900/70">
                Caută locuri de muncă în București, Cluj-Napoca, Iași, Brașov, Timișoara și alte orașe importante din România.
              </p>
            </article>
            <article className="rounded-3xl border border-cyan-100 bg-white/85 p-6 shadow-sm shadow-cyan-100/70">
              <Banknote className="mb-4 h-8 w-8 text-orange-700" />
              <h2 className="text-xl font-semibold text-sky-950">Interval salarial vizibil</h2>
              <p className="mt-3 text-sm leading-7 text-sky-900/70">
                Vezi din prima estimarea salarială pentru a decide mai repede dacă un anunț merită analizat în detaliu.
              </p>
            </article>
          </div>
        </section>

        <section id="joburi-recomandate" className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700/75">Joburi recomandate</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-sky-950">Cele mai recente oportunități de carieră</h2>
              <p className="mt-3 max-w-2xl text-sky-900/70">
                Aceste anunțuri sunt deja publicate în platformă și ajută motoarele de căutare să înțeleagă mai bine conținutul paginii.
              </p>
            </div>
            <Link to="/cautare" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
              Vezi toate joburile
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {featuredJobs.map((job) => (
              <Link key={job.id} to={`/job/${job.id}`} className="block">
                <Card className="h-full rounded-3xl border-teal-100 bg-white/90 p-6 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-cyan-100/70">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-sky-950">{job.titlu}</h3>
                      <div className="mt-3 flex items-center gap-2 text-sky-900/70">
                        <Building2 className="h-4 w-4" />
                        <span>{job.companie}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="border border-teal-200 bg-teal-50 text-teal-800">
                      Nou
                    </Badge>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-sky-900/75">
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-teal-900">
                      <MapPin className="h-4 w-4" />
                      {job.localitate}, {job.judet}
                    </span>
                    {job.remote ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sky-800 ring-1 ring-sky-100">
                        <Laptop2 className="h-4 w-4" />
                        {job.remote}
                      </span>
                    ) : null}
                    <span
                      className={job.salariuMin !== null || job.salariuMax !== null
                        ? 'inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-sky-900'
                        : 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-600'}
                    >
                      <Banknote className="h-4 w-4" />
                      {formatSalary(job.salariuMin, job.salariuMax, job.salariuCurrency) || 'Salariu nespecificat'}
                    </span>
                  </div>

                  <p className="mt-5 line-clamp-3 text-sm leading-7 text-sky-900/70">
                    {job.descriere || 'Vezi detaliile complete ale jobului pentru informații despre cerințe și responsabilități.'}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="orase-populare" className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700/75">Căutări populare</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-sky-950">Orașe și companii cu activitate ridicată</h2>
              <p className="mt-4 text-sky-900/70 leading-7">
                Pentru pagini mai utile și mai prietenoase cu SEO, homepage-ul include linkuri directe către căutări relevante,
                astfel încât utilizatorii și crawler-ele să găsească mai ușor conținut intern valoros.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {topCities.map(({ city, count }) => (
                <Link
                  key={city}
                  to={`/cautare?q=${encodeURIComponent(city)}`}
                  className="rounded-3xl border border-teal-100 bg-white/90 p-5 shadow-sm shadow-teal-100/60 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                >
                  <p className="text-sm text-teal-700/70">Joburi în</p>
                  <h3 className="mt-2 text-xl font-semibold text-sky-950">{city}</h3>
                  <p className="mt-3 text-sm text-sky-900/70">Aproximativ {count} anunțuri disponibile în acest moment.</p>
                </Link>
              ))}

              {companies.slice(0, 4).map((company) => (
                <Link
                  key={company}
                  to={`/cautare?companie=${encodeURIComponent(company)}`}
                  className="rounded-3xl border border-sky-100 bg-white/90 p-5 shadow-sm shadow-sky-100/60 transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-md"
                >
                  <p className="text-sm text-sky-700/70">Companie activă</p>
                  <h3 className="mt-2 text-xl font-semibold text-sky-950">{company}</h3>
                  <p className="mt-3 text-sm text-sky-900/70">Vezi joburile disponibile publicate de această companie.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="intrebari-frecvente" className="mx-auto max-w-6xl px-4 py-12 pb-20">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700/75">Întrebări frecvente</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-sky-950">Informații utile pentru candidați</h2>
          </div>

          <div className="grid gap-4">
            <details className="rounded-3xl border border-teal-100 bg-white/90 p-6 shadow-sm shadow-teal-100/60" open>
              <summary className="cursor-pointer list-none text-lg font-semibold text-sky-950">
                Cum găsesc rapid un job relevant?
              </summary>
              <p className="mt-4 text-sm leading-7 text-sky-900/70">
                Folosește căutarea după cuvinte cheie și filtrele pentru companie sau județ. Apoi compară titlul, orașul și salariul direct din listă.
              </p>
            </details>

            <details className="rounded-3xl border border-sky-100 bg-white/90 p-6 shadow-sm shadow-sky-100/60">
              <summary className="cursor-pointer list-none text-lg font-semibold text-sky-950">
                Ce tipuri de joburi sunt publicate?
              </summary>
              <p className="mt-4 text-sm leading-7 text-sky-900/70">
                Platforma include joburi din IT, marketing, resurse umane, design, project management, QA, DevOps și alte domenii populare în România.
              </p>
            </details>

            <details className="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-sm shadow-cyan-100/60">
              <summary className="cursor-pointer list-none text-lg font-semibold text-sky-950">
                Pot vedea detaliile complete ale unui job?
              </summary>
              <p className="mt-4 text-sm leading-7 text-sky-900/70">
                Da. Fiecare card trimite către o pagină dedicată jobului, unde poți citi descrierea și accesa anunțul extern complet.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}
