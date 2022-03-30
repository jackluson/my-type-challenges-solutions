/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math
  
  ### Question
  
  Given a number (always positive) as a type. Your type should return the number decreased by one.
  
  For example:
  
  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```
  
  > View on GitHub: https://tsch.js.org/2257
*/
type LengthOfString<
  S extends string,
  A extends string[] = []
> = S extends `${infer B}${infer Rest}`
  ? LengthOfString<Rest, [B, ...A]>
  : A['length'];

/* _____________ Your Code Here _____________ */

// your answers
// your answers
// 求教怎么把string转数字啊
type numbers = {
  '0': '9';
  '1': '0';
  '2': '1';
  '3': '2';
  '4': '3';
  '5': '4';
  '6': '5';
  '7': '6';
  '8': '7';
  '9': '8';
};
type numbers2 = {
  '0': 0;
  '1': 1;
  '2': 2;
  '3': 3;
  '4': 4;
  '5': 5;
  '6': 6;
  '7': 7;
  '8': 8;
  '9': 9;
};
// your answers
// type Pop<T extends any[]> = T extends [...infer head, any] ? head : never;

// type MinusOne<T extends number, A extends any[] = []> = A['length'] extends T
//   ? Pop<A>['length']
//   : MinusOne<T, [...A, 0]>;

type MinusOne<T extends number> = Gen<`${T}`, []> extends [infer _, ...infer XS]
  ? XS['length']
  : never;
type Concat<A> = A extends [infer X, ...infer XS]
  ? X extends Array<unknown>
    ? [...X, ...Concat<XS>]
    : []
  : [];
type T10<A> = Concat<[A, A, A, A, A, A, A, A, A, A]>;
type TSome<T extends string, A extends Array<unknown> = []> = Eq<
  T,
  A
> extends true
  ? A
  : TSome<T, [1, ...A]>;
type Gen<T extends string, A> = T extends `${infer X}${infer XS}`
  ? Gen<XS, Concat<[T10<A>, TSome<X>]>>
  : A;
type Eq<T extends string, A extends Array<unknown>> = T extends `${A['length']}`
  ? true
  : false;
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Res = MinusOne<9>;
type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
