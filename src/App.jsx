import { useEffect, useMemo, useState } from 'react';
import content from './content.js';
import { useLenis } from './hooks/useLenis.js';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useTheme } from './hooks/useTheme.js';
import GrainOverlay from './components/GrainOverlay.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import HeroVisual from './components/HeroVisual.jsx';
import Magnetic from './components/Magnetic.jsx';
import SplitHeading from './components/SplitHeading.jsx';
import BentoCard from './components/BentoCard.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import SkillsMarquee from './components/SkillsMarquee.jsx';
import { GitHubIcon, SunIcon, MoonIcon, ArrowIcon } from './components/icons.jsx';

const { site, about, experience, projects, skills, nav } = content;

function Header() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? 'glass border-b border-slate-200/50 dark:border-white/5' : ''
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#top" className="group flex items-center gap-2 font-semibold text-slate-900 dark:text-white" data-cursor-grow>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 font-mono text-sm text-white shadow">
            HI
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="chip hidden md:inline-flex">{site.badge}</span>
        </a>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                  data-cursor-grow
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <CommandPalette />
          <button
            type="button"
            onClick={toggle}
            className="ml-1 grid h-10 w-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            data-cursor-grow
          >
            {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="glass border-t border-slate-200/50 md:hidden dark:border-white/5">
          <ul className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-slate-700 dark:text-slate-200">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="blob pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/25" aria-hidden="true" />
      <div className="blob pointer-events-none absolute right-0 top-40 h-60 w-60 rounded-full bg-accent-500/15" style={{ animationDelay: '-6s' }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-16 h-[420px] opacity-50 lg:pointer-events-auto lg:inset-x-auto lg:right-[max(0px,calc((100vw-72rem)/2))] lg:top-20 lg:h-[580px] lg:w-[50%] lg:opacity-100">
        <HeroVisual />
      </div>
      <div className="container-x pointer-events-none relative pb-20 sm:pb-28 [&_a]:pointer-events-auto [&_dl]:pointer-events-auto [&_button]:pointer-events-auto">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 backdrop-blur dark:text-brand-300" data-reveal>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {site.status}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:max-w-[58%]">
          <SplitHeading text={site.headline[0]} className="block" as="span" />
          {' '}
          <span className="bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 bg-clip-text text-transparent">
            <SplitHeading text={site.headline[1]} delay={0.15} />
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 lg:max-w-[52%]" data-reveal>
          {site.intro}
        </p>
        <div className="mt-10 flex flex-wrap gap-3" data-reveal>
          <Magnetic as="a" href="#projects" className="btn-primary" strength={0.2} data-cursor-grow>
            {site.primaryCta}
          </Magnetic>
          <Magnetic as="a" href={site.github} className="btn-ghost glass" strength={0.2} target="_blank" rel="noreferrer" data-cursor-grow>
            <GitHubIcon className="h-4 w-4" /> GitHub
          </Magnetic>
          <Magnetic as="a" href={site.other.url} className="btn-ghost glass" strength={0.2} data-cursor-grow>
            {site.other.label} <ArrowIcon className="h-4 w-4" />
          </Magnetic>
        </div>
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-[56%]" data-reveal>
          {site.facts.map((f) => (
            <div key={f.label} className="glass rounded-2xl p-4">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{f.label}</dt>
              <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section border-t border-slate-200/70 dark:border-white/5">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal>
          <p className="eyebrow">About</p>
          <h2 className="h2">{about.title}</h2>
        </div>
        <div data-reveal className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <ul className="grid gap-3 pt-2 sm:grid-cols-2">
            {about.points.map((p) => (
              <li key={p} className="flex gap-3 text-base">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section bg-slate-50/50 dark:bg-white/[0.02]">
      <div className="container-x">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">Experience</p>
          <h2 className="h2">Where I've worked</h2>
        </div>
        <ol className="relative mt-14 space-y-10 border-l border-slate-200 pl-8 dark:border-white/10">
          {experience.map((job) => (
            <li key={job.company + job.period} data-reveal className="relative">
              <span className="absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border-4 border-white bg-brand-500 dark:border-[#0b1020]" aria-hidden="true" />
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {job.role} <span className="text-brand-600 dark:text-brand-400">· {job.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{job.period}</p>
                </div>
                {job.summary && <p className="mt-3 text-slate-600 dark:text-slate-300">{job.summary}</p>}
                <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 flex-none rounded bg-brand-400" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Projects() {
  const cats = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const [cat, setCat] = useState('All');
  const [modalProject, setModalProject] = useState(null);
  const shown = cat === 'All' ? projects : projects.filter((p) => p.category === cat);

  useEffect(() => {
    const onOpen = (e) => {
      const title = e.detail;
      const p = projects.find((x) => x.title === title);
      if (p) setModalProject(p);
    };
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{content.projectsEyebrow}</p>
            <h2 className="h2">{content.projectsTitle}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{content.projectsNote}</p>
          </div>
        </div>
        <div data-reveal className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {cats.map((c) => (
            <Magnetic key={c} as="button" type="button" strength={0.25} onClick={() => setCat(c)} aria-pressed={cat === c} data-cursor-grow className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? 'bg-brand-600 text-white shadow shadow-brand-600/30' : 'glass text-slate-600 dark:text-slate-300'}`}>
              {c}
            </Magnetic>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} projects
        </p>
        <div className="bento-grid mt-10">
          {shown.map((p, i) => (
            <BentoCard key={p.title} p={p} index={i} onOpen={setModalProject} />
          ))}
        </div>
      </div>
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section overflow-hidden bg-slate-50/50 dark:bg-white/[0.02]">
      <div className="container-x">
        <div data-reveal className="max-w-2xl">
          <p className="eyebrow">Skills</p>
          <h2 className="h2">Tools I work with</h2>
        </div>
        <SkillsMarquee />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} data-reveal className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-lg border border-slate-200/80 bg-white/50 px-3 py-1.5 text-sm text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div data-reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 p-10 text-white shadow-2xl sm:p-14">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{content.contact.title}</h2>
            <p className="mt-4 text-lg text-white/90">{content.contact.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic as="a" href={site.github} target="_blank" rel="noreferrer" className="btn bg-white text-brand-700 hover:bg-white/90" strength={0.2} data-cursor-grow>
                <GitHubIcon className="h-4 w-4" /> github.com/hammadiqbal6
              </Magnetic>
              <Magnetic as="a" href={site.other.url} className="btn border border-white/40 text-white hover:bg-white/10" strength={0.2} data-cursor-grow>
                {site.other.label} <ArrowIcon className="h-4 w-4" />
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useLenis(true);
  useScrollReveal();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <GrainOverlay />
      <CustomCursor />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-slate-200/70 py-10 text-sm text-slate-500 dark:border-white/5 dark:text-slate-400">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {site.name}. Built with React, Vite and Tailwind CSS.</p>
          <p>Case studies describe client and company work without private code or client names.</p>
        </div>
      </footer>
    </>
  );
}
