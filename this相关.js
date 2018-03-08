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