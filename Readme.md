# [type-challenge](https://github.com/type-challenges/type-challenges) Solutions


## Note

1. Conditional types in TypeScript are distributive over unions. So when we write T extends Some<T> where T is a union, what TypeScript does is actually take each element from the union T and apply condition to it.

2. 如何判断一个类似是any， 可用利用any的特性，any extends string 可以在得到两个结果,如果可以得到true | false 也就是 boolean。当然也可以不同string， 比如number

```ts
type IsAny<T> = boolean extends (T extends string ? true : false) ? true : false;

```

## Reference

- [/type-challenges-solutions](https://github.com/ghaiklor/type-challenges-solutions)