### 创建context

```c
JSContext *JS_NewContext(JSRuntime *rt)
{
    JSContext *ctx;

    ctx = JS_NewContextRaw(rt);
    if (!ctx)
        return NULL;

    JS_AddIntrinsicBaseObjects(ctx);
    JS_AddIntrinsicDate(ctx);
    JS_AddIntrinsicEval(ctx);
    JS_AddIntrinsicStringNormalize(ctx);
    JS_AddIntrinsicRegExp(ctx);
    JS_AddIntrinsicJSON(ctx);
    JS_AddIntrinsicProxy(ctx);
    JS_AddIntrinsicMapSet(ctx);
    JS_AddIntrinsicTypedArrays(ctx);
    JS_AddIntrinsicPromise(ctx);

    return ctx;
}
```

