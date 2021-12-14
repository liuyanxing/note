/*
*  typescript类型转换可以看作是集合的运算
*  等价于函数式编程
*/

// 常见集合运算
type AB = 'a' | 'b';
type ABC = 'a' | 'b' | 'c';
type BCD = 'b' | 'c' | 'd';
type DEF = 'd' | 'e' | 'f';

// 并集
type Union<T, U> = T | U;
type ABCDEF = Union<ABC, DEF>

// 交集
type Intersect<T, U> = T extends U ? T : never;
type BC = Intersect<ABC, BCD>

// 差集
type C = Exclude<ABC, AB>;

// 子集判断 A extends B ? A是否是B的子集, 如果A是集合，那么就会对A的每个元素进行extends操作
type Subset<T, U> = (U extends T ? true : false) extends true ? true : false;
type S = Subset<ABC, AB>; 
type NS = Subset<ABC, BCD>;

type MyPick<T, U extends keyof T> = { [ P in U ]: T[P] };
type MyReadOnly<T> = { readonly [P in keyof T]: T[P] }
type TypeToObject<T extends any[]> = { [P in T[number]]: T[P]}


type MyReadOnly2<T, U extends keyof T> = T & { readonly [p in U]: T[p] };

type DeepOnly<T> = { readonly [P in keyof T]: T[P] extends {} ? DeepOnly<T[P]> : T[P]}

type TupleToUnion<T> = T extends (infer U)[] ? U : never;

type LastElement<T extends any[]> = T extends [...unknown[], infer U] ? U : never; 

type Pop<T extends any[]> = T extends [...infer K, infer U] ? K : never;

declare function PromiseAll<T extends unknown[]>(params: T): {
  [Index in keyof T]: T[Index] extends Promise<infer U> ? U : T[Index];
}
PromiseAll([1, Promise.resolve(2)]);

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type LookUp<T, K> = T extends { 'type': K } ? T : never;

type PickByType<T, K> = { [ p in keyof T as K extends T[p] ? p : never]: T[p] };

type GreatetThan<T extends number, K extends number, U extends any[] = []> = U['length'] extends T ? false :  U['length'] extends K ? true : GreatetThan<T, K, [1, ...U]>;

type G = GreatetThan<1, 2>;

type BuildArray<T extends number, K extends any[] = []> = K['length'] extends T ? K : BuildArray<T, [1, ...K]>;
type Sum<T extends number, K extends number> = [...BuildArray<T>, ...BuildArray<K>]['length'];
type Su = Sum<1, 2>;
