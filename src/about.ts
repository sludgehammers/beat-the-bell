/** Dedicated hash-route content; shared header, theme and footer live in main.ts. */
export function renderAboutPage(): string {
  const steps = [
    ['01', 'Explore', 'Explore a virtual school and enter different subject classrooms.'],
    ['02', 'Revise', 'Answer GCSE multiple-choice questions to test your knowledge.'],
    ['03', 'Progress', 'Earn points, review quiz results and identify topics to improve.'],
  ];
  const subjects = [
    ['Mathematics', 'Practise number skills, algebra, geometry and problem solving.'],
    ['English', 'Build confidence in language, reading and literary analysis.'],
    ['Science', 'Review key ideas across biology, chemistry and physics.'],
    ['History', 'Revisit historical events, evidence and explanations.'],
  ];
  return `
    <article class="about-page" aria-labelledby="about-page-title">
      <a class="back-link" href="#home">Back to home</a>
      <header class="about-page-intro">
        <p class="eyebrow">Revision through exploration</p>
        <h1 id="about-page-title" tabindex="-1">About Beat the Bell</h1>
        <p>Beat the Bell is a browser-based GCSE revision RPG for students in Years 10 and 11. It combines traditional GCSE revision with exploration and interactive challenges inspired by classic top-down RPGs.</p>
      </header>

      <section class="about-page-section about-how" aria-labelledby="how-title">
        <h2 id="how-title">How It Works</h2>
        <p class="section-summary">The planned revision loop takes students from exploring to practising and reflecting. These features are still in development.</p>
        <div class="about-steps">
          ${steps.map(([number, title, description]) => `
            <article class="about-editorial">
              <span class="step-number" aria-hidden="true">${number}</span>
              <h3>${title}</h3><p>${description}</p>
            </article>`).join('')}
        </div>
      </section>

      <section class="about-page-section" aria-labelledby="subjects-title">
        <h2 id="subjects-title">GCSE Subjects</h2>
        <p class="section-summary">Subject content is being developed. No playable subjects are currently available through this website.</p>
        <div class="subject-directory">
          ${subjects.map(([title, description]) => `
            <article class="subject-entry">
              <span class="subject-status">Planned</span>
              <h3>${title}</h3><p>${description}</p>
            </article>`).join('')}
        </div>
      </section>

      <section class="about-page-section" aria-labelledby="modes-title">
        <h2 id="modes-title">For Students and Teachers</h2>
        <div class="about-audiences">
          <article class="about-editorial">
            <h3>Students</h3>
            <p>Student mode is being built around school exploration, revision quizzes and earning points. Character customisation is also planned.</p>
            <a class="mode-switch" href="#student">View Student mode preview</a>
          </article>
          <article class="about-editorial">
            <h3>Teachers</h3>
            <p>Teacher mode is planned to support class management, performance statistics and identifying topics students struggle with.</p>
            <a class="mode-switch" href="#teacher">View Teacher mode preview</a>
          </article>
        </div>
      </section>

      <section class="about-page-section project-summary" aria-labelledby="project-title">
        <h2 id="project-title">About the Project</h2>
        <p>Beat the Bell is being developed by a group of university computing students as an educational game prototype. Additional functionality and subjects are currently being developed.</p>
      </section>

      <section class="about-page-section" aria-labelledby="screenshots-title">
        <h2 id="screenshots-title">Gameplay Screenshots</h2>
        <p class="section-summary">Real screenshots from the Phaser game will be added here when available.</p>
        <div class="about-pair">
          <figure class="gameplay-preview">
            <div class="screenshot-placeholder"><span aria-hidden="true">01</span>Screenshot placeholder</div>
            <figcaption>School exploration &mdash; image coming later</figcaption>
          </figure>
          <figure class="gameplay-preview">
            <div class="screenshot-placeholder"><span aria-hidden="true">02</span>Screenshot placeholder</div>
            <figcaption>Revision quiz &mdash; image coming later</figcaption>
          </figure>
        </div>
      </section>
    </article>
  `;
}
