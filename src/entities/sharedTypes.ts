export type Classification =
  | "Div. 1"
  | "Div. 1 + Div. 2"
  | "Div. 2"
  | "Div. 3"
  | "Div. 4"
  | "ICPC"
  | "Kotlin Heros"
  | "Global"
  | "Educational"
  | "Others";

export type ContestType = "CF" | "IOI" | "ICPC" | "Other";

export type Phase =
  | "BEFORE"
  | "CODING"
  | "PENDING_SYSTEM_TEST"
  | "SYSTEM_TEST"
  | "FINISHED";

export type Kind =
  | "Official ICPC Contest"
  | "Official School Contest"
  | "School/University/City/Region Championship"
  | "Training Camp Contest"
  | "Official International Personal Contest"
  | "Training Contest";

export type ProblemType = "PROGRAMMING" | "QUESTION";

export type Tag =
  | "implementation"
  | "math"
  | "greedy"
  | "dp"
  | "data structures"
  | "brute force"
  | "constructive algorithms"
  | "graphs"
  | "sortings"
  | "binary search"
  | "dfs and similar"
  | "trees"
  | "strings"
  | "number theory"
  | "combinatorics"
  | "*special"
  | "geometry"
  | "bitmasks"
  | "two pointers"
  | "dsu"
  | "shortest paths"
  | "probabilities"
  | "divide and conquer"
  | "hashing"
  | "games"
  | "flows"
  | "interactive"
  | "matrices"
  | "fft"
  | "ternary search"
  | "expression parsing"
  | "meet-in-the-middle"
  | "2-sat"
  | "chinese remainder theorem"
  | "schedules"
  | "no tags";

export type Mode = "Normal" | "Lockout" | "Training";
