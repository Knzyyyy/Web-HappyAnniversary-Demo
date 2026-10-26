const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync(`${__dirname}/web-anniversery.html`, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const progress = { style: {} };
const pageProgress = { style: {} };
const rect = { top: 1000, height: 2000 };
const dots = [10, 700, 1400].map(top => ({
  parentElement: { offsetTop: top }, offsetTop: 0, offsetHeight: 10,
  classList: { toggle(name, active) { this[name] = active; } }
}));
const wrap = {
  getBoundingClientRect: () => rect,
  querySelector: () => progress,
  querySelectorAll: () => dots
};
const listeners = {};
let resize;
const window = {
  innerHeight: 1000, scrollY: 0,
  addEventListener: (name, callback) => { listeners[name] = callback; }
};
const context = {
  window,
  matchMedia: () => ({ matches: false }),
  document: {
    documentElement: { scrollHeight: 5000 },
    createElement: () => ({ style: {}, classList: { add() {}, remove() {} }, appendChild() {}, remove() {} }),
    body: { appendChild() {} },
    querySelector: () => wrap,
    querySelectorAll: () => [],
    getElementById: id => id === 'progressBar' ? pageProgress : { style: {}, classList: { add() {}, remove() {}, toggle() {} }, appendChild() {} }
  },
  requestAnimationFrame: callback => { listeners.frame = callback; return 1; },
  IntersectionObserver: class { observe() {} },
  ResizeObserver: class { constructor(callback) { resize = callback; } observe() {} }
};
const init = script.slice(script.indexOf('    function initScrollAnimations()'), script.indexOf('    // Partikel Kelopak Canvas'));
vm.runInNewContext(`${init}\ninitScrollAnimations();`, context);
assert.equal(progress.style.height, '0%');
assert.ok(dots.every(dot => !dot.classList.active));
rect.top = -300;
window.scrollY = 1300;
listeners.scroll();
listeners.frame();
assert.equal(progress.style.height, '50%');
assert.deepEqual(dots.map(dot => dot.classList.active), [true, true, false]);
assert.equal(pageProgress.style.width, '32.5%');
rect.top = -1500;
listeners.scroll();
listeners.frame();
assert.equal(progress.style.height, '100%');
assert.ok(dots.every(dot => dot.classList.active));
rect.top = 1000;
resize();
listeners.frame();
assert.equal(progress.style.height, '0%');
assert.ok(dots.every(dot => !dot.classList.active));
rect.height = 0;
context.document.documentElement.scrollHeight = window.innerHeight;
listeners.resize();
listeners.frame();
assert.equal(progress.style.height, '0%');
assert.equal(pageProgress.style.width, '0%');
const config = script.slice(script.indexOf('    const CONFIG ='), script.indexOf('    // =========================================================================', script.indexOf('    const CONFIG =')));
const quiz = script.slice(script.indexOf('    const quizStep ='), script.indexOf('    // Render Kartu Flip 3D'));
function element() {
  return {
    children: [], textContent: '',
    classList: { add(name) { this[name] = true; }, remove(name) { this[name] = false; } },
    replaceChildren() { this.children = []; },
    appendChild(child) { this.children.push(child); },
    focus() { this.focused = true; }
  };
}
function runQuiz(answers, expectedScore) {
  const elements = Object.fromEntries(['quizStep', 'quizQuestion', 'quizOptions', 'quizFeedback', 'quizNext'].map(id => [id, element()]));
  vm.runInNewContext(`${config}\n${quiz}`, {
    document: { getElementById: id => elements[id], createElement: element }
  });
  assert.equal(elements.quizStep.textContent, 'Pertanyaan 1 dari 3');
  elements.quizNext.onclick();
  assert.equal(elements.quizStep.textContent, 'Pertanyaan 1 dari 3');
  answers.forEach((answer, index) => {
    const choices = elements.quizOptions.children;
    assert.equal(choices.length, 3);
    choices[answer].onclick();
    const feedback = elements.quizFeedback.textContent;
    assert.ok(feedback.length > 0);
    assert.ok(choices.every(choice => choice.disabled));
    assert.equal(elements.quizNext.classList.hidden, false);
    choices[(answer + 1) % 3].onclick();
    assert.equal(elements.quizFeedback.textContent, feedback);
    elements.quizNext.onclick();
    if (index < answers.length - 1) assert.equal(elements.quizStep.textContent, `Pertanyaan ${index + 2} dari 3`);
  });
  assert.equal(elements.quizQuestion.textContent, `Skor kamu: ${expectedScore} dari 3`);
  assert.equal(elements.quizOptions.children.length, 0);
  assert.equal(elements.quizNext.classList.hidden, true);
  assert.ok(elements.quizFeedback.textContent.includes('orang favoritku'));
}
runQuiz([0, 1, 0], 3);
runQuiz([1, 0, 2], 0);
runQuiz([0, 0, 0], 2);
assert.ok(html.indexOf('id="galGrid"') < html.indexOf('id="quizTitle"'));
assert.ok(html.indexOf('id="quizTitle"') < html.indexOf('id="rsnGrid"'));
console.log('Timeline scroll, quiz scoring, duplicate answers, section order, and JavaScript syntax checks passed.');
