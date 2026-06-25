import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { SiteFooter } from './SiteFooter';

const sections = [
  {
    title: '1. Cine suntem?',
    content: [
      'Calitatea de operator de date cu caracter personal o are ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE, cu sediul social în comuna Zimbor, sat Zimbor, str. Optatiana, nr. 82, județul Sălaj.',
    ],
  },
  {
    title: '2. Ce fel de date prelucrăm?',
    content: [
      'Analizăm informațiile folosite pentru căutare, dar nu prelucrăm date personale prin funcționalitatea de bază a motorului de căutare.',
      'Platforma folosește Cloudflare, o rețea de tip CDN, pentru livrarea conținutului și blocarea traficului abuziv sau automatizat.',
      'Când vizitați site-ul, se pot colecta automat informații tehnice despre dispozitivul dumneavoastră, precum browserul folosit, adresa IP, fusul orar și anumite cookie-uri instalate pe dispozitiv.',
      'Nu colectăm și nu prelucrăm date sensibile, definite ca atare de Regulamentul (UE) 679/2016 (GDPR).',
    ],
  },
  {
    title: '3. Scopurile prelucrării datelor',
    content: [
      'funcționarea corectă a site-ului și a serviciilor asociate;',
      'oferirea de răspunsuri la reclamațiile sau solicitările transmise;',
      'evaluarea serviciilor oferite pe site;',
      'monitorizarea utilizării platformei în scop administrativ, statistic sau media, în măsura în care vă exprimați consimțământul;',
      'comunicarea unor oferte de servicii, dacă vă exprimați consimțământul în acest sens.',
    ],
    list: true,
  },
  {
    title: '4. Temeiurile prelucrării',
    content: [
      'Prelucrăm datele pentru a face posibilă funcționarea site-ului și accesul la serviciile oferite.',
      'Putem prelucra date pentru a răspunde reclamațiilor sau solicitărilor dumneavoastră, dacă este cazul.',
      'Pentru activități care necesită acord explicit, prelucrarea are loc doar dacă v-ați exprimat consimțământul.',
    ],
  },
  {
    title: '5. Durata de stocare și prelucrare a datelor',
    content: [
      'Datele se prelucrează pe durata necesară îndeplinirii scopurilor pentru care au fost colectate și pe perioada impusă de reglementările legale aplicabile.',
    ],
  },
  {
    title: '6. Măsuri de securitate a datelor',
    content: [
      'Asociația aplică măsuri tehnice și organizatorice adecvate pentru a asigura protecția datelor cu caracter personal împotriva accesului neautorizat, utilizării neautorizate, pierderii, distrugerii sau alterării.',
      'Platforma este aliniată la cerințele GDPR și utilizează măsuri de securizare a datelor la standarde moderne.',
    ],
  },
  {
    title: '7. Drepturile dumneavoastră',
    content: [
      'Dreptul la informare.',
      'Dreptul la rectificare.',
      'Dreptul la ștergerea datelor.',
      'Dreptul la restricționarea prelucrării.',
      'Dreptul de opoziție.',
      'Dreptul la portabilitatea datelor.',
      'Dreptul de a depune plângere la ANSPDCP.',
      'Dreptul de retragere a consimțământului.',
      'Dreptul de a nu fi supus unei decizii individuale automate, inclusiv profilării.',
    ],
    list: true,
    footer: 'Pentru exercitarea acestor drepturi, ne puteți contacta la adresa aocpeviitor@gmail.com.',
  },
  {
    title: '8. Date de contact responsabil protecția datelor',
    content: [
      'Persoană de contact: Boga Sebastian',
      'Email: aocpeviitor@gmail.com',
    ],
  },
  {
    title: '9. Date ale minorilor',
    content: [
      'Nu dorim să colectăm sau să prelucrăm date ale minorilor care nu au împlinit vârsta de 18 ani.',
      'Asociația poate actualiza această Politică de confidențialitate fără notificare prealabilă, prin publicarea versiunii revizuite pe site. Vă recomandăm să verificați periodic această pagină.',
    ],
  },
];

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

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
            <img src="/inviitor_logo.png" alt="Inviitor" className="h-20 w-auto object-contain" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-teal-800 transition-colors hover:text-teal-700">
            <ArrowLeft className="h-4 w-4" />
            Înapoi la homepage
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-cyan-200/40 backdrop-blur-xl md:p-10">
          <Badge className="border border-teal-200 bg-white/85 text-teal-800 shadow-sm shadow-teal-100">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Pagina legală Inviitor
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-sky-950 md:text-5xl">
            Politica de confidențialitate
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-sky-900/70 md:text-lg">
            Vă mulțumim pentru interesul acordat ASOCIAȚIEI OPORTUNITĂȚI ȘI CARIERE. Protecția datelor cu caracter personal este importantă pentru noi, iar această pagină explică modul în care sunt tratate informațiile în legătură cu platforma <strong>www.inviitor.ro</strong>.
          </p>

          <Card className="mt-8 rounded-[1.75rem] border-teal-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(236,254,255,0.94))] p-6 shadow-sm shadow-teal-100/80">
            <p className="text-sm leading-7 text-sky-900/75">
              ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE, cu sediul social în comuna Zimbor, sat Zimbor, str. Optatiana, nr. 82, județul Sălaj, în calitate de operator de date cu caracter personal, respectă prevederile Regulamentului (UE) 679/2016 și ale legislației române aplicabile. Toate informațiile din această pagină se aplică activității desfășurate prin platforma <strong>www.inviitor.ro</strong>. Ne rezervăm dreptul de a actualiza periodic această politică, iar versiunea publicată pe site este cea aplicabilă la momentul accesării.
            </p>
            <p className="mt-4 text-sm leading-7 text-sky-900/75">
              Pentru întrebări suplimentare, ne puteți scrie la{' '}
              <a href="mailto:aocpeviitor@gmail.com" className="font-medium text-teal-800 hover:text-teal-700">
                aocpeviitor@gmail.com
              </a>
              .
            </p>
          </Card>
        </section>

        <section className="mt-8 grid gap-5">
          {sections.map((section) => (
            <Card key={section.title} className="rounded-[1.75rem] border-white/70 bg-white/85 p-6 shadow-sm shadow-cyan-100/60">
              <h2 className="text-2xl font-semibold tracking-tight text-sky-950">{section.title}</h2>

              {section.list ? (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-sky-900/75 md:text-base">
                  {section.content.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 space-y-4 text-sm leading-7 text-sky-900/75 md:text-base">
                  {section.content.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              )}

              {section.footer ? <p className="mt-4 text-sm leading-7 text-sky-900/75 md:text-base">{section.footer}</p> : null}
            </Card>
          ))}
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-sky-100 bg-white/90 p-6 shadow-sm shadow-sky-100/60">
          <h2 className="text-2xl font-semibold tracking-tight text-sky-950">Autoritate de supraveghere</h2>
          <p className="mt-4 text-sm leading-7 text-sky-900/75 md:text-base">
            Dacă apreciați că drepturile dumneavoastră au fost încălcate, puteți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal.
          </p>
          <a
            href="http://www.dataprotection.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal-800 transition-colors hover:text-teal-700"
          >
            www.dataprotection.ro
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
