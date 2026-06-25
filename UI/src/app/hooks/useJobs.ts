import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getApiUrl } from '../config/site';
import { Job } from '../types/job';

interface MobileJobResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MobileJob[];
}

interface MobileTotalResponse {
  total: number;
  salary_floor?: number | null;
  salary_floor_currency?: string | null;
  companies: string[];
  companies_count: number;
}

function normalizeCompanies(companies: string[]) {
  return Array.from(
    new Set(
      companies
        .map((company) => company.trim())
        .filter(Boolean)
    )
  ).sort((firstCompany, secondCompany) => firstCompany.localeCompare(secondCompany, 'ro'));
}

interface MobileJob {
  id: number | string;
  job_title: string;
  company_name?: string | null;
  city?: string | null;
  county?: string | null;
  job_link: string;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string | null;
  remote?: string | null;
  date?: string | null;
}

function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '';
    }
  }

  return getApiUrl();
}

const API_BASE_URL = getApiBaseUrl();
const JOBS_ENDPOINT = `${API_BASE_URL}/mobile/?page_size=50`;
const TOTAL_JOBS_ENDPOINT = `${API_BASE_URL}/mobile/total/`;

function stripDiacritics(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeFilterValue(value: string) {
  return value
    .split(',')
    .map((item) => stripDiacritics(item.trim()))
    .filter(Boolean)
    .join(',');
}

function normalizeApiUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const parsedUrl = new URL(url);
    return API_BASE_URL
      ? `${API_BASE_URL}${parsedUrl.pathname}${parsedUrl.search}`
      : `${parsedUrl.pathname}${parsedUrl.search}`;
  }

  if (API_BASE_URL) {
    return url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
  }

  return url.startsWith('/') ? url : `/${url}`;
}

function buildJobsEndpoint(pathname: string, search: string) {
  if (pathname !== '/cautare') {
    return JOBS_ENDPOINT;
  }

  const currentParams = new URLSearchParams(search);
  const params = new URLSearchParams();
  params.set('page_size', '50');

  const searchValue = currentParams.get('search') || currentParams.get('q');
  const citiesValue = currentParams.get('cities');
  const countiesValue = currentParams.get('counties') || currentParams.get('judet');
  const companiesValue = currentParams.get('companies') || currentParams.get('companie');
  const remoteValue = currentParams.get('remote');

  if (searchValue?.trim()) {
    params.set('search', searchValue.trim());
  }

  if (citiesValue?.trim()) {
    params.set('cities', normalizeFilterValue(citiesValue));
  }

  if (countiesValue?.trim() && countiesValue !== 'all') {
    params.set('counties', normalizeFilterValue(countiesValue));
  }

  if (companiesValue?.trim() && companiesValue !== 'all') {
    params.set('companies', companiesValue.trim());
  }

  if (remoteValue?.trim()) {
    params.set('remote', remoteValue.trim());
  }

  return `${API_BASE_URL}/mobile/?${params.toString()}`;
}

function pickFirstValue(value?: string | null) {
  if (!value) {
    return '';
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .find(Boolean) || '';
}

function normalizeRemote(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalizedValue = value
    .split(',')
    .map((item) => item.trim())
    .find(Boolean);

  if (!normalizedValue) {
    return null;
  }

  const remoteLabelMap: Record<string, string> = {
    remote: 'La distanta',
    hybrid: 'Hibrid',
    'on-site': 'La birou',
    onsite: 'La birou',
  };

  return remoteLabelMap[normalizedValue.toLowerCase()] || normalizedValue;
}

function formatSalary(min: number | null, max: number | null, currency?: string | null) {
  const suffix = currency ? ` ${currency}` : '';

  if (typeof min === 'number' && typeof max === 'number') {
    return `${min.toLocaleString('ro-RO')} - ${max.toLocaleString('ro-RO')}${suffix}`;
  }

  if (typeof min === 'number') {
    return `De la ${min.toLocaleString('ro-RO')}${suffix}`;
  }

  if (typeof max === 'number') {
    return `Pana la ${max.toLocaleString('ro-RO')}${suffix}`;
  }

  return null;
}

function mapMobileJobToUiJob(job: MobileJob): Job {
  const localitate = pickFirstValue(job.city) || 'Nespecificat';
  const judet = pickFirstValue(job.county) || 'Nespecificat';

  return {
    id: String(job.id),
    titlu: job.job_title,
    companie: job.company_name?.trim() || 'Companie nespecificata',
    localitate,
    judet,
    salariuMin: typeof job.salary_min === 'number' ? job.salary_min : null,
    salariuMax: typeof job.salary_max === 'number' ? job.salary_max : null,
    salariuCurrency: job.salary_currency?.trim() || null,
    remote: normalizeRemote(job.remote),
    link: job.job_link,
    descriere: undefined,
    createdAt: job.date ? new Date(job.date).toISOString() : new Date().toISOString(),
  };
}

export { formatSalary };

export function useJobs() {
  const location = useLocation();
  const isPrivacyPolicyPage = location.pathname === '/politica-de-confidentialitate';
  const isTermsPage = location.pathname === '/conditii-de-utilizare';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsCount, setJobsCount] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [salaryFloor, setSalaryFloor] = useState<number | null>(null);
  const [salaryFloorCurrency, setSalaryFloorCurrency] = useState<string | null>(null);
  const [allCompanies, setAllCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMoreJobs, setLoadingMoreJobs] = useState(false);
  const [nextJobsPage, setNextJobsPage] = useState<string | null>(null);

  useEffect(() => {
    if (isPrivacyPolicyPage || isTermsPage) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadJobs() {
      try {
        setLoading(true);
        const jobsEndpoint = buildJobsEndpoint(location.pathname, location.search);

        const [jobsResponse, totalResponse] = await Promise.all([
          fetch(jobsEndpoint, {
            signal: controller.signal,
          }),
          fetch(TOTAL_JOBS_ENDPOINT, {
            signal: controller.signal,
          }),
        ]);

        if (!jobsResponse.ok) {
          throw new Error(`Failed to load jobs: ${jobsResponse.status}`);
        }

        if (!totalResponse.ok) {
          throw new Error(`Failed to load total jobs: ${totalResponse.status}`);
        }

        const jobsData: MobileJobResponse = await jobsResponse.json();
        const totalData: MobileTotalResponse = await totalResponse.json();

        setJobs(jobsData.results.map(mapMobileJobToUiJob));
        setJobsCount(jobsData.count);
        setNextJobsPage(jobsData.next ? normalizeApiUrl(jobsData.next) : null);
        setTotalJobs(totalData.total);
        setSalaryFloor(typeof totalData.salary_floor === 'number' ? totalData.salary_floor : null);
        setSalaryFloorCurrency(totalData.salary_floor_currency?.trim() || null);
        setAllCompanies(normalizeCompanies(totalData.companies));
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('Failed to fetch mobile jobs', error);
        setJobs([]);
        setJobsCount(0);
        setNextJobsPage(null);
        setTotalJobs(0);
        setSalaryFloor(null);
        setSalaryFloorCurrency(null);
        setAllCompanies([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => controller.abort();
  }, [isPrivacyPolicyPage, isTermsPage, location.pathname, location.search]);

  const deleteJob = (id: string) => {
    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
  };

  const loadMoreJobs = async () => {
    if (!nextJobsPage || loadingMoreJobs || location.pathname !== '/cautare') {
      return;
    }

    try {
      setLoadingMoreJobs(true);
      const response = await fetch(nextJobsPage);

      if (!response.ok) {
        throw new Error(`Failed to load more jobs: ${response.status}`);
      }

      const jobsData: MobileJobResponse = await response.json();

      setJobs((currentJobs) => [
        ...currentJobs,
        ...jobsData.results.map(mapMobileJobToUiJob),
      ]);
      setNextJobsPage(jobsData.next ? normalizeApiUrl(jobsData.next) : null);
    } catch (error) {
      console.error('Failed to fetch more mobile jobs', error);
    } finally {
      setLoadingMoreJobs(false);
    }
  };

  return {
    jobs,
    jobsCount,
    totalJobs,
    salaryFloor,
    salaryFloorCurrency,
    allCompanies,
    loading,
    loadingMoreJobs,
    hasMoreJobs: Boolean(nextJobsPage),
    loadMoreJobs,
    deleteJob,
  };
}
