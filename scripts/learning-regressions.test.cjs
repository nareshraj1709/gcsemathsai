const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
require.extensions['.ts'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  module._compile(result.outputText, filename);
};
const { readProgress, updateProgress, saveProgress, PROGRESS_KEY } = require('../src/lib/learning-progress.ts');
const { trackLearning } = require('../src/lib/learning-events.ts');
const { getAllDiagnosticSets } = require('../src/lib/diagnostic-mcqs/index.ts');
const sample = { slug: 'fractions', title: 'Fractions', score: 3, total: 5, completedAt: '2026-09-17T09:00:00Z' };
test('progress rejects malformed data, unsafe links and impossible scores', () => {
  for (const raw of [null, 'bad json', '{}', 'null', '[null]', JSON.stringify([{ ...sample, slug: '//external.test' }]), JSON.stringify([{ ...sample, score: 6 }]), JSON.stringify([{ ...sample, total: 0 }])]) assert.deepEqual(readProgress(raw), []);
  assert.deepEqual(readProgress(JSON.stringify([sample])), [sample]);
});
test('retries replace the same topic result and preserve other topics', () => {
  const other = { ...sample, slug: 'surds', title: 'Surds' };
  const updated = { ...sample, score: 5 };
  assert.deepEqual(updateProgress([sample, other], updated), [updated, other]);
});
test('saving progress survives disabled browser storage', () => {
  global.localStorage = { getItem() { throw Error('Storage disabled'); } };
  assert.equal(saveProgress(sample), false);
  delete global.localStorage;
});
test('explicit save stores the result and notifies other panels', () => {
  let stored, notification;
  global.localStorage = { getItem: () => '[]', setItem: (key, value) => { assert.equal(key, PROGRESS_KEY); stored = value; } };
  global.window = { dispatchEvent: event => { notification = event.type; } };
  assert.equal(saveProgress(sample), true);
  assert.deepEqual(JSON.parse(stored), [sample]);
  assert.equal(notification, 'gcse-progress-updated');
  delete global.localStorage; delete global.window;
});
test('learning events work without analytics and contain no answer text', () => {
  trackLearning('quiz_start', 'fractions');
  const events = []; global.window = { gtag: (...args) => events.push(args) };
  trackLearning('quiz_answer', 'fractions', { question_number: 1, correct: 1 });
  assert.deepEqual(events, [['event', 'quiz_answer', { topic_slug: 'fractions', activity_type: 'diagnostic', question_number: 1, correct: 1 }]]);
  delete global.window;
});
test('every topic has a non-empty structurally valid quiz', () => {
  const sets = getAllDiagnosticSets();
  const topics = fs.readdirSync(path.join(root, 'src/content/topics')).filter(x => x.endsWith('.md')).map(x => x.slice(0,-3));
  assert.equal(new Set(sets.map(x => x.topicSlug)).size, sets.length);
  assert.deepEqual(sets.map(x=>x.topicSlug).sort(), topics.sort());
  const ids = new Set();
  for (const set of sets) {
    assert.ok(set.questions.length > 0, set.topicSlug);
    for (const q of set.questions) {
      assert.equal(q.topicSlug, set.topicSlug);
      assert.ok(!ids.has(q.id), q.id); ids.add(q.id);
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options).size, 4, q.id + ' duplicate options');
      assert.ok(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < 4, q.id);
      assert.ok(q.explanation.trim().length > 0, q.id);
    }
  }
});
