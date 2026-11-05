import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;
let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
try {
  const savedTheme = localStorage.getItem('beat-the-bell-theme');
  if (savedTheme) darkMode = savedTheme === 'dark';
} catch { /* The toggle still works when browser storage is unavailable. */ }

function applyTheme() {
  document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  const toggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
  if (toggle) {
    toggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" /></svg>';
    toggle.setAttribute('aria-pressed', String(darkMode));
  }
}

function render() {
  const route = window.location.hash;
  const role = route === '#teacher' ? 'Teacher' : route === '#student' ? 'Student' : null;
  document.title = `${role ? `${role} mode` : 'GCSE revision through play'} | Beat the Bell`;
  app.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Beat the Bell home">
        <span class="brand-mark" aria-hidden="true">b.</span>
        <span>BEAT THE BELL LOGO PLACEHOLDER</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#home" ${!role ? 'aria-current="page"' : ''}>Home</a>
        <a href="#about">About the game</a>
        <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Dark mode" aria-pressed="false"></button>
      </nav>
    </header>
    <main id="main" tabindex="-1">
      ${role ? `
        <section class="mode-page" aria-labelledby="mode-title">
          <a class="back-link" href="#home">Back to home</a>
          <p class="eyebrow">Your revision hub</p>
          <h1 id="mode-title">${role} mode</h1>
          <p class="intro">${role === 'Student' ? 'Your next revision adventure starts here.' : 'A space to help your students learn and grow.'}</p>
          <p class="coming-soon">Coming soon</p>
          <div class="feature-grid">
            ${(role === 'Student' ? [
              ['Explore the school', 'Visit classrooms and take on GCSE revision challenges.'],
              ['Practise your subjects', 'Build your confidence, one question at a time.'],
              ['Track your progress', 'See what you have learned and what to try next.'],
            ] : [
              ['Manage your classes', 'Keep your classes together in one place.'],
              ['Set revision activities', 'Help students practise the topics that matter.'],
              ['View student progress', 'See how your students are getting on.'],
            ]).map(([title, description]) => `<article class="feature-card"><h2>${title}</h2><p>${description}</p><span class="feature-status">In development</span></article>`).join('')}
          </div>
          <p class="mode-note">This is a preview of ${role.toLowerCase()} mode. These features are still being built.</p>
          <a class="mode-switch" href="#${role === 'Student' ? 'teacher' : 'student'}">Switch to ${role === 'Student' ? 'teacher' : 'student'} mode</a>
        </section>
      ` : `
        <section class="welcome" aria-labelledby="welcome-title">
          <div class="game-artwork" aria-hidden="true"></div>
          <h1 id="welcome-title">Beat the Bell</h1>
          <p class="intro">Explore classrooms, answer questions and revise for your GCSEs.</p>
          <div class="buttons">
            <a class="button" href="#student">I'm a Student</a>
            <a class="button button-secondary" href="#teacher">I'm a Teacher</a>
          </div>
          <div class="quest-note" aria-hidden="true"></div>
        </section>
        <section class="about" id="about" aria-labelledby="about-title">
          <div><h2 id="about-title">About the game</h2></div>
          <div class="about-copy"><p>Beat the Bell is a browser-based revision game for students in Years 10 and 11, inspired by classic top-down RPGs.</p><p class="prototype-note">The game is currently being developed as a university prototype.</p></div>
        </section>
      `}
    </main>
    <footer><span>BEAT THE BELL</span></footer>
  `;
  applyTheme();
  document.querySelector('#theme-toggle')?.addEventListener('click', () => {
    darkMode = !darkMode;
    applyTheme();
    try { localStorage.setItem('beat-the-bell-theme', darkMode ? 'dark' : 'light'); } catch { /* Storage is optional. */ }
  });
}

window.addEventListener('hashchange', () => {
  render();
  if (window.location.hash === '#about') document.querySelector('#about')?.scrollIntoView();
  else {
    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
  }
});
render();

