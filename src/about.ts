/** Dedicated hash-route content; shared header, theme and footer live in main.ts. */
export function renderAboutPage(): string {
  // Original game assets arranged as artwork previews while gameplay is developed.
  const experiences = [
    { title: 'Explore the School', description: 'Explore a top-down school and enter subject classrooms.' },
    { title: 'Take on Revision Challenges', description: 'Answer GCSE questions, earn points and learn from feedback.' },
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
  // Use original project artwork; leave website imagery empty until a genuine capture is supplied.
  const concepts: { title: string; description: string; images: { src: string; alt: string }[] }[] = [
    {
      title: 'Early Character Designs',
      description: 'Original fox character sprites explore standing and walking poses facing left and right.',
      images: [{ src: '/images/development/fox-full.png', alt: 'Original fox character sprite sheet with four left- and right-facing poses' }],
    },
    {
      title: 'School and Classroom Concepts',
      description: 'The team planned the school environment and classroom layouts around exploring different GCSE subjects.',
      images: [
        { src: '/images/development/math.png', alt: 'Blue Maths subject building concept' },
        { src: '/images/development/english.png', alt: 'Blue English subject building concept' },
        { src: '/images/development/science.png', alt: 'Blue Science subject building concept' },
        { src: '/images/development/history.png', alt: 'Blue History subject building concept' },
      ],
    },
    {
      title: 'Website Design Development',
      description: 'The website design is developing alongside the game. A genuine wireframe or website screenshot has not yet been added here.',
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
        <p class="section-summary">Original project concept artwork shows the characters and school environment being developed for Beat the Bell; these images are not screenshots of working Phaser gameplay.</p>
        ${concepts.map((concept, index) => `
          <article class="concept-row" aria-labelledby="concept-${index}-title">
            ${concept.images.length ? `<div class="concept-figure${concept.images.length > 1 ? ' concept-artwork-grid' : ''}">
              ${concept.images.map(image => `<div class="concept-media"><img src="${image.src}" alt="${image.alt}" loading="lazy" /></div>`).join('')}
            </div>` : ''}
            <div class="concept-copy">
              <h3 id="concept-${index}-title">${concept.title}</h3>
              <p>${concept.description}</p>
            </div>
          </article>`).join('')}
      </section>

      <section class="about-page-section experience-showcase" aria-labelledby="inside-title">
        <h2 id="inside-title">A Look Inside Beat the Bell</h2>
        <p class="section-summary">These concept artwork previews illustrate the game in development; they are not screenshots of working Phaser gameplay.</p>
        ${experiences.map((experience, index) => `
          <article class="experience-row" aria-labelledby="experience-${index}-title">
            <div class="experience-media">
              <div class="development-scene ${index === 0 ? 'school-scene' : 'classroom-scene'}" role="img" aria-label="${index === 0 ? 'School artwork preview with four subject buildings and a fox character on lined paper' : 'Classroom artwork preview with blue desks, books, a calculator, science equipment and a fox character'}">
                ${index === 0
                  ? ['english', 'math', 'history', 'science', 'fox'].map(asset => `<img class="scene-${asset}" src="/images/development/${asset}.png" alt="" loading="lazy" />`).join('')
                  : ['bookcase', 'plant', 'desk', 'book', 'calculator', 'microscope', 'fox'].map(asset => `<img class="scene-${asset}" src="/images/development/${asset}.png" alt="" loading="lazy" />`).join('')}
              </div>
            </div>
            <div class="experience-copy">
              <h3 id="experience-${index}-title">${experience.title}</h3>
              <p>${experience.description}</p>
            </div>
          </article>`).join('')}
      </section>
    </article>
  `;
}
