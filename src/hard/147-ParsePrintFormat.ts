/*
  147 - C-printf Parser
  -------
  by Pig Fang (@g-plane) #hard #template-literal
  
  ### Question
  
  There is a function in C language: `printf`. This function allows us to print something with formatting. Like this:
  
  ```c
  printf("The result is %d.", 42);
  ```
  
  This challenge requires you to parse the input string and extract the format placeholders like `%d` and `%f`. For example, if the input string is `"The result is %d."`, the parsed result is a tuple `['dec']`.
  
  Here is the mapping:
  
  ```typescript
  type ControlsMap = {
    c: 'char',
    s: 'string',
    d: 'dec',
    o: 'oct',
    h: 'hex',
    f: 'float',
    p: 'pointer',
  }
  ```
  
  > View on GitHub: https://tsch.js.org/147
*/

/* _____________ Your Code Here _____________ */

type ControlsMap = {
  c: 'char';
  s: 'string';
  d: 'dec';
  o: 'oct';
  h: 'hex';
  f: 'float';
  p: 'pointer';
};

type ControlKeys = keyof ControlsMap;

// type ParsePrintFormat<
//   S extends string,
//   A extends any[] = []
// > = S extends `${infer F}${infer P}${infer R}`
//   ? `${F}${P}` extends `%${ControlKeys}`
//     ? P extends ControlKeys
//       ? ParsePrintFormat<R, [...A, ControlsMap[P]]>
//       : ParsePrintFormat<R, A>
//     : `${F}${P}` extends `%%`
//     ? ParsePrintFormat<R, A>
//     : ParsePrintFormat<`${P}${R}`, A>
//   : A;

type ParsePrintFormat<S> = S extends `${any}%${infer A}${infer B}`
  ? A extends keyof ControlsMap
    ? [ControlsMap[A], ...ParsePrintFormat<B>]
    : ParsePrintFormat<B>
  : [];
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';
type Res = ParsePrintFormat<'The result is %d.'>;
type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/147/answer
  > View solutions: https://tsch.js.org/147/solutions
  > More Challenges: https://tsch.js.org
*/
