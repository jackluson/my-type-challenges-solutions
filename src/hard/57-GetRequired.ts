/*
  57 - Get Required
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `GetRequired<T>`, which remains all the required fields
  
  For example
  
  ```ts
  type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
  ```
  
  > View on GitHub: https://tsch.js.org/57
*/

/* _____________ Your Code Here _____________ */

type GetRequired<T> = {
  [K in keyof T as { [Key in K]: T[Key] } extends { [Key in K]-?: T[Key] }
    ? K
    : never]: T[K];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';
type Res = GetRequired<{ foo: undefined; bar?: undefined }>;
// type Res2 = NonNullable<keyof { foo: undefined; bar?: undefined }>;
type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/57/answer
  > View solutions: https://tsch.js.org/57/solutions
  > More Challenges: https://tsch.js.org
*/
