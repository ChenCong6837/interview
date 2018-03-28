/*
 * @Author: ChenCong 
 * @Date: 2018-03-27 19:36:08 
 * @Last Modified by: ChenCong
 * @Last Modified time: 2018-03-28 13:39:29
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
