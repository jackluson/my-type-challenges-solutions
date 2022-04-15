/*
  151 - Query String Parser
  -------
  by Pig Fang (@g-plane) #extreme #template-literal
  
  ### Question
  
  You're required to implement a type-level parser to parse URL query string into a object literal type.
  
  Some detailed requirements:
  
  - Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
  - Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
  - When a key has only one value, that value can't be wrapped into a tuple type.
  - If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.
  
  > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

type AppendToObject<T, U extends string, V> = {
  [K in keyof T]: K extends U ? (T[K] extends V ? T[K] : [T[K], V]) : T[K];
};

type PerParser<
  S extends string,
  O extends Record<string, any> = {}
> = S extends `${infer Key}=${infer Value}`
  ? Key extends keyof O
    ? AppendToObject<O, Key, Value>
    : { [K in Key | keyof O]: Value extends O[K] ? Value : O[K] }
  : S extends keyof O
  ? AppendToObject<O, S, true>
  : { [K in S | keyof O]: true extends O[K] ? true : O[K] };

type ParseQueryString<
  S extends string,
  O extends Record<string, any> = {}
> = S extends ''
  ? O
  : S extends `${infer F}&${infer R}`
  ? ParseQueryString<R, PerParser<F, O>>
  : PerParser<S, O>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';
type Res = ParseQueryString<'k1&k2'>;
type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/151/answer
  > View solutions: https://tsch.js.org/151/solutions
  > More Challenges: https://tsch.js.org
*/
