import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Job, judeteRomania } from '../types/job';
import { MapPin, Building2, Banknote, ExternalLink, Search, ArrowLeft, ArrowUp, Check, ChevronDown, Laptop2 } from 'lucide-react';
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

interface JobsListProps {
  jobs: Job[];
  jobsCount: number;
  companies: string[];
  loadingMoreJobs: boolean;
  hasMoreJobs: boolean;
  onLoadMoreJobs: () => void;
}

export function JobsList({ jobs, jobsCount, companies, loadingMoreJobs, hasMoreJobs, onLoadMoreJobs }: JobsListProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('search') || searchParams.get('q') || '';
  const companieParam = searchParams.get('companies') || searchParams.get('companie') || 'all';
  const judetParam = searchParams.get('counties') || searchParams.get('judet') || 'all';
  
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedJudet, setSelectedJudet] = useState<string>(judetParam);
  const [selectedCompanie, setSelectedCompanie] = useState<string>(companieParam);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isNavigatingHome, setIsNavigatingHome] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearchTerm(queryParam);
    setSelectedCompanie(companieParam);
    setSelectedJudet(judetParam);
    setIsApplyingFilters(false);
  }, [queryParam, companieParam, judetParam]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!hasMoreJobs || isApplyingFilters) {
      return;
    }

    const currentLoadMoreTarget = loadMoreRef.current;

    if (!currentLoadMoreTarget) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && !loadingMoreJobs) {
          onLoadMoreJobs();
        }
      },
      {
        rootMargin: '300px 0px',
      }
    );

    observer.observe(currentLoadMoreTarget);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreJobs, isApplyingFilters, loadingMoreJobs, onLoadMoreJobs, jobs.length]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }

    if (selectedCompanie !== 'all') {
      params.set('companies', selectedCompanie);
    }

    if (selectedJudet !== 'all') {
      params.set('counties', selectedJudet);
    }

    const query = params.toString();
    const currentQuery = searchParams.toString();

    if (query === currentQuery) {
      setIsApplyingFilters(false);
      return;
    }

    setIsApplyingFilters(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navigate(query ? `/cautare?${query}` : '/cautare');
      });
    });
  };

  const handleGoHome = () => {
    setIsNavigatingHome(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navigate('/');
      });
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const companyItems = useMemo(
    () =>
      companies.map((company) => (
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
      )),
    [companies, selectedCompanie]
  );

  const jobCards = useMemo(
    () =>
      jobs.map((job) => (
        <Card key={job.id} className="border-teal-100/80 bg-white/90 p-6 shadow-sm shadow-cyan-100/50 transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-cyan-100/80">
          <div className="mb-4">
            <h2 className="mb-2 text-xl text-sky-950 break-words [overflow-wrap:anywhere]">{job.titlu}</h2>
            <div className="mb-2 flex items-center gap-2 text-sky-900/70">
              <Building2 className="w-4 h-4" />
              <span>{job.companie}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sky-900/80">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">{job.localitate}</span>
                <span className="text-sky-800/55"> • {job.judet}</span>
              </div>
            </div>

            {job.remote ? (
              <div className="flex items-center gap-2 text-sky-900/80">
                <Laptop2 className="h-4 w-4 text-sky-700" />
                <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
                  {job.remote}
                </span>
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-teal-700" />
              <Badge
                variant="secondary"
                className={job.salariuMin !== null || job.salariuMax !== null ? 'border-teal-200 bg-teal-50 text-teal-800' : 'border-slate-200 bg-slate-50 text-slate-600'}
              >
                {formatSalary(job.salariuMin, job.salariuMax, job.salariuCurrency) || 'Salariu nespecificat'}
              </Badge>
            </div>

            <div className="border-t border-teal-100 pt-3">
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-[linear-gradient(180deg,_#f0fdfa,_#ecfeff)] px-4 py-2 text-sm font-medium text-teal-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 hover:shadow"
              >
                <span>Accesează anunțul</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Card>
      )),
    [jobs]
  );

  if (isNavigatingHome) {
    return <LoadingState fullScreen message="Se incarca..." subtitle="Revenim la pagina principala." />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#f4fbfb_0%,_#ecfeff_46%,_#eff6ff_100%)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 rounded-3xl border border-white/70 bg-white/70 px-4 py-4 shadow-sm shadow-cyan-100/70 backdrop-blur-xl">
          <Button variant="ghost" size="icon" onClick={handleGoHome} className="text-teal-800 hover:bg-teal-50 hover:text-teal-900">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <img src="/joblio_logo.png" alt="Joblio" className="h-11 w-auto object-contain" />
            <div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950 md:text-3xl">Joburi Disponibile</h1>
            <p className="text-sky-900/70">Descoperă următoarea ta oportunitate de carieră</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-[1.75rem] border border-teal-100 bg-white/85 p-6 shadow-sm shadow-cyan-100/60 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600/70" />
              <Input
                placeholder="Caută job, companie, localitate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleApplyFilters();
                  }
                }}
                className="border-teal-100 bg-white/95 pl-10 text-sky-950 placeholder:text-sky-800/45"
              />
            </div>

            <Select value={selectedJudet} onValueChange={setSelectedJudet}>
              <SelectTrigger className="border-teal-100 bg-white text-sky-950">
                <SelectValue placeholder="Toate județele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate județele</SelectItem>
                {judeteRomania.map(judet => (
                  <SelectItem key={judet} value={judet}>{judet}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={isCompanyOpen} onOpenChange={setIsCompanyOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*=text-])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-input-background px-3 py-2 text-sm whitespace-nowrap outline-none transition-[color,box-shadow] focus-visible:ring-[3px] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
                    'border-teal-100 bg-white text-sky-950'
                  )}
                  data-placeholder={selectedCompanie === 'all' ? '' : undefined}
                >
                  <span className={selectedCompanie === 'all' ? 'line-clamp-1 text-sky-800/50' : 'line-clamp-1 text-sky-950'}>
                    {selectedCompanie === 'all' ? 'Toate companiile' : selectedCompanie}
                  </span>
                  <ChevronDown className="size-4 opacity-50" />
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
                        setSelectedCompanie('all');
                        setIsCompanyOpen(false);
                      }}
                    >
                      <Check className={`mr-2 h-4 w-4 ${selectedCompanie === 'all' ? 'opacity-100' : 'opacity-0'}`} />
                      Toate companiile
                    </CommandItem>
                    {companyItems}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Button onClick={handleApplyFilters} className="md:col-span-3" disabled={isApplyingFilters}>
              {isApplyingFilters ? 'Se incarca...' : 'Aplică filtrele'}
            </Button>
          </div>
        </div>

        {isApplyingFilters ? (
          <LoadingState message="Se incarca..." subtitle="Aplicam filtrele selectate." />
        ) : null}

        {/* Results Count */}
        {!isApplyingFilters ? (
          <div className="mb-4">
            <p className="text-sky-900/70">
              {jobsCount} {jobsCount === 1 ? 'job găsit' : 'joburi găsite'}
            </p>
          </div>
        ) : null}

        {/* Jobs List */}
        {!isApplyingFilters && jobs.length === 0 ? (
          <div className="rounded-[1.75rem] border border-teal-100 bg-white/90 py-16 text-center shadow-sm shadow-cyan-100/60">
            <p className="mb-4 text-lg text-sky-900/60">
              Nu s-au găsit joburi care să corespundă filtrelor.
            </p>
            <Button onClick={handleGoHome}>Înapoi la pagina principală</Button>
          </div>
        ) : !isApplyingFilters ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {jobCards}
            </div>

            <div ref={loadMoreRef} className="py-8">
              {loadingMoreJobs ? (
                <LoadingState message="Se incarca..." subtitle="Aducem urmatoarele joburi." />
              ) : null}
              {!hasMoreJobs && jobs.length > 0 ? (
                <p className="text-center text-sm text-sky-900/55">Ai ajuns la finalul listei.</p>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {showScrollTopButton ? (
        <Button
          type="button"
          size="icon"
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg shadow-cyan-200/80"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      ) : null}
    </div>
  );
}
