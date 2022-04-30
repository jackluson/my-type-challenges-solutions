/*
  8987 - Subsequence
  -------
  by jiangshan (@jiangshanmeta) #medium #union
  
  ### Question
  
  Given an array of unique elements, return all possible subsequences.
  
  A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.
  
  For example: 
  
  ```typescript
  type A = Subsequence<[1, 2] // [] | [1] | [2] | [1, 2]
  ```
  
  > View on GitHub: https://tsch.js.org/8987
*/


/* _____________ Your Code Here _____________ */
type UnionSubsequence<A extends unknown, B extends unknown> = [] | [A] | B | (B extends unknown[] ? [A, ...B] : [A, B])
type Subsequence<T extends unknown[]> =  T extends [infer F, ...infer Rest ] ? UnionSubsequence<F, Subsequence<Rest>>: never
 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type Res = Subsequence<[1, 2, 3, 4]>
type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] >>,
  Expect<Equal<Subsequence<[1, 2, 3, 4]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] | [4] | [1,4] | [2,4] | [3,4] | [1,2,4] | [1,3,4] | [2,3,4] | [2,4] | [3,4] | [1,2,3,4]>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8987/answer
  > View solutions: https://tsch.js.org/8987/solutions
  > More Challenges: https://tsch.js.org
*/

