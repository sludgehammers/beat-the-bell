
export interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export const mathsQuestions: QuizQuestion[] = [
  {
    question: "What is 12 × 8?",
    answers: ["84", "96", "108", "112"],
    correctAnswer: 1
  },
  {
    question: "What is the square root of 144?",
    answers: ["10", "11", "12", "14"],
    correctAnswer: 2
  },
  {
    question: "Solve: 3x + 5 = 20",
    answers: ["3", "5", "7", "10"],
    correctAnswer: 1
  },
  {
    question: "What is 25% of 200?",
    answers: ["25", "40", "50", "75"],
    correctAnswer: 2
  },
  {
    question: "What is 7 squared?",
    answers: ["14", "42", "49", "56"],
    correctAnswer: 2
  }
];

export function renderQuiz(): string {
  const firstQuestion = mathsQuestions[0];

  return `
    <section class="quiz-container" aria-labelledby="quiz-title">
      <h2 id="quiz-title">GCSE Maths Challenge</h2>

      <div class="quiz-header">
        <p>Time Remaining: <span id="quiz-timer">02:00</span></p>
        <p>Score: <span id="quiz-score">0</span></p>
      </div>

      <div class="quiz-question">
        <h3 id="question-text">${firstQuestion.question}</h3>

        <div class="quiz-answers">
          ${firstQuestion.answers.map((answer, index) => `
            <button
              type="button"
              class="quiz-answer"
              data-answer="${index}"
            >
              ${answer}
            </button>
          `).join('')}
        </div>
      </div>

      <p id="quiz-feedback" aria-live="polite"></p>
    </section>
  `;
}


export function bindQuiz(): void {
  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  let timeRemaining = 120;
  let quizFinished = false;
  let nextQuestionTimeout: ReturnType<typeof setTimeout> | undefined;

  const timerDisplay = document.querySelector<HTMLElement>('#quiz-timer');

  const countdown = window.setInterval(() => {
    if (quizFinished || !timerDisplay?.isConnected) {
      window.clearInterval(countdown);
      return;
    }

    timeRemaining--;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerDisplay.textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeRemaining <= 0) {
      showResults();
    }
  }, 1000);


  const questionText = document.querySelector<HTMLElement>('#question-text');
  const answersContainer = document.querySelector<HTMLElement>('.quiz-answers');
  const feedback = document.querySelector<HTMLElement>('#quiz-feedback');
  const scoreDisplay = document.querySelector<HTMLElement>('#quiz-score');
console.log('Quiz elements:', { questionText, answersContainer, feedback, scoreDisplay });
  if (!questionText || !answersContainer || !feedback || !scoreDisplay) {
    return;
  }

  function showQuestion(): void {
    answered = false;

    const question = mathsQuestions[currentQuestion];

    questionText!.textContent = question.question;
    feedback!.textContent = '';

    answersContainer!.innerHTML = question.answers.map((answer, index) => `
      <button type="button" class="quiz-answer" data-answer="${index}">
        ${answer}
      </button>
    `).join('');

    answersContainer!.querySelectorAll<HTMLButtonElement>('.quiz-answer')
      .forEach((button) => {
        button.addEventListener('click', () => checkAnswer(Number(button.dataset.answer)));
      });
  }

  function checkAnswer(selectedAnswer: number): void {
    console.log('Answer clicked:', selectedAnswer);

    if (answered || quizFinished) return;

    answered = true;

    const question = mathsQuestions[currentQuestion];

    if (selectedAnswer === question.correctAnswer) {
      score += 10;
      feedback!.textContent = 'Correct! +10 points';
    } else {
      feedback!.textContent =
        `Incorrect! The correct answer was ${question.answers[question.correctAnswer]}.`;
    }

    scoreDisplay!.textContent = String(score);

    answersContainer!.querySelectorAll<HTMLButtonElement>('button')
      .forEach((button) => {
        button.disabled = true;
      });

    nextQuestionTimeout = window.setTimeout(() => {
      currentQuestion++;

      if (currentQuestion < mathsQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }

  function showResults(): void {

    if (quizFinished) return;

    quizFinished = true;
    window.clearInterval(countdown);

    if (nextQuestionTimeout !== undefined) {
      window.clearTimeout(nextQuestionTimeout);
    }

    const container = document.querySelector<HTMLElement>('.quiz-container');

    if (!container) return;

    
      
  const correctAnswers = score / 10;
  const totalQuestions = mathsQuestions.length;
  const completed = currentQuestion >= totalQuestions;

  container.innerHTML = `
    <div class="quiz-results">
      <h2>${completed ? 'Quiz Complete!' : "Time's Up!"}</h2>

      <p class="results-message">
        ${completed
          ? 'Well done! You completed the GCSE Maths Challenge.'
          : 'The bell has rung! Your revision session is over.'}
      </p>

      <h3>Final Score: ${score} / ${totalQuestions * 10}</h3>

      <p>Correct Answers: ${correctAnswers} / ${totalQuestions}</p>

      <p>Keep practising to improve your GCSE Maths knowledge!</p>

      <button type="button" id="play-again" class="quiz-answer">
        Play Again
      </button>

      <a href="#student">Return to Student Page</a>
    </div>
  `;

  document.querySelector<HTMLButtonElement>('#play-again')
    ?.addEventListener('click', () => {
      window.location.reload();
    });

  

  
}

showQuestion();

}
