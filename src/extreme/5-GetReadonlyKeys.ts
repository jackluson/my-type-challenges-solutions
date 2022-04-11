/*
  5 - Get Readonly Keys
  -------
  by Anthony Fu (@antfu) #extreme #utils #object-keys
  
  ### Question
  
  Implement a generic `GetReadonlyKeys<T>` that returns a union of the readonly keys of an Object.
  
  For example
  
  ```ts
  interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
  }
  
  type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
  ```
  
  > View on GitHub: https://tsch.js.org/5
*/

/* _____________ Your Code Here _____________ */

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

type GetReadonlyKeys<T> = keyof {
  [K in keyof T as Equal<
    Readonly<{ [Key in K]: T[Key] }>,
    {
      [Key in K]: T[Key];
    }
  > extends true
    ? K
    : never]: T[K];
};

/* _____________ Test Cases _____________ */
import { Expect } from '@type-challenges/utils';
type Res = GetReadonlyKeys<Todo1>;
type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

const todo1: Todo1 = {
  title: 'Learn TypeScript',
  description: '',
  completed: false,
};

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5/answer
  > View solutions: https://tsch.js.org/5/solutions
  > More Challenges: https://tsch.js.org
*/
