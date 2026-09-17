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

const { authError, callbackIntent, withAuthTimeout } = require('../src/lib/auth-journey.ts');
const { filterGuides, guideGroup } = require('../src/lib/guide-presentation.ts');
test('account errors explain service failures without blaming the student or revealing internals', () => {
  assert.match(authError(new TypeError('Failed to fetch')), /account service/);
  assert.match(authError({ message: 'Email not confirmed' }), /confirmation link/);
  assert.match(authError({ message: 'Invalid login credentials' }), /do not match/);
  assert.doesNotMatch(authError(new Error('private database detail')), /private database/);
});
test('confirmation supports both existing recovery links and the explicit recovery redirect', () => {
  assert.deepEqual(callbackIntent('?flow=recovery', ''), { recovery: true, failed: false });
  assert.deepEqual(callbackIntent('', '#type=recovery&access_token=example'), { recovery: true, failed: false });
  assert.equal(callbackIntent('?error=access_denied', '').failed, true);
  assert.equal(callbackIntent('', '#error_description=expired').failed, true);
  assert.deepEqual(callbackIntent('', ''), { recovery: false, failed: false });
});
test('account operations time out and preserve successful results and service errors', async () => {
  assert.equal(await withAuthTimeout(Promise.resolve(7), 50), 7);
  await assert.rejects(withAuthTimeout(Promise.reject(new Error('original')), 50), /original/);
  await assert.rejects(withAuthTimeout(new Promise(() => {}), 10), /timed out/);
});
test('revision library combines topic filters with case-insensitive multiword search', () => {
  const guides = [
    { slug: 'quadratic-equations', title: 'Solving quadratic equations', excerpt: 'Factorising for Higher GCSE', category: 'Algebra' },
    { slug: 'circle-theorems', title: 'Circle theorems', excerpt: 'Higher geometry examples', category: 'Geometry' },
  ];
  assert.equal(guideGroup(guides[0]), 'Algebra');
  assert.equal(filterGuides(guides, 'All guides', ' HIGHER quadratic ')[0].slug, 'quadratic-equations');
  assert.equal(filterGuides(guides, 'Geometry', 'quadratic').length, 0);
  assert.equal(filterGuides(guides, 'All guides', '').length, 2);
});
