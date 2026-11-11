import './style.css';
import { renderAboutPage } from './about';
import { renderStudentPage, renderTeacherPage, bindStudentPreview } from './modes';

const app = document.querySelector<HTMLDivElement>('#app')!;
const headerObserver = new ResizeObserver(([entry]) => {
  if (entry) document.documentElement.style.setProperty('--header-height', `${entry.target.getBoundingClientRect().height}px`);
});
let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let themeTransitionTimer: ReturnType<typeof setTimeout> | undefined;
try {
  const savedTheme = localStorage.getItem('beat-the-bell-theme');
  if (savedTheme) darkMode = savedTheme === 'dark';
} catch { /* The toggle still works when browser storage is unavailable. */ }

function applyTheme() {
  document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (toggle) {
    toggle.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${darkMode ? '<path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />' : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>'}</svg>`;
    toggle.setAttribute('aria-label', 'Night theme');
    toggle.title = darkMode ? 'Night — switch to Morning' : 'Morning — switch to Night';
    toggle.setAttribute('aria-pressed', String(darkMode));
  }
}

function render() {
  const route = window.location.hash;
  const role = route === '#teacher' ? 'Teacher' : route === '#student' ? 'Student' : null;
  const isAbout = route === '#about';
  document.title = `${isAbout ? 'About the Game' : role ? `${role} mode` : 'GCSE revision through play'} | Beat the Bell`;
  const forestScene = `
    <div class="forest-scene" aria-hidden="true">
      <div class="night-sky"></div>
      <div class="scene-stars"></div>
      <div class="scene-sun"></div>
      <div class="scene-moon"></div>
      <svg class="forest-layer forest-distant" viewBox="0 0 1200 220" preserveAspectRatio="none">
        <defs><path id="forest-tree" d="M0 200h100l-22-30h14l-24-36h13L50 82l-31 52h13l-24 36h14zM46 200h8v20h-8z"/></defs>
        ${Array.from({ length: 6 }, (_, index) => {
          const position = index * 55 - 50;
          const height = [-24, 4, -12, 16][index % 4];
          return `<use href="#forest-tree" x="${position}" y="${height}"/><use href="#forest-tree" x="${1100 - position}" y="${height}"/>`;
        }).join('')}
      </svg>
      <svg class="forest-layer forest-near" viewBox="0 0 1200 220" preserveAspectRatio="none">
        ${Array.from({ length: 4 }, (_, index) => {
          const position = index * 65 - 45;
          const height = [-12, 20, 4][index % 3];
          return `<use href="#forest-tree" x="${position}" y="${height}"/><use href="#forest-tree" x="${1100 - position}" y="${height}"/>`;
        }).join('')}
      </svg>
      <div class="scene-fireflies">
        ${Array.from({ length: 14 }, (_, index) => `<span class="firefly" style="--fly-left: ${5 + index * 7}%; --fly-bottom: ${12 + (index * 13) % 34}%; --fly-delay: -${index * .7}s; --fly-duration: ${5 + index % 4}s"></span>`).join('')}
      </div>
      <div class="scene-perch">
        <svg class="scene-branch" viewBox="0 0 200 100"><path fill="currentColor" d="M200 86h-36l-30-20H46v-6h90l32 18h32zM150 72l-12-24h-22v-5h27l16 29zM84 62 70 48H54v-4h20l20 18z"/></svg>
        <svg class="scene-owl" viewBox="0 0 40 48" shape-rendering="crispEdges">
          <path fill="#9b8eaa" d="M10 8V2l8 6h4l8-6v6l4 8v22l-6 6H12l-6-6V16z"/>
          <path class="owl-wing owl-wing-left" fill="#746980" d="M6 18h6v22H6l-4-8z"/>
          <path class="owl-wing owl-wing-right" fill="#746980" d="M28 18h6l4 14-4 8h-6z"/>
          <path fill="#c1b5be" d="M12 16h16v18H12z"/>
          <path fill="#dfd5b4" d="M10 14h8v8h-8zm12 0h8v8h-8z"/>
          <path fill="#342c40" d="M14 16h2v4h-2zm10 0h2v4h-2z"/>
          <path fill="#b9a37e" d="m18 24 2 4 2-4zM12 44h6v4h-6zm10 0h6v4h-6z"/>
        </svg>
      </div>
    </div>
  `;
  app.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Beat the Bell home">
        <span class="brand-mark" aria-hidden="true">b.</span>
        <span>BEAT THE BELL LOGO PLACEHOLDER</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#home" ${!role && !isAbout ? 'aria-current="page"' : ''}>Home</a>
        <a href="#about" ${isAbout ? 'aria-current="page"' : ''}>About the game</a>
        <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Dark mode" aria-pressed="false"></button>
      </nav>
    </header>
    <main id="main" tabindex="-1">
      ${isAbout ? renderAboutPage() : role ? (role === 'Student' ? renderStudentPage() : renderTeacherPage()) : `
        <section class="welcome" aria-labelledby="welcome-title">
          ${forestScene}
          <h1 id="welcome-title">Beat the Bell</h1>
          <p class="intro">Explore classrooms, answer questions and revise for your GCSEs.</p>
          <div class="buttons">
            <a class="button" href="#student">I'm a Student</a>
            <a class="button button-secondary" href="#teacher">I'm a Teacher</a>
          </div>
          <div class="game-artwork" aria-hidden="true"></div>
        </section>
        <section class="about" id="about-preview" aria-labelledby="about-title">
          <div><h2 id="about-title">About the game</h2></div>
          <div class="about-copy"><p>Beat the Bell is a browser-based revision game for students in Years 10 and 11, inspired by classic top-down RPGs.</p><p class="prototype-note">The game is currently being developed as a university prototype.</p><a class="learn-more" href="#about">Learn More<span aria-hidden="true"> &rarr;</span></a></div>
        </section>
      `}
    </main>
    <footer><span>BEAT THE BELL</span></footer>
  `;
  headerObserver.disconnect();
  const header = document.querySelector<HTMLElement>('.site-header');
  if (header) {
    document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
    headerObserver.observe(header);
  }
  applyTheme();
  if (role === 'Student') bindStudentPreview();
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    darkMode = !darkMode;
    clearTimeout(themeTransitionTimer);
    document.documentElement.dataset.themeTransition = darkMode ? 'night' : 'morning';
    themeTransitionTimer = setTimeout(() => {
      delete document.documentElement.dataset.themeTransition;
    }, 1400);
    applyTheme();
    try { localStorage.setItem('beat-the-bell-theme', darkMode ? 'dark' : 'light'); } catch { /* Storage is optional. */ }
  });
}

window.addEventListener('hashchange', () => {
  // The skip link targets the current page without replacing its content.
  if (window.location.hash === '#main') {
    (document.querySelector<HTMLElement>('#about-page-title') ?? document.querySelector<HTMLElement>('#main'))?.focus();
    return;
  }
  render();
  window.scrollTo(0, 0);
  (document.querySelector<HTMLElement>('#about-page-title') ?? document.querySelector<HTMLElement>('#main'))?.focus({ preventScroll: true });
});
render();
