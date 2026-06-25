import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { SiteFooter } from './SiteFooter';

const sections = [
  {
    title: 'Termeni generali',
    content: [
      'Site-ul www.inviitor.ro este operat de ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE. Accesarea și utilizarea acestui site presupun acordul dumneavoastră tacit cu privire la termenii și condițiile de utilizare prezentate pe această pagină.',
      'www.inviitor.ro poate schimba conținutul site-ului în orice moment, fără acord prealabil și fără notificare individuală.',
      'Continuarea utilizării site-ului presupune acceptarea regulilor aplicabile și a tuturor actualizărilor ulterioare ale acestui document.',
      'ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE poate schimba, suspenda sau întrerupe temporar ori definitiv funcționarea site-ului și poate limita accesul la anumite secțiuni fără notificare și fără răspundere.',
    ],
  },
  {
    title: '1. Conținutul',
    content: [
      'Conținutul site-ului este destinat uzului personal, fără scop comercial, și este protejat de legislația privind drepturile de autor, mărcile și alte drepturi de proprietate intelectuală.',
      'Site-ul și conținutul său nu pot fi copiate, stocate, modificate sau transferate fără acordul scris al operatorului, cu excepția utilizării în scop personal și necomercial.',
      'Copierea, stocarea, modificarea și/sau transmiterea conținutului sunt interzise fără acord scris prealabil.',
      'Asociația nu răspunde pentru prejudicii sau litigii izvorâte din copierea, stocarea, modificarea ori transferul neautorizat al conținutului.',
      'Sesizările privind încălcarea drepturilor pot fi transmise la adresa aocpeviitor@gmail.com.',
      'Asociația își rezervă dreptul de a-și apăra drepturile de proprietate intelectuală inclusiv pe cale judiciară.',
    ],
  },
  {
    title: '2. Drepturile de autor',
    content: [
      'Toate drepturile sunt rezervate. ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE acordă permisiunea de a utiliza site-ul www.inviitor.ro exclusiv în condițiile descrise în această pagină.',
      'Este interzisă copierea, modificarea, reproducerea, publicarea, licențierea, vânzarea sau exploatarea conținutului site-ului www.inviitor.ro, cu excepția afișării ori descărcării în scop personal și necomercial, cu păstrarea tuturor mențiunilor de proprietate.',
      'Este interzisă utilizarea site-ului pentru publicarea sau transmiterea de materiale amenințătoare, false, înșelătoare, abuzive, defăimătoare ori ilegale.',
      'Este interzis framing-ul sau integrarea site-ului în alte pagini fără acord scris prealabil.',
      'Este interzisă folosirea site-ului www.inviitor.ro în scop publicitar sau comercial fără acordul scris al operatorului.',
      'Preluarea de informații de către alte site-uri se poate face doar în condițiile expres agreate de operator.',
      'Logo-ul www.inviitor.ro și elementele sale distinctive sunt proprietatea asociației și nu pot fi utilizate fără acord scris.',
    ],
  },
  {
    title: '3. Răspunderi',
    content: [
      'Prin utilizarea site-ului www.inviitor.ro, utilizatorul este singurul responsabil pentru accesarea, utilizarea și exploatarea informațiilor disponibile.',
      'Asociația nu răspunde pentru daune directe sau indirecte, viruși ori alte prejudicii rezultate din accesarea, utilizarea ori descărcarea de materiale de pe acest site.',
      'Utilizarea site-ului implică acceptarea faptului că anumite informații sunt publicate pe baza unor criterii editoriale proprii, fără ca răspunderea asociației să poată fi reținută pentru deciziile utilizatorului.',
    ],
  },
  {
    title: '4. Transmiterea de informații către asociație',
    content: [
      'Transmiterea de informații către ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE și către www.inviitor.ro poate include mesaje, articole, informații, fotografii sau alte date.',
      'Prin transmiterea acestor informații, acceptați că ele pot fi utilizate, copiate, publicate sau distribuite de operator fără obligația de plată ori remunerație, în limitele legii.',
      'Utilizatorul acceptă să despăgubească asociația și/sau terții pentru prejudicii rezultate din utilizarea, copierea, publicarea sau distribuirea informațiilor transmise de acesta.',
    ],
  },
  {
    title: '5. Obligațiile utilizatorilor la înregistrare',
    content: [
      'Accesul la conținutul online al site-ului www.inviitor.ro este liber, în măsura în care anumite servicii nu prevăd condiții suplimentare afișate separat.',
    ],
  },
  {
    title: '6. Răspundere. Despăgubiri',
    content: [
      'Conținutul este furnizat gratuit. Site-ul oferă instrumente de informare și nu reprezintă sfaturi, recomandări sau garanții privind locuri de muncă, angajatori ori alte produse sau servicii.',
      'ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE nu solicită informații personale prin corespondență nesolicitată. Orice astfel de solicitare trebuie considerată falsă și raportată la aocpeviitor@gmail.com.',
      'Asociația și furnizorii de conținut nu răspund pentru erori, imprecizii, întârzieri sau acțiuni bazate pe conținutul disponibil și nu garantează acuratețea informațiilor furnizate de terți.',
      'În caz de forță majoră sau caz fortuit, inclusiv probleme tehnice, întreruperi internet, viruși, acces neautorizat ori erori de operare, asociația și reprezentanții săi sunt exonerați de răspundere în limitele legii.',
      'Fiecare utilizator al site-ului www.inviitor.ro este de acord să exonereze de răspundere asociația și să suporte costurile rezultate din încălcarea acestor termeni.',
      'Asociația își rezervă dreptul de a modifica și actualiza aceste condiții, iar modificările devin efective de la data publicării pe site.',
    ],
  },
  {
    title: '7. Actualizare',
    content: [
      'Acești termeni și condiții se actualizează ori de câte ori este nevoie. Vă recomandăm să citiți periodic această pagină pentru a fi la curent cu ultima versiune aplicabilă.',
    ],
  },
  {
    title: '8. Legislație aplicabilă',
    content: [
      'Acordului privind utilizarea site-ului și tuturor disputelor legate de acesta li se aplică legea română. Orice litigiu va fi soluționat de instanțele competente din România.',
    ],
  },
];

export function TermsOfUse() {
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
            <FileText className="mr-2 h-4 w-4" />
            Pagina legală Inviitor
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-sky-950 md:text-5xl">
            Condiții de utilizare
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-sky-900/70 md:text-lg">
            Prin utilizarea acestui site, <strong>www.inviitor.ro</strong>, sunteți de acord cu termenii și condițiile de utilizare menționate în această pagină. Dacă nu sunteți de acord cu aceste condiții, vă rugăm să nu utilizați platforma.
          </p>

          <Card className="mt-8 rounded-[1.75rem] border-teal-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(236,254,255,0.94))] p-6 shadow-sm shadow-teal-100/80">
            <p className="text-sm leading-7 text-sky-900/75">
              Prin continuarea utilizării serviciilor oferite de <strong>www.inviitor.ro</strong>, confirmați că acceptați fără rezerve termenii și condițiile descrise în acest document. Acești termeni produc efecte între dumneavoastră și ASOCIAȚIA OPORTUNITĂȚI ȘI CARIERE.
            </p>
          </Card>
        </section>

        <section className="mt-8 grid gap-5">
          {sections.map((section) => (
            <Card key={section.title} className="rounded-[1.75rem] border-white/70 bg-white/85 p-6 shadow-sm shadow-cyan-100/60">
              <h2 className="text-2xl font-semibold tracking-tight text-sky-950">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-sky-900/75 md:text-base">
                {section.content.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </Card>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
