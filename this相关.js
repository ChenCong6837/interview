//======================================================================================
var names = "A";
var obj = {
    names:"B",
    showName:function(){
        console.log(this.names);
    },
    returnName:function(){
        return this.names;
    },
    returnFunctionName:function(){
        return function(){
            console.log(this.names);
        }
    }
}
obj.showName();                                     //输出什么？   "B"
obj.returnName();                                   //输出什么？   "B"
obj.returnFunctionName()();                         //输出什么？   "A"
obj.showName.call(names);                           //输出什么？   undefined
obj.returnName.call(names);                         //输出什么？   undefined
obj.returnFunctionName().call(names)                //输出什么？   undefined
var newObj = obj.returnFunctionName().bind(window);
newObj.call(obj)                                    //输出什么？   "A"
//为什么最后一个输出"A"？因为bind指向this对象后  再一次调用的话  this指向不会被改变

//======================================================================================
var big = "A";

var obj = {
    big:"B",
    showBig:function(){
        return this.big;
    }
}
obj.showBig.call(big);          //ƒ big() { [native code] }

//======================================================================================
function a(a,b,c){
    console.log(this.length);                 //4
    console.log(this.callee.length);          //1
}

function fn(d){
    arguments[0](10,20,30,40,50);
}

fn(a,10,20,30);


//第一个输出结果:因为this当前指向的是arguments 。 arguments是一个伪数组具备length属性。arguments又是保存函数的实参。
//fn调用的时候传入4个实参。所以arguments长度为4。这个时候arguments[0] 等同于 arguments.a调用这个函数。
//所以this指向的是arguments这个伪数组也是(对象)

//第二个输出结果：callee是arguments的一个属性,主要返回当前arguments直属的函数体。所以this.callees是返回fn 。
//每一个函数有一个length属性主要用来返回函数的形参的所以就是1。

//======================================================================================