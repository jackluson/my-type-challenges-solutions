/*
  6 - Simple Vue
  -------
  by Anthony Fu (@antfu) #hard #this #application #vue
  
  ### Question
  
  Implement a simpiled version of a Vue-like typing support.
  
  By providing a function name `SimpleVue` (similar to `Vue.extend` or `defineComponent`), it should properly infer the `this` type inside computed and methods.
  
  In this challenge, we assume that SimpleVue take an Object with `data`, `computed` and `methods` fields as it's only argument,
  
  - `data` is a simple function that returns an object that exposes the context `this`, but you won't be accessible to other computed values or methods.
  
  - `computed` is an Object of functions that take the context as `this`, doing some calculation and returns the result. The computed results should be exposed to the context as the plain return values instead of functions.
  
  - `methods` is an Object of functions that take the context as `this` as well. Methods can access the fields exposed by `data`, `computed` as well as other `methods`. The different between `computed` is that `methods` exposed as functions as-is.
  
  The type of `SimpleVue`'s return value can be arbitrary.
  
  ```ts
  const instance = SimpleVue({
    data() {
      return {
        firstname: 'Type',
        lastname: 'Challenges',
        amount: 10,
      }
    },
    computed: {
      fullname() {
        return this.firstname + ' ' + this.lastname
      }
    },
    methods: {
      hi() {
        alert(this.fullname.toLowerCase())
      }
    }
  })
  ```
  
  > View on GitHub: https://tsch.js.org/6
*/
type GetComputed<C> = {
  [K in keyof C]: C[K] extends (...arg: any[]) => infer R ? R : never;
};

type GetProps<P> = {
  [K in keyof P]: P[K] extends { type: infer N }
    ? N extends (...args: any) => any
      ? ReturnType<N>
      : N extends any[]
      ? ReturnType<N[number]>
      : N extends new (...args: any) => any
      ? InstanceType<N>
      : any
    : P[K] extends (...args: any) => any
    ? ReturnType<P[K]>
    : any;
};
/* _____________ Your Code Here _____________ */
type Options<P, D, C, M> = {
  props: P;
  data: (this: GetProps<P>) => D;
  computed: C;
  methods: M;
} & ThisType<GetProps<P> & D & GetComputed<C> & M>;

declare function VueBasicProps<P, D, C, M>(options: Options<P, D, C, M>): any;

/* _____________ Test Cases _____________ */
import { Equal, Expect, IsAny, Debug } from '@type-challenges/utils';

type Res = ReturnType<typeof String>;

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>;
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>
    ];

    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const propE = this.propE;
      const propTe = this.propD;
      const propT = this.propB;
      type cases = [
        Expect<Equal<typeof propT, string>>,
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ];
    },
  },
});

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6/answer
  > View solutions: https://tsch.js.org/6/solutions
  > More Challenges: https://tsch.js.org
*/
