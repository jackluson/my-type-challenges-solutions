# [type-challenge](https://github.com/type-challenges/type-challenges) Solutions


## Note

1. Conditional types in TypeScript are distributive over unions. So when we write T extends Some<T> where T is a union, what TypeScript does is actually take each element from the union T and apply condition to it.

2. 如何判断一个类似是any， 可用利用any的特性，any extends string 可以在得到两个结果,如果可以得到true | false 也就是 boolean。当然也可以不同string， 比如number

```ts
type IsAny<T> = boolean extends (T extends string ? true : false) ? true : false;

```

3. 如何遍历联合类型？ 看下面代码：
```ts
type LookUp<U, T> = U extends { type: T } ? U : never; //extends 循环  Cat | Dog
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type Animal = Cat | Dog;

type Res = LookUp<Animal, 'dog'>

```
## Reference

- [/type-challenges-solutions](https://github.com/ghaiklor/type-challenges-solutions)