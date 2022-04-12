/*
  112 - Capitalize Words
  -------
  by Anthony Fu (@antfu) #hard #template-literal
  
  ### Question
  
  Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.
  
  For example
  
  ```ts
  type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
  ```
  
  > View on GitHub: https://tsch.js.org/112
*/

/* _____________ Your Code Here _____________ */

type Seperator = ' ' | '.' | ',';

// type CapitalizeWords<
//   S extends string,
//   isFirst extends boolean = true
// > = S extends `${infer A}${infer R}`
//   ? A extends Seperator
//     ? `${A}${CapitalizeWords<Capitalize<R>, false>}`
//     : isFirst extends true
//     ? `${Capitalize<A>}${CapitalizeWords<R, false>}`
//     : `${A}${CapitalizeWords<R, false>}`
//   : S;

type CapitalizeWordsRest<S extends string> = S extends `${infer A}${infer R}`
  ? A extends Seperator
    ? `${A}${CapitalizeWordsRest<Capitalize<R>>}`
    : `${A}${CapitalizeWordsRest<R>}`
  : S;
type CapitalizeWords<S extends string> = CapitalizeWordsRest<Capitalize<S>>;
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';
type Res = CapitalizeWords<Capitalize<'foo bar hello world'>>;
type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/112/answer
  > View solutions: https://tsch.js.org/112/solutions
  > More Challenges: https://tsch.js.org
*/
