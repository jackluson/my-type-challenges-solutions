/*
  545 - printf
  -------
  by null (@Bestmain-YS) #hard #template-literal
  
  ### Question
  
  Implement `Format<T extends string>` generic.
  
  For example,
  
  ```ts
  type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
  type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
  type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
  type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string
  ```
  
  > View on GitHub: https://tsch.js.org/545
*/

/* _____________ Your Code Here _____________ */

type StrMap = {
  d: number;
  s: string;
};

type GetParams<
  T extends string,
  Res extends any[] = []
> = T extends `${infer Start}%${infer Temp}${infer Other}`
  ? Temp extends keyof StrMap
    ? GetParams<Other, [...Res, Temp]>
    : GetParams<Other, Res>
  : Res;

// type Format<
//   T extends string,
//   Params extends any[] = GetParams<T>
// > = Params extends [infer Start, ...infer End]
//   ? (params: StrMap[Start & keyof StrMap]) => Format<T, End>
//   : string;
type Format<T extends string> = T extends `${infer F}${infer Rest}`
  ? F extends '%'
    ? Rest extends `${infer Key}${infer End}`
      ? Key extends keyof StrMap
        ? (s: StrMap[Key]) => Format<Rest>
        : Format<End>
      : Format<Rest>
    : Format<Rest>
  : string;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/545/answer
  > View solutions: https://tsch.js.org/545/solutions
  > More Challenges: https://tsch.js.org
*/
