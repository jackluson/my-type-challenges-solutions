/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.
  
  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.
  
  For example
  
  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */
type Raw<O> = {
  [K in keyof O]: O[K];
};
type RequiredByKeys<T, K = keyof T> = Raw<
  {
    [Key in keyof T as Key extends K ? never : Key]: T[Key];
  } & {
    [Key in keyof T as Key extends K ? Key : never]-?: T[Key];
  }
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils';

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}
type Res = RequiredByKeys<User>;
type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
