sourcecode表示解析后的代码

成员：

text：源码

ast：ast

lines：代码行



方法：

getText: 获取node的代码

getComments: 获取节点comments

getFirstToken(node): 获取node的第一个token

getLastToken(node): 获取node的最后一个token

getTokenAfter(node | token)