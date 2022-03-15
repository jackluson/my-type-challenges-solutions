# [type-challenge](https://github.com/type-challenges/type-challenges) Solutions

## Reference

- [/type-challenges-solutions](https://github.com/ghaiklor/type-challenges-solutions)

## Note

1. Conditional types in TypeScript are distributive over unions. So when we write T extends Some<T> where T is a union, what TypeScript does is actually take each element from the union T and apply condition to it.
