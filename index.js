const questions = Array.from({ length: 100 }, (_, i) => ({
  question: `Question ${i + 1} : Quelle est la réponse ?`,
  answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
  correct: 0 // index de la bonne réponse
}));

let level = 0;
let coins = 0;
let timer;
let timeLeft = 30;
let paused = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const levelEl = document.getElementById("level");
const coinsEl = document.getElementById("coins");
const timerEl = document.getElementById("timer");
const feedbackEl = document.getElementById("feedback");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");

function startGame() {
  level = 0;
  coins = 0;
  timeLeft = 30;
  paused = false;
  nextBtn.disabled = true;
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[level];
  levelEl.textContent = `Niveau : ${level + 1}`;
  coinsEl.textContent = `Pièces : ${coins}`;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(i);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  const correct = questions[level].correct;
  if (index === correct) {
    coins += 10;
    feedbackEl.textContent = "✅ Bonne réponse ! +10 pièces";
  } else {
    feedbackEl.textContent = `❌ Mauvaise réponse. La bonne réponse était : ${questions[level].answers[correct]}`;
  }

  nextBtn.disabled = false;
  clearInterval(timer);
}

function nextLevel() {
  level++;
  if (level >= questions.length) {
    questionEl.textContent = "🎉 Félicitations ! Tu as terminé les 100 niveaux.";
    answersEl.innerHTML = "";
    nextBtn.disabled = true;
    return;
  }
  timeLeft = 30;
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  showQuestion();
  startTimer();
}

function startTimer() {
  timerEl.textContent = `Temps : ${timeLeft}s`;
  timer = setInterval(() => {
    if (!paused) {
      timeLeft--;
      timerEl.textContent = `Temps : ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        feedbackEl.textContent = "⏰ Temps écoulé !";
        nextBtn.disabled = false;
      }
    }
  }, 1000);
}

function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "Reprendre" : "Pause";
}

startBtn.onclick = startGame;
pauseBtn.onclick = togglePause;
nextBtn.onclick = nextLevel;
