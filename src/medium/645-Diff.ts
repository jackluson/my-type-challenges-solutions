/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Get an `Object` that is the difference between `O` & `O1`
  
  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

// your answers
type Diff<O, O1> = O extends O1
  ? { [K in Exclude<keyof O, keyof O1>]: O[K] }
  : Diff<O1, O>;

// type Diff<O extends unknown, O1 extends unknown> = {
//   [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: (O & O1)[P]
// }

// type Diff<O, O1> = {
//   [K in keyof O | keyof O1 as K extends keyof O
//     ? K extends keyof O1
//       ? never
//       : K
//     : K]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never;
// };

// type Diff<O, O1> = {
//   [K in keyof O | keyof O1 as K extends keyof O
//     ? K extends keyof O1
//       ? never
//       : K
//     : K]: (O & O1)[K];
// };

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Res = Diff<Foo, Bar>;
type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
