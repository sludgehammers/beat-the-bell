
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header>
    <h2>BEAT THE BELL</h2>

    <nav>
      <a href="#">About Us</a>
      <a href="#">Home</a>
      <a href="#">Profile</a>
    </nav>
  </header>

  <main>
    <h1>Welcome to Beat the Bell!</h1>
    <p>Explore. Learn. Revise.</p>

    <h2>I am a...</h2>

    <div class="buttons">
      <button id="student-button">A Student</button>
      <button id="teacher-button">A Teacher</button>
    </div>

    <p id="message"></p>
  </main>
`;

const message = document.querySelector('#message')!;

document.querySelector('#student-button')
  ?.addEventListener('click', () => {
    message.textContent = 'Student mode coming soon!';
  });

document.querySelector('#teacher-button')
  ?.addEventListener('click', () => {
    message.textContent = 'Teacher mode coming soon!';
  });
