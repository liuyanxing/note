### C交互相关

#### JS_NewCFunctionData

将c函数包装成一个类型为func的JSValue func_obj并返回，func_obj的opaque上记录了

函数的指针，magic和data

##### 参数

ctx

JSCFunctionData *func   // c函数指针

int length                          // function.length  函数期望传入的参数个数

int magic                           // 未知

int data_len                      // data的长度

JSValueConst *data        // 未知

##### 重要的数据结构

```c
typedef struct JSCFunctionDataRecord {
    JSCFunctionData *func;
    uint8_t length;
    uint8_t data_len;
    uint16_t magic;
    JSValue data[0];
} JSCFunctionDataRecord;

```

##### 流程

- new一个函数的JSValue func_obj
- 分配一个JSCFunctionDataRecord结构体s，将传入的参数赋给s
- 将func_obj的opaque设置为s
- 返回func_obj



#### js_c_function_data_call

调用CFunctionData



#### js_call_c_function

##### JSCFunctionEnum

```c
typedef enum JSCFunctionEnum {  /* XXX: should rename for namespace isolation */
    JS_CFUNC_generic,
    JS_CFUNC_generic_magic,
    JS_CFUNC_constructor,
    JS_CFUNC_constructor_magic,
    JS_CFUNC_constructor_or_func,
    JS_CFUNC_constructor_or_func_magic,
    JS_CFUNC_f_f,
    JS_CFUNC_f_f_f,
    JS_CFUNC_getter,
    JS_CFUNC_setter,
    JS_CFUNC_getter_magic,
    JS_CFUNC_setter_magic,
    JS_CFUNC_iterator_next,
} JSCFunctionEnum;
```

