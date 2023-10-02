'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// for related topics of custom contest
const levelTopics = ['Easy-Level', 'Medium-Level', 'Hard-Level', 'Typical'];
const targetTopics = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const difficultyTopics = Array.from(
  { length: 33 },
  (_, i) => 800 + i * 100
).map((val) => `Difficult-${val}`);
const unknownTopics = ['Uncategorized'];
const tags = [
  'implementation',
  'math',
  'greedy',
  'dp',
  'data structures',
  'brute force',
  'constructive algorithms',
  'graphs',
  'sortings',
  'binary search',
  'dfs and similar',
  'trees',
  'strings',
  'number theory',
  'combinatorics',
  '*special',
  'geometry',
  'bitmasks',
  'two pointers',
  'dsu',
  'shortest paths',
  'probabilities',
  'divide and conquer',
  'hashing',
  'games',
  'flows',
  'interactive',
  'matrices',
  'fft',
  'ternary search',
  'expression parsing',
  'meet-in-the-middle',
  '2-sat',
  'chinese remainder theorem',
  'schedules',
  'no tags',
];
const modes = ['Normal', 'Training'];
const classifications = [
  'All',
  'Div. 1',
  'Div. 1 + Div. 2',
  'Div. 2',
  'Div. 3',
  'Div. 4',
  'ICPC',
  'Kotlin Heroes',
  'Global',
  'Educational',
  'Others',
];
