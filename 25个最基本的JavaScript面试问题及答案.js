/*
 * @Author: ChenCong 
 * @Date: 2018-03-27 19:36:08 
 * @Last Modified by: ChenCong
 * @Last Modified time: 2018-04-03 18:56:02
 */

//转载自：http://www.codeceo.com/25-essential-javascript-interview-questions.html

//======================================================================================
//1. 使用 typeof bar === "object" 来确定 bar 是否是对象的潜在陷阱是什么？如何避免这个陷阱？

/**
 * 尽管 typeof bar === "object" 是检查 bar 是否对象的可靠方法，令人惊讶的是在 Javascript 中 null 也是对象！
 * 因此，令大多数开发人员惊讶的是，下面的代码将输出 true （而不是false）到控制台：
 */
var bar = null;
console.log(typeof bar === "object"); //true

/**
 * 只要清楚这一点，同时检查 bar 是否为 null，就可以很容易地避免问题：
 */
console.log((bar !== null) && (typeof bar === "object")); //false

/**
 * 要答全问题，还要其他两件事情值得注意：
 * 首先，上述解决方案将返回 false，当 bar 是一个函数的时候。在大多数情况下，这是期望行为，但当你也想对函数返回
 * true 的话，你可以修改上面的解决方案为：
 */
console.log((bar !== null) && ((typeof bar === "object") || (typeof bar === "function")));

/**
 * 第二，上诉解决方案将返回 true ，当 bar 是一个数组（例如，当 var bar = [];）的时候。在大多数情况下，这是期望行为，
 * 因为数组是真正的对象，但当你也想对数组返回 false 时，你可以修改上面的解决方案为：
 */
console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]"));
/**
 * 或者，如果你使用 jQuery 的话：
 */
console.log((bar !== null) && (typeof bar === "object") && (! $.isArray(bar)));

//======================================================================================
//2. 下面的代码将输出什么到控制台，为什么？

(function() {
    var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

/**
 * 由于 a 和 b 都定义在函数的封闭范围内，并且都始于 var 关键字，大多数 JavaScript 开发人员期望 typeof a 和 typeof b 在
 * 上面的例子中都是 undefined。
 * 然而，事实并非如此。这里的问题是，大多数开发人员将语句 var a = b = 3; 错误的认为是以下声明的简写：
 */

 var b = 3;
 var a = 3;
 
/**
 * 但事实上， var a = b = 3; 实际是以下声明的简写：
 */

  b = 3;
  var a = b;

/**
 * 因此（如果你不使用严格模式的话），该代码段的输出是：
 * 
 * a defined? false
 * b defined? true
 * 
 * 但是，b 如何才能被定义在封闭函数的范围之外呢？是的，既然语句 var a = b = 3; 是语句 b = 3; 和 var a = b; 的简写，
 * b 最终成为了一个全局变量（因为它没有前缀 var 关键字），因此仍然在范围内甚至函数之外。
 * 需要注意的是，在严格模式下（即使用 use strict），语句 var a = b = 3; 将生成 ReferenceError: b is not defined 的
 * 运行时错误，从而避免任何否则可能会导致的 headfakes /bug。（还是你为什么理所当然地在代码中使用 use strict 的最好例子！）
 */

//======================================================================================
//3. 下面的代码将输出什么到控制台 

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func: this.foo = " + this.foo);
        console.log("outer func: self.foo = " + self.foo);
        (function() {
            console.log("inner func: this.foo = " + this.foo);
            console.log("inner func: self.foo = " + self.foo);
        }());
    }
};
myObject.func();

/**
 * 上面的代码将输出一下内容到控制台：
 *      outer func: this.foo = bar
 *      outer func: self.foo = bar
 *      inner func: this.foo = undefined
 *      inner func: self.foo = bar
 * 
 * 在外部函数中，this 和 self 两者都指向了 myObject ，因此两者都可以正确地引用和访问 foo 。
 * 在内部函数中，this 不再指向 myObject 。其结果是， this.foo 没有在内部函数中被定义，相反，
 * 指向到本地的变量 self 保持在范围内，并且可以访问。（在 ECMA 5 之前，在内部函数中的 this 将
 * 指向全局的 window 对象；反之，因为作为 ECMA 5，内部函数中的功能 this 是未定义的）。 
 * */

//======================================================================================
//4. 封装 JavaScript 源文件的全部内容到一个函数块有什么意义及理由？ 

/**
 * 这是一个越来越普遍的做法，被许多流行的 JavaScript 库（jQuery，Node.js等）采用。
 * 这种技术创建了一个围绕文件全部内容的闭包，也许是最重要的是，创建了一个私有的命名空间，
 * 从而有助于避免不同 JavaScript 模块和库之间潜在的命名冲突。
 * 
 * 这种技术的另一个特点是，允许一个易于引用的（假设更短的）别名用于全局变量。这通常用于，例如，
 * jQuery 插件中。jQuery 允许你使用 jQuery.noConflict() ，来禁用 $ 引用到 jQuery 命名空间。
 * 在完成这项工作之后，你的代码依然可以使用 $ 利用这种闭包技术，如下所示：
 * 
 * (function($) { jQuery plugin code referencing $ })(jQuery);
 */

//======================================================================================
 //5. JavaScript 源文件的开头包含 use strict 有什么意义和好处？

 /**
  * 对于这个问题，既简要又最重要的答案是，use strict 是一种在 JavaScript 代码运行时自动实行严格解析和
  * 错误处理的方法。那些被忽略或默默失败了的代码错误，会产生错误或抛出异常。通常而言，这是一个很好的做法。
  * 
  * 严格模式的一些的一些主要优点包括：
  *     (1) 使调试更加容易。那些被忽略或默默失败了的代码错误，会产生错误或抛出异常，因此尽早提醒你代码中的
  *         问题，你才能更快地指引到他们的源代码。
  *     (2) 防止意外的全局变量。如果没有严格模式，将值分配给一个未声明变量会自动创建该名称的全局变量。
  *         这是 JavaScript 中最常见的错误之一。在严格模式下，这样做的话会抛出错误。
  *     (3) 消除 this 强制。如果没有严格模式，引用 null 或未定义的值到 this 值会自动强制到全局变量。
  *         这可能会导致许多令人头痛的问题和让人恨不得拔自己头发的 bug。在严格模式下，引用 null 或未定义的
  *         this 值会抛出错误。
  *     (4) 不允许重复的属性名称或参数值。当检测到对象（例如，var object = { foo： "bar", foo: "baz"};）
  *         中重复命名的属性，或检测到函数中（例如，function foo(val1, val2, val1){}）重复命名的参数时，
  *         严格模式会抛出错误，因此捕捉几乎可以肯定是代码中的 bug 可以避免浪费大量的跟踪时间。
  *     (5) 使 eval() 更安全。在严格模式和非严格模式下，变量和声明在 eval() 语句内部的函数不会在包含范围内
  *         创建（它们会在非严格模式下的包含范围中被创建，这也是一个常见的问题源）。 
  *     (6) 在 delete 使用无效时抛出错误。delete 操作符（用于从对象中删除属性）不能用在对象不可配置的属性
  *         上。当试图删除一个不可配置的属性时，非严格代码将默默地失败，而严格模式将在这样的情况下抛出异常。
  */

//======================================================================================
//6. 考虑以下两个函数，它们会返回相同的东西吗？为什么相同或为什么不相同？

    function foo1() {
        return {
            bar: "hello"
        };
    }

    function foo2() {
        return 
        {
            bar: "hello"
        };
    }

/**
 * 出乎意料的是，这两个函数返回的内容并不相同。更确切地说是：
 *  console.log("foo1 returns");
 *  console.log(foo1());
 *  console.log("foo2 returns");
 *  console.log(foo2());
 * 将产生：
 *  foo1 returns:
 *  Object {bar: "hello"}
 *  foo2 returns:
 *  undefined
 * 
 * 这不仅令人惊讶，而且特别让人困惑的是，foo2() 返回 undefined 却没有任何错误抛出。
 * 
 * 原因与这样一个事实有关，即分号在 JavaScript 是一个可选项（尽管省略它们通常是非常糟糕的形式）。其结果就是，
 * 当碰到 foo2() 中包含 return 语句的代码行（代码行上没有其他任何代码），分号会立即自动插入到返回语句之后。
 * 
 * 也不会抛出错误，因为代码的其余部分是完全有效的，即使它没有得到调用或做任何事情（相当于它就是一个未使用的代码块，
 * 定义了等同于字符串 "hello" 的属性 bar）。
 * 
 * 这种行为也支持放置左括号于 JavaScript 代码行的末尾，而不是新代码行开头的约定。正如这里所示，这部仅仅只是 JavaScript 
 * 中的一个风格偏好。
 * 
 * */ 

//======================================================================================
//7. NaN是什么？它的类型是什么？你如何可靠地测试一个值是否等于NaN？

/**
 * NaN属性代表一个“不是数字”的值。这个特殊的值是因为运算符不能执行而导致的，不能执行的原因要么是因为其中的运算对象之一
 * 非数字（例如，“abc”/4），要么是因为运算的结果非数字（例如，除数为零）。
 * 
 * 虽然这看上去很简单，但 NaN 有一些令人惊讶的特点，如果你不知道它们的话，可能会导致令人头痛的 bug。
 * 
 * 首先，虽然 NaN 意味着“不是数字”，但它们的类型不管你信不信，是 Number：
 *      console.log(typeof NaN === "number");   //log "true"
 * 此外，NaN 和任何东西比较，甚至是它自己本身！，结果为 false ：
 *      console.log(NaN === NaN);  // log "false"
 * 一种半可靠的方法来测试一个数字是否等于 NaN，是使用内置函数 isNaN() ,但即使使用 isNaN() 依然并非是一个完美的解决方案。
 * 一个更好的解决办法是使用 value !== value ，如果值等于 NaN，只会产生 true。另外，ES6 提供了一个新的 Number.isNaN() 函数，
 * 这是一个不同的函数，并且比老的全局 isNaN() 函数更可靠。 
 */

//======================================================================================
//7. 下面代码将输出什么？并解释原因。

    console.log(0.1 + 0.2);  //0.30000000000000004
    console.log(0.1 + 0.2 == 0.3); //false

/**
 * 一个稍微有点编程基础的回答是：“你不能确定。可能会输出 “0.3” 和 “true”，也可能不会。JavaScript 中的数字和浮点精度的处理
 * 相同，因此，可能不会总是产生预期的结果。”以上所提供的例子就是一个演示了这个问题的典型例子。可以用两数相减的绝对值小于一个
 * 很小的数来判断相等。例如：
 */
    console.log(Math.abs(0.1 + 0.2 - 0.3) <　0.0000001); //true