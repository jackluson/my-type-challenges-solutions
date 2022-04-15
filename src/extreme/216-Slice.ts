/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array
  
  ### Question
  
  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the tree argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.
  
  For example
  
  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```
  
  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

type Subtract<
  Minuend extends number | string,
  Subtrahend extends number,
  MinuendArr extends unknown[] = [],
  DiffArr extends unknown[] = []
> = Subtrahend extends 0
  ? Minuend
  : `${Minuend}` extends `${MinuendArr['length']}`
  ? [...MinuendArr, ...DiffArr]['length'] extends Subtrahend
    ? DiffArr['length']
    : Subtract<Minuend, Subtrahend, MinuendArr, [...DiffArr, unknown]>
  : Subtract<Minuend, Subtrahend, [...MinuendArr, unknown], DiffArr>;

type isGreaterThan<
  A extends number,
  B extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends B
  ? Arr['length'] extends A
    ? false
    : true
  : Arr['length'] extends A
  ? false
  : isGreaterThan<A, B, [...Arr, unknown]>;

type SliceIndex<
  Arr extends unknown[],
  Start extends number = 0
> = `${Start}` extends `-${infer A}` ? Subtract<A, Arr['length']> : Start;

type SliceCore<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length'],
  StartArr extends unknown[] = [],
  EndArr extends unknown[] = []
> = Arr extends [infer F, ...infer Rest]
  ? Start extends StartArr['length']
    ? End extends EndArr['length']
      ? []
      : [F, ...SliceCore<Rest, Start, End, StartArr, [...EndArr, unknown]>]
    : SliceCore<Rest, Start, End, [...StartArr, unknown], [...EndArr, unknown]>
  : [];

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length']
> = Arr extends []
  ? []
  : //@ts-ignore
  isGreaterThan<SliceIndex<Arr, End>, SliceIndex<Arr, Start>> extends true
  ? SliceCore<Arr, SliceIndex<Arr, Start>, SliceIndex<Arr, End>>
  : [];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Arr = [1, 2, 3, 4, 5];

type Result = Slice<Arr, 3, 1>;

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
