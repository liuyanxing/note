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
