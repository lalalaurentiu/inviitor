const DEFAULT_SITE_URL = 'https://inviitor.ro';
const DEFAULT_API_URL = 'https://api.laurentiumarian.ro';

function trimTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

export function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return trimTrailingSlash(window.location.origin);
  }

  return DEFAULT_SITE_URL;
}

export function getApiUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  return DEFAULT_API_URL;
}
