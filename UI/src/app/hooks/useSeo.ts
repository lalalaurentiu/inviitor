import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { getSiteUrl } from '../config/site';
import { Job } from '../types/job';

interface SeoConfig {
  jobs: Job[];
  totalJobs: number;
}

function upsertMeta(attribute: 'name' | 'property', value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function upsertStructuredData(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  const scriptId = 'joblio-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

function buildSearchLabel(searchParams: URLSearchParams) {
  const labels = [
    searchParams.get('search') || searchParams.get('q'),
    searchParams.get('companies') || searchParams.get('companie'),
    searchParams.get('counties') || searchParams.get('judet'),
  ].filter(Boolean);

  return labels.join(', ');
}

export function useSeo({ jobs, totalJobs }: SeoConfig) {
  const location = useLocation();

  const seo = useMemo(() => {
    const origin = getSiteUrl();
    const canonicalUrl = `${origin}${location.pathname}${location.search}`;
    const imageUrl = `${origin}/joblio_logo.png`;
    const searchParams = new URLSearchParams(location.search);
    const searchLabel = buildSearchLabel(searchParams);
    const jobId = location.pathname.startsWith('/job/') ? location.pathname.replace('/job/', '') : '';
    const currentJob = jobId ? jobs.find((job) => job.id === jobId) : undefined;

    if (location.pathname === '/cautare') {
      const title = searchLabel
        ? `Joburi pentru ${searchLabel} | Joblio.ro`
        : 'Joburi disponibile in Romania | Joblio.ro';
      const description = searchLabel
        ? `Exploreaza joburi pentru ${searchLabel} si filtreaza rapid anunturile dupa companie, oras sau judet pe Joblio.ro.`
        : 'Vezi joburile disponibile in Romania si filtreaza anunturile dupa companie, oras, judet sau cuvinte cheie pe Joblio.ro.';

      return {
        title,
        description,
        canonicalUrl,
        imageUrl,
        type: 'website',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url: canonicalUrl,
          inLanguage: 'ro-RO',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Joblio.ro',
            url: origin,
          },
        },
      };
    }

    if (location.pathname.startsWith('/job/')) {
      const title = currentJob
        ? `${currentJob.titlu} la ${currentJob.companie} | Joblio.ro`
        : 'Detalii job | Joblio.ro';
      const description = currentJob
        ? `Vezi detaliile jobului ${currentJob.titlu} la ${currentJob.companie} in ${currentJob.localitate}, ${currentJob.judet}, pe Joblio.ro.`
        : 'Citeste detaliile complete ale unui job publicat pe Joblio.ro.';

      return {
        title,
        description,
        canonicalUrl,
        imageUrl,
        type: 'article',
        structuredData: currentJob
          ? {
              '@context': 'https://schema.org',
              '@type': 'JobPosting',
              title: currentJob.titlu,
              description: currentJob.descriere || `Detalii despre jobul ${currentJob.titlu} publicat de ${currentJob.companie}.`,
              datePosted: currentJob.createdAt,
              hiringOrganization: {
                '@type': 'Organization',
                name: currentJob.companie,
              },
              jobLocation: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: currentJob.localitate,
                  addressRegion: currentJob.judet,
                  addressCountry: 'RO',
                },
              },
              url: canonicalUrl,
            }
          : {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: title,
              description,
              url: canonicalUrl,
            },
      };
    }

    const title = 'Joblio.ro - Joburi actuale din Romania';
    const description = `Cauta joburi actuale din Romania, filtreaza dupa oras, judet sau companie si descopera peste ${totalJobs.toLocaleString('ro-RO')} oportunitati de cariera.`;

    return {
      title,
      description,
      canonicalUrl,
      imageUrl,
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'Joblio.ro',
            url: origin,
            inLanguage: 'ro-RO',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${origin}/cautare?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@type': 'Organization',
            name: 'Joblio.ro',
            url: origin,
            logo: imageUrl,
          },
        ],
      },
    };
  }, [jobs, location.pathname, location.search, totalJobs]);

  useEffect(() => {
    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', 'index,follow');
    upsertMeta('property', 'og:type', seo.type);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', seo.canonicalUrl);
    upsertMeta('property', 'og:locale', 'ro_RO');
    upsertMeta('property', 'og:image', seo.imageUrl);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', seo.imageUrl);
    upsertCanonical(seo.canonicalUrl);
    upsertStructuredData(seo.structuredData);
  }, [seo]);
}
