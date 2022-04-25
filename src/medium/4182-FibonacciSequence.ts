/*
  4182 - Fibonacci Sequence
  -------
  by windliang (@wind-liang) #medium 
  
  ### Question
  
  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).
  
  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
  
  For example
  ```ts
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```
  
  > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */
// import { Add } from '../utils/Add';

type Pop<T extends number[]> = T extends [...infer A, infer B] ? A : never;

// type Fibonacci<T extends number, A extends number[] = [0, 1]> = T extends 0
//   ? A[0]
//   : T extends 1
//   ? A[1]
//   : A['length'] extends T
//   ? A extends [...infer _A, infer B, infer C]
//     ? Add<B & number, C & number>
//     : never
//   : Fibonacci<
//       T,
//       [
//         ...A,
//         A extends [...infer F, infer Last2, infer Last]
//           ? Add<Last2 & number, Last & number>
//           : never
//       ]
//     >;
// your answers
type Fibonacci<
  T extends number,
  X extends number[] = [],
  Y extends number[] = [0],
  P extends number[] = []
> = T extends P['length']
  ? X['length']
  : Fibonacci<T, Y, [...X, ...Y], [...P, 0]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
//The sequence starts: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
// type Res = Fibonacci<50>;
type cases = [Expect<Equal<Fibonacci<3>, 2>>, Expect<Equal<Fibonacci<8>, 21>>];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4182/answer
  > View solutions: https://tsch.js.org/4182/solutions
  > More Challenges: https://tsch.js.org
*/
