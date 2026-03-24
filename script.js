let reactionTime = null;
let trials = 0;
let correct = 0;
let sumRT = 0;

let stimulusValue = null;
let expectedKey = null;
let startTime = null;

const stimulusEl = document.getElementById('stimulus');
const lastRTEl = document.getElementById('last-rt');
const totalTrialsEl = document.getElementById('total-trials');
const correctEl = document.getElementById('correct');
const avgRTE1 = document.getElementById('avg-rt');
const resetBtn = document.getElementById('reset-btn');

function generateStimulus() {
  const isLetter = Math.random() < 0.5;

  stimulusValue = isLetter
    ? String.fromCharCode(65 + Math.floor(Math.random() * 26))
    : Math.floor(Math.random() * 10).toString();

  expectedKey = isLetter ? 'a' : 'l';
  startTime = Date.now();
  stimulusEl.textContent = stimulusValue;
}

function handleResult(rt, isCorrect) {
  reactionTime = rt;
  trials += 1;

  if (isCorrect) correct += 1;

  sumRT += rt;
  updateStats();
}

function handleReset() {
  reactionTime = null;
  trials = 0;
  correct = 0;
  sumRT = 0;

  updateStats();
  generateStimulus();
}

function updateStats() {
  lastRTEl.innerHTML = `Last RT<br>${reactionTime !== null ? reactionTime + " ms" : "-"}`;
  totalTrialsEl.innerHTML = `Total Trials<br>${trials}`;
  correctEl.innerHTML = `Correct<br>${correct}`;

  const avgRT = trials > 0 ? Math.round(sumRT / trials) : 0;
  avgRTE1.innerHTML = `Avg RT<br>${avgRT} ms`;
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    handleReset();
    return;
  }

  const key = e.key.toLowerCase();

  if (key === 'a' || key === 'l') {
    const rt = Date.now() - startTime;
    const isCorrect = key === expectedKey;

    handleResult(rt, isCorrect);
    generateStimulus();
  }
});

resetBtn.addEventListener('click', handleReset);

// Start
generateStimulus();