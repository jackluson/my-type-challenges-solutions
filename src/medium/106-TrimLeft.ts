/*
  106 - Trim Left
  -------
  by Anthony Fu (@antfu) #medium #template-literal
  
  ### Question
  
  Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.
  
  For example
  
  ```ts
  type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
  ```
  
  > View on GitHub: https://tsch.js.org/106
*/

/* _____________ Your Code Here _____________ */

type TrimLeft<S extends string> = S extends `${' ' | '\t' | '\n'}${infer A}`
  ? TrimLeft<A>
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Res = TrimLeft<'str'>;
type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/106/answer
  > View solutions: https://tsch.js.org/106/solutions
  > More Challenges: https://tsch.js.org
*/
