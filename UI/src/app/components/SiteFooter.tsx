import { Link } from 'react-router';

export const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.laurentiu1990.Peviitor_native_app';

export function SiteFooter() {
  return (
    <footer className="border-t border-teal-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 text-sky-950">
            <img src="/inviitor_logo.png" alt="Inviitor" className="h-14 w-auto object-contain" />
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-sky-900/70">
            Inviitor centralizează anunțuri de joburi din România și oferă o căutare rapidă, clară și ușor de folosit atât pe web, cât și pe mobil.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-sky-800/80 md:items-end">
          <div className="flex flex-wrap gap-4">
            <Link to="/#joburi-recomandate" className="transition-colors hover:text-teal-700">Joburi noi</Link>
            <Link to="/#orase-populare" className="transition-colors hover:text-teal-700">Orașe populare</Link>
            <Link to="/#intrebari-frecvente" className="transition-colors hover:text-teal-700">Întrebări frecvente</Link>
            <Link to="/politica-de-confidentialitate" className="transition-colors hover:text-teal-700">
              Politica de confidențialitate
            </Link>
            <Link to="/conditii-de-utilizare" className="transition-colors hover:text-teal-700">
              Condiții de utilizare
            </Link>
            <a href={ANDROID_APP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-700">
              Aplicația mobilă
            </a>
          </div>
          <p className="text-sky-800/60">
            © {new Date().getFullYear()}{' '}
            <a
              href="https://oportunitatisicariere.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-800 transition-colors hover:text-teal-700"
            >
              ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE
            </a>
            . Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
