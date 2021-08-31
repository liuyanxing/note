### Promise

#### js_new_promise_capability

创建promise的函数

##### 参数：

ctx: JSContext *

Resolving_funcs: JSValue *  // resolve reject函数指针

Ctor: JSValueConst  // 未知

##### 流程

- 调用js_promise_executor_new生成一个新的executor，executor是一个c函数对象，上面包含了reslove和reject
- 如果ctor是undefined则调用js_promise_constructor返回一个promise
- 否则调用JS_CallConstructor返回一个promise
- 设置第二个参数resolving_funcs



#### js_promise_constructor

promise构造函数

##### 参数：

ctx

new_target                  // JS_UNDEFINED

int argc                         // 参数个数

JSValueConst *argv    // 参数地址

##### 数据结构

```c
typedef struct JSPromiseData {
    JSPromiseStateEnum promise_state;
    /* 0=fulfill, 1=reject, list of JSPromiseReactionData.link */
    struct list_head promise_reactions[2];
    BOOL is_handled; /* Note: only useful to debug */
    JSValue promise_result;
} JSPromiseData;

typedef struct JSPromiseFunctionDataResolved {
    int ref_count;
    BOOL already_resolved;
} JSPromiseFunctionDataResolved;

typedef struct JSPromiseFunctionData {
    JSValue promise;
    JSPromiseFunctionDataResolved *presolved;
} JSPromiseFunctionData;

typedef struct JSPromiseReactionData {
    struct list_head link; /* not used in promise_reaction_job */
    JSValue resolving_funcs[2];
    JSValue handler;
} JSPromiseReactionData;


```

##### 流程

- 调用js_create_from_ctor创建一个promise object
- 分配一个JSPromiseData结构体并初始化
- 创建resolve和reject对象，并把对象赋给通过参数传入的exector
- 返回创建的promise object



### then函数调用

#### js_promise_then

执行promise.then方法，返回一个promise对象

##### 参数

ctx

JSValueConst this_val    // this 对象，一个promise

int argc                            // 参数个数

JSValueConst *argv       // 参数地址

##### 流程

- 根据传入promise的构造函数构造一个新的promise对象
- 调用perform_promise_then方法，将promise的reslvo和rejecet传入
- 返回promise



#### perform_promise_then







