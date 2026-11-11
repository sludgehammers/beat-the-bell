const subjects = [
  ['Maths', 'Number, algebra and problem solving.'],
  ['English', 'Language, reading and literary analysis.'],
  ['Science', 'Biology, chemistry and physics.'],
  ['History', 'Events, evidence and explanations.'],
];

export function renderStudentPage(): string {
  return `<section class="mode-page student-page" aria-labelledby="student-title">
    <a class="back-link" href="#home">Back to home</a>
    <div class="launcher">
      <div>
        <p class="eyebrow">Your next revision adventure</p>
        <h1 id="student-title">Ready for the bell?</h1>
        <p class="intro">Step into the school, find your classroom and put your GCSE knowledge to the test.</p>
        <button class="demo-button" type="button" disabled aria-describedby="demo-status">Play Demo</button>
        <p id="demo-status" class="small-note">Demo unavailable in this website build. Game integration is in development.</p>
      </div>
      <figure class="school-preview"><img src="/school-bg.svg" alt="Pixel-art illustration of the Beat the Bell school" /><figcaption>Your school adventure starts here</figcaption></figure>
    </div>
    <section class="subject-picker" aria-labelledby="choose-title">
      <h2 id="choose-title">Choose your classroom</h2>
      <p class="small-note">Preview a subject below. All classrooms are planned and are not yet playable.</p>
      <div class="subject-options" role="group" aria-label="Subject previews">
        ${subjects.map(([name], i) => `<button type="button" class="subject-option" data-subject="${i}" aria-pressed="${i === 0}">${name}</button>`).join('')}
      </div>
      <div class="subject-detail" aria-live="polite"><h3 id="selected-subject">Maths</h3><p id="subject-description">${subjects[0][1]}</p><span class="small-note">Classroom in development</span></div>
    </section>
    <section class="progress-preview" aria-labelledby="progress-title">
      <div><h2 id="progress-title">Your adventure so far</h2><p class="small-note">Demonstration data only &mdash; not saved progress.</p></div>
      <dl class="stat-strip"><div><dt>Points</dt><dd>240</dd></div><div><dt>Quizzes completed</dt><dd>6</dd></div><div><dt>Latest quiz score</dt><dd>80%</dd></div></dl>
    </section>
    <p class="mode-note">Character customisation is planned. No account is needed for this preview.</p>
    <a class="mode-switch" href="#teacher">Switch to teacher mode</a>
  </section>`;
}

export function bindStudentPreview(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-subject]').forEach(button => {
    button.addEventListener('click', () => {
      const subject = subjects[Number(button.dataset.subject)];
      if (!subject) return;
      document.querySelectorAll('[data-subject]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
      document.querySelector('#selected-subject')!.textContent = subject[0];
      document.querySelector('#subject-description')!.textContent = subject[1];
    });
  });
}

export function renderTeacherPage(): string {
  const performance = [['Mathematics', 68], ['English', 74], ['Science', 62], ['History', 80]] as const;
  return `<section class="mode-page teacher-page" aria-labelledby="teacher-title">
    <a class="back-link" href="#home">Back to home</a>
    <header class="dashboard-header"><p class="eyebrow">Teaching workspace</p><h1 id="teacher-title">Teacher Dashboard</h1><p class="intro">A clear view of class revision, with space to spot where support could help.</p></header>
    <p class="demo-notice">Dashboard prototype &mdash; all classes, figures and recommendations below are fictional demonstration data.</p>
    <section class="class-overview" aria-labelledby="class-title"><div><p class="small-note">Class overview</p><h2 id="class-title">Year 10 &middot; Group A</h2></div>
      <dl class="stat-strip"><div><dt>Students</dt><dd>28</dd></div><div><dt>Average quiz score</dt><dd>71%</dd></div><div><dt>Completed activities</dt><dd>168</dd></div></dl>
    </section>
    <div class="dashboard-columns">
      <section class="dashboard-panel" aria-labelledby="performance-title"><h2 id="performance-title">Subject performance</h2><p class="small-note">Example average quiz scores</p>
        ${performance.map(([name, score]) => `<div class="performance-row"><label for="score-${name}">${name}<span>${score}%</span></label><meter id="score-${name}" min="0" max="100" value="${score}">${score}%</meter></div>`).join('')}
      </section>
      <section class="dashboard-panel" aria-labelledby="topics-title"><h2 id="topics-title">Topics to revisit</h2><p class="small-note">Illustrative suggestions, not an assessment of real students.</p><ul class="topic-list"><li><strong>Science</strong><span>Balancing chemical equations</span></li><li><strong>Mathematics</strong><span>Solving simultaneous equations</span></li><li><strong>English</strong><span>Using evidence in analysis</span></li></ul></section>
    </div>
    <section class="class-management" aria-labelledby="management-title"><div><h2 id="management-title">Class management</h2><p>Class creation, joining codes and student management are planned.</p></div><span class="subject-status">In development</span></section>
    <a class="mode-switch" href="#student">Switch to student mode</a>
  </section>`;
}
