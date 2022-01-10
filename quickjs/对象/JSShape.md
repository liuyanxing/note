### JSShapeProperty

```ts
struct JSShape {
    uint32_t prop_hash_end[0]; /* hash table of size hash_mask + 1
                                  before the start of the structure. */
    JSRefCountHeader header; /* must come first, 32-bit */
    JSGCHeader gc_header; /* must come after JSRefCountHeader, 8-bit */
    /* true if the shape is inserted in the shape hash table. If not,
       JSShape.hash is not valid */
    uint8_t is_hashed;
    /* If true, the shape may have small array index properties 'n' with 0
       <= n <= 2^31-1. If false, the shape is guaranteed not to have
       small array index properties */
    uint8_t has_small_array_index;
    uint32_t hash; /* current hash value */
    uint32_t prop_hash_mask;
    int prop_size; /* allocated properties */
    int prop_count;
    JSShape *shape_hash_next; /* in JSRuntime.shape_hash[h] list */
    JSObject *proto;  // 原型对象，查找属性时沿着proto查找
    JSShapeProperty prop[0]; /* prop_size elements */
};
```

JSShape表示一个object的形状，一个object的形状包括object的属性和其原型对象