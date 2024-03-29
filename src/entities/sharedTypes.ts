export type Classification =
  | 'Div. 1 + Div. 2'
  | 'Div. 1'
  | 'Div. 2'
  | 'Div. 3'
  | 'Div. 4'
  | 'ICPC'
  | 'Kotlin Heroes'
  | 'Global'
  | 'Educational'
  | 'Others';

export type ContestType = 'CF' | 'IOI' | 'ICPC' | 'Other';

export type Phase =
  | 'BEFORE'
  | 'CODING'
  | 'PENDING_SYSTEM_TEST'
  | 'SYSTEM_TEST'
  | 'FINISHED';

export type Kind =
  | 'Official ICPC Contest'
  | 'Official School Contest'
  | 'Opencup Contest'
  | 'School/University/City/Region Championship'
  | 'Training Camp Contest'
  | 'Official International Personal Contest'
  | 'Training Contest'
  | 'Unknown';

export type ProblemType = 'PROGRAMMING' | 'QUESTION';

export type Tag =
  | 'implementation'
  | 'math'
  | 'greedy'
  | 'dp'
  | 'data structures'
  | 'brute force'
  | 'constructive algorithms'
  | 'graphs'
  | 'sortings'
  | 'binary search'
  | 'dfs and similar'
  | 'trees'
  | 'strings'
  | 'number theory'
  | 'combinatorics'
  | '*special'
  | 'geometry'
  | 'bitmasks'
  | 'two pointers'
  | 'dsu'
  | 'shortest paths'
  | 'probabilities'
  | 'divide and conquer'
  | 'hashing'
  | 'games'
  | 'flows'
  | 'interactive'
  | 'matrices'
  | 'fft'
  | 'ternary search'
  | 'expression parsing'
  | 'meet-in-the-middle'
  | '2-sat'
  | 'chinese remainder theorem'
  | 'schedules'
  | 'no tags';

export type Mode = 'Normal' | 'Lockout' | 'Training';

export type Visibility = 'Public' | 'Private';

// for related topics of custom contest
const levelTopics = [
  'Easy-Level',
  'Medium-Level',
  'Hard-Level',
  'Typical',
] as const;
type LevelTopics = (typeof levelTopics)[number];

const targetTopics = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
] as const;
type TargetTopics = (typeof targetTopics)[number];

const difficultyTopics = Array.from(
  { length: 33 },
  (_, i) => 800 + i * 100
).map((val) => `Difficult-${val}` as const);
type DifficultyTopics = (typeof difficultyTopics)[number];

const unknownTopics = ['Uncategorized'] as const;
type UnknownTopics = (typeof unknownTopics)[number];

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
] as const;
export type AlgorithmTopics = (typeof tags)[number];

const modes = ['Normal', 'Training'] as const;
type ModeTopics = (typeof modes)[number];

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
] as const;
type ClassificationTopics = (typeof classifications)[number];

export type RelatedTopics =
  | LevelTopics
  | TargetTopics
  | DifficultyTopics
  | UnknownTopics
  | AlgorithmTopics
  | ModeTopics
  | ClassificationTopics
  | ContestType;
