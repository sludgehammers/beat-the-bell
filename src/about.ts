/** Dedicated hash-route content; shared header, theme and footer live in main.ts. */
export function renderAboutPage(): string {
  // Enable each image only after the real capture exists; update alt to match it.
  const experiences = [
    { title: 'Explore the School', description: 'Explore a top-down school and enter subject classrooms.', src: '/images/gameplay/school-exploration.png', alt: 'Top-down school map with entrances to subject classrooms', ready: false },
    { title: 'Take on Revision Challenges', description: 'Answer GCSE questions, earn points and learn from feedback.', src: '/images/gameplay/classroom-quiz.png', alt: 'Classroom revision quiz showing a GCSE question and answer feedback', ready: false },
  ];
  const steps = [
    ['01', 'Explore', 'Explore a virtual school and enter subject classrooms to find GCSE revision activities.'],
    ['02', 'Revise', 'Test your knowledge with interactive GCSE multiple-choice quizzes, including timed questions and challenges.'],
    ['03', 'Progress', 'Earn points and rewards for correct answers. Use instant feedback to understand mistakes, review results and identify topics to revisit.'],
  ];
  const subjects = [
    ['Mathematics', 'Practise number skills, algebra, geometry and problem solving.'],
    ['English', 'Build confidence in language, reading and literary analysis.'],
    ['Science', 'Review key ideas across biology, chemistry and physics.'],
    ['History', 'Revisit historical events, evidence and explanations.'],
  ];
  // Add original artwork under public/images/concepts/, then add { src, alt } entries below.
  // The website entry can include both early wireframes and a current website screenshot.
  const concepts: { title: string; description: string; images: { src: string; alt: string }[] }[] = [
    {
      title: 'Early Character Designs',
      description: 'The team explored different player character styles and ideas for customisation through early sketches.',
      images: [],
    },
    {
      title: 'School and Classroom Concepts',
      description: 'The team planned the school environment and classroom layouts around exploring different GCSE subjects.',
      images: [],
    },
    {
      title: 'Website Design Development',
      description: 'Early homepage wireframes and mockups helped shape the layout and visual direction of the current Beat the Bell website.',
      images: [],
    },
  ];
  return `
    <article class="about-page" aria-labelledby="about-page-title">
      <a class="back-link" href="#home">Back to home</a>
      <header class="about-page-intro">
        <p class="eyebrow">Revision through exploration</p>
        <h1 id="about-page-title" tabindex="-1">About Beat the Bell</h1>
        <p>Beat the Bell is a browser-based GCSE revision RPG for students in Years 10 and 11. It combines traditional GCSE revision with exploration and interactive challenges inspired by classic top-down RPGs.</p>
      </header>

      <section class="about-page-section about-why" aria-labelledby="why-title">
        <h2 id="why-title">Why Beat the Bell?</h2>
        <p class="section-summary">Reading notes and completing worksheets can be useful, but may not engage every student. Our university project explores whether interactive quizzes and game-based revision could encourage GCSE students, particularly those in Years 10 and 11, to practise more regularly while keeping subject knowledge at the centre.</p>
        <ol class="revision-aims">
          <li><h3>Making revision more engaging.</h3><p>Explore a more interactive way to practise GCSE subject knowledge.</p></li>
          <li><h3>Encouraging regular practice.</h3><p>Use quiz challenges to encourage students to return to revision more often.</p></li>
          <li><h3>Identifying areas for improvement.</h3><p>Help students spot gaps in their knowledge and revisit topics they find difficult.</p></li>
        </ol>
      </section>

      <section class="about-page-section about-how" aria-labelledby="how-title">
        <h2 id="how-title">How It Works</h2>
        <p class="section-summary">The planned game follows three steps: Explore, Revise and Progress. All gameplay features described below are planned and not yet playable; there is currently no playable Phaser demo.</p>
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

      <section class="about-page-section concept-gallery" aria-labelledby="concept-title">
        <h2 id="concept-title">From Concept to Game</h2>
        <p class="section-summary">Beat the Bell started with sketches, early website designs and ideas for a school-based revision game. Our team has been exploring how to combine classic RPG gameplay with GCSE revision activities.</p>
        ${concepts.map((concept, index) => `
          <article class="concept-row" aria-labelledby="concept-${index}-title">
            <div class="concept-figure${concept.images.length ? '' : ' concept-index'}">
              ${concept.images.length
                ? concept.images.map(image => `<div class="concept-media"><img src="${image.src}" alt="${image.alt}" loading="lazy" /></div>`).join('')
                : `<span aria-hidden="true">0${index + 1}</span>`}
            </div>
            <div class="concept-copy">
              <h3 id="concept-${index}-title">${concept.title}</h3>
              <p>${concept.description}</p>
            </div>
          </article>`).join('')}
      </section>

      <section class="about-page-section experience-showcase" aria-labelledby="inside-title">
        <h2 id="inside-title">A Look Inside Beat the Bell</h2>
        ${experiences.map((experience, index) => `
          <article class="experience-row" aria-labelledby="experience-${index}-title">
            <div class="experience-media">
              ${experience.ready
                ? `<img src="${experience.src}" alt="${experience.alt}" loading="lazy" />`
                : `<div class="experience-decoration"><span class="experience-pixels" aria-hidden="true"></span><span>In Development</span></div>`}
            </div>
            <div class="experience-copy">
              <h3 id="experience-${index}-title">${experience.title}</h3>
              <p>${experience.description}</p>
              ${experience.ready ? '<span class="experience-status">In Development</span>' : ''}
            </div>
          </article>`).join('')}
      </section>
    </article>
  `;
}
