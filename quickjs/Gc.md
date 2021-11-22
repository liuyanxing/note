Gc

对象初始化在JS_NewObjectFromShape函数中，初始化完成后调用add_gc_object函数将JSValue的Object

加入gc链表中，gc链表挂在runtime的gc_obj_list上

JS_RunGC函数进行垃圾回收

```
 /* decrement the reference of the children of each object. mark =
       1 after this pass. */
 		gc_decref(rt);

    /* keep the GC objects with a non zero refcount and their childs */
    gc_scan(rt);

    /* free the GC objects in a cycle */
    gc_free_cycles(rt);
```

