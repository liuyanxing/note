什么是spy

spy是一个函数，用来记录调用函数的参数，返回值，this和异常

创建一个作为匿名函数的spy

```javascript
describe("PubSub", function () {
    it("should call subscribers on publish", function () {
        const callback = sinon.spy();

        PubSub.subscribe("message", callback);
        PubSub.publishSync("message");

        assertTrue(callback.called);
    });
});
```

这种spy函数不会做任何事，只会记录函数的调用情况



用spy wrap一个对象所有的方法

```javascript
require("@fatso83/mini-mocha").install();

const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;

// This is just an example of an external library you might require()
const myExternalLibrary = {
    getJSON(url) {
        return this._doNetworkCall({ url: url, dataType: "json" });
    },
    _doNetworkCall(httpParams) {
        console.log("Simulating fetching stuff from the network: ", httpParams);
        return { result: 42 };
    },
};

describe("Wrap all object methods", function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        sandbox.spy(myExternalLibrary);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should inspect the external lib's usage of its internal methods", function () {
        const url = "https://jsonplaceholder.typicode.com/todos/1";
        myExternalLibrary.getJSON(url);

        assert(myExternalLibrary.getJSON.calledOnce);
        assert(myExternalLibrary._doNetworkCall.calledOnce);
        assert.equals(
            url,
            myExternalLibrary._doNetworkCall.getCall(0).args[0].url
        );
        assert.equals(
            "json",
            myExternalLibrary._doNetworkCall.getCall(0).args[0].dataType
        );
    });
});
```



用spy wrap一个已经存在的方法

sinon.spy(object, "method")，创建的spy和原函数行为一致，可以用作构造函数

```javascript
require("@fatso83/mini-mocha").install();

const sinon = require("sinon");
const referee = require("@sinonjs/referee");
const assert = referee.assert;
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
const window = new JSDOM().window;
const document = new JSDOM("").window;
const jQuery = require("jquery")(window);
global.document = document;

describe("Wrap existing method", function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        sandbox.spy(jQuery, "ajax");
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should inspect jQuery.getJSON's usage of jQuery.ajax", function () {
        const url = "https://jsonplaceholder.typicode.com/todos/1";
        jQuery.getJSON(url);

        assert(jQuery.ajax.calledOnce);
        assert.equals(url, jQuery.ajax.getCall(0).args[0].url);
        assert.equals("json", jQuery.ajax.getCall(0).args[0].dataType);
    });
});
```



Wrap getter和setter sinon.spy(object, "property", ["get", "set"])

```javascript
var object = {
  get test() {
    return this.property;
  },
  set test(value) {
    this.property = value * 2;
  },
};
var spy = sinon.spy(object, "test", ["get", "set"]);
object.test = 42;
assert(spy.set.calledOnce);
assert.equals(object.test, 84);
assert(spy.get.calledOnce);
```

