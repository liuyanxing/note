### ArrayBuffer

工厂函数：js_array_buffer_constructor3



### JSArrayBuffer

```c
typedef struct JSArrayBuffer {
    int byte_length; /* 0 if detached */
    uint8_t detached;
    uint8_t shared; /* if shared, the array buffer cannot be detached */
    uint8_t *data; /* NULL if detached */
    struct list_head array_list;
    void *opaque;
    JSFreeArrayBufferDataFunc *free_func;
} JSArrayBuffer;
```

