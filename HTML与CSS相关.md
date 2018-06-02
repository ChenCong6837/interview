# CSS和HTML相关的知识

## 1.重排和重绘

* **重排：** 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算。这被称为重排，注意这里至少会有一次重排——初始化页面布局。
* **重绘：** 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新。这样的更新被称为重绘。

**什么情况下会触发重排和重绘：**

* 添加、删除、更新DOM节点
* 通过display:none隐藏一个DOM节点，触发重排和重绘
* 通过visibility:hidden隐藏一个DOM节点，只触发重绘，因为没有发生几何变化
* 移动或者给页面中的DOM节点添加动画
* 添加一个样式表，调整样式属性
* 用户行为，例如调整窗口大小，改变字号，或者滚动

## 2.页面导入样式时，使用link和@import的区别

1. link属于XHTML标签，除了加载CSS以外，还能用于定义RSS，定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS；
2. 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完后再加载。
3. import是CSS2.1提出的，只在IE5以上才被识别，而link是XHTML标签，无兼容问题。

## 3.Doctype的作用，标准模式和兼容模式的区别

1. `<!DOCTYPE>`声明位于HTML文档中的第一行，处于`<html>`标签之前，告知浏览器的解析器以什么文档标准来解析这个文档。
2. 标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老浏览器的行为以防止站点无法工作。

## 4.HTML语义化的理解

一句话总结：**用正确的标签做正确的事情**。

1. HTML语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析。
2. 即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。
3. 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，有利于SEO。
4. 是阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。 

## 5.Label的作用是什么，怎么用

&emsp;&emsp;Label标签用来定义表单控制间的关系，当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。
```html
<label for='Name'>Number;</label>
<input type='text' name='Name' id='Name'/>
<label>Date:<input type='text' name='B'></label>
```

## 6.position的值以及定位原点

**absolute**

&emsp;&emsp;生成绝对定位的元素。相对于值不为static的第一个父元素进行定位。

**fixed**

&emsp;&emsp;生成绝对定位的元素，固定定位。相对于浏览器窗口进行定位。

**relative**

&emsp;&emsp;生成相对定位的元素。相对于其正常位置进行定位。

**static**

&emsp;&emsp;默认值。没有定位，元素出现在正常流中。

**inherit**

&emsp;&emsp;从父元素继承position的值。

## 7.超链接样式设置顺序

&emsp;&emsp;被点击访问过的超链接不再具有hover和active样式，解决方法是改变CSS属性的排列顺序：<font color=red>**L-V-H-A**</font>: a:link{}, a:visited{}, a:hover{}, a:active{}。

## 8. ::before和:after中双冒号和单冒号有什么区别及它们的作用

&emsp;&emsp;单冒号（:）用于**CSS3伪类**，双冒号（::）用于**CSS3伪元素**。（伪元素由双冒号和伪元素名称组成）。
&emsp;&emsp;双冒号是在当前规范中引入的，用于区分伪类和伪元素。不过浏览器需要同时支持旧的已经存在的伪元素写法，比如：:first-line、:first-letter、:before、:after等，而新的在CSS3中引入的伪元素则不允许再支持旧的单冒号的写法。
&emsp;&emsp;想让插入的内容出现在其他内容前，使用::before，否则，使用::after；在代码顺序上，::after生成的内容也比::before生成的内容靠后。如果按堆栈视角，::after生成的内容会在::before生成的内容之上。

## 9.设置元素浮动后，该元素的display值

&emsp;&emsp;自动变成了<font color=red>**display:block**</font>。

## 10.CSS选择符有哪些，哪些属性可以继承

1. **!important**选择器。
2. **id选择器（#myid）**
3. **类选择器（.myclassname）**
4. **标签选择器（div, h1, p）**
5. **相邻选择器（h1+p）**
6. **子选择器（ul>li）**
7. **后代选择器（li a）**
8. **通配符选择器（*）**
9. **属性选择器（a[rel='external']）**
10. **伪类选择器（a:hover， li:nth-child）**
 
 **可继承的样式：** font-size、font-family、color、ul、li、dl、dd、dt;

 **不可继承的样式：** border、padding、margin、width、height。