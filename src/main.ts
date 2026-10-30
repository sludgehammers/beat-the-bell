import './style.css';

// The homepage stays independent of the future Phaser game and role pages.
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="home">
    <a class="brand" href="#home" aria-label="Beat the Bell home">
      <span class="brand-mark" aria-hidden="true">b.</span>
      <span>BEAT THE BELL LOGO PLACEHOLDER</span>
    </a>
    <nav aria-label="Main navigation">
      <a href="#home" aria-current="page">Home</a>
      <a href="#about">About the game <span aria-hidden="true">↗</span></a>
    </nav>
  </header>

  <main id="main">
    <section class="welcome" aria-labelledby="welcome-title">
      <!-- Reserved for a future mascot or pixel-art school illustration. -->
      <div class="game-artwork" aria-hidden="true"></div>
      <h1 id="welcome-title">Beat the Bell</h1>
      <p class="intro">Explore classrooms, answer questions and revise for your GCSEs.</p>
      <div class="role-selection">
        <div class="buttons">
          <button id="student-button" type="button">I'm a Student <span aria-hidden="true">↗</span></button>
          <button id="teacher-button" class="button-secondary" type="button">I'm a Teacher <span aria-hidden="true">↗</span></button>
        </div>
        <p id="message" role="status" aria-live="polite"></p>
      </div>
      <div class="quest-note" aria-hidden="true"></div>
    </section>

    <section class="about" id="about" aria-labelledby="about-title">
      <div><h2 id="about-title">About the game</h2></div>
      <div class="about-copy"><p>Beat the Bell is a browser-based revision game for students in Years 10 and 11, inspired by classic top-down RPGs.</p><p class="prototype-note">The game is currently being developed as a university prototype.</p></div>
    </section>
  </main>
  <footer><span>BEAT THE BELL</span><span class="prototype-label">University prototype</span></footer>
`;

const message = document.querySelector<HTMLParagraphElement>('#message')!;

document.querySelector('#student-button')?.addEventListener('click', () => {
  message.textContent = 'Student mode is in development.';
});

document.querySelector('#teacher-button')?.addEventListener('click', () => {
  message.textContent = 'Teacher mode is in development.';
});


