### JSValue

#### tag

```
    /* all tags with a reference count are negative */
    JS_TAG_FIRST       = -10, /* first negative tag */
    JS_TAG_BIG_INT     = -10,
    JS_TAG_BIG_FLOAT   = -9,
    JS_TAG_SYMBOL      = -8,
    JS_TAG_STRING      = -7,
    JS_TAG_SHAPE       = -6, /* used internally during GC */
    JS_TAG_ASYNC_FUNCTION = -5, /* used internally during GC */
    JS_TAG_VAR_REF     = -4, /* used internally during GC */
    JS_TAG_MODULE      = -3, /* used internally */
    JS_TAG_FUNCTION_BYTECODE = -2, /* used internally */
    JS_TAG_OBJECT      = -1,

    JS_TAG_INT         = 0,
    JS_TAG_BOOL        = 1,
    JS_TAG_NULL        = 2,
    JS_TAG_UNDEFINED   = 3,
    JS_TAG_UNINITIALIZED = 4,
    JS_TAG_CATCH_OFFSET = 5,
    JS_TAG_EXCEPTION   = 6,
    JS_TAG_FLOAT64     = 7,
    /* any larger tag is FLOAT64 if JS_NAN_BOXING */
```

