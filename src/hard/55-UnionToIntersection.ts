/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `UnionToIntersection<U>`
  
  For example
  
  ```ts
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```
  
  > View on GitHub: https://tsch.js.org/55
*/

/* _____________ Your Code Here _____________ */

// your answers
type UnionToIntersection<U> = (
  U extends infer R ? (x: R) => any : never
) extends (x: infer V) => any
  ? V
  : never;

type I = UnionToIntersection<boolean | true>; // never
type D = boolean & true; // true

type A = 'foo' | 42 | true;

type B = A extends any ? (arg: A) => any : never; // (arg: A) => any

type C = B extends (arg: infer I) => void ? I : never; //  'foo' | 42 | true

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';
type Res = UnionToIntersection<'foo' | 42 | true>;

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => 'foo') | ((i: 42) => true)>,
      (() => 'foo') & ((i: 42) => true)
    >
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/55/answer
  > View solutions: https://tsch.js.org/55/solutions
  > More Challenges: https://tsch.js.org
*/
