//======================================================================================
function fun(n,o) {
    console.log(o);
        return {
         fun:function(m){
           return fun(m,n);
         }
    };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);		    // undefined 0 0 0 
var b = fun(0).fun(1).fun(2).fun(3);				    // undefined 0 1 2
var c = fun(0).fun(1); c.fun(2); c.fun(3);			    // undefined 0 1 1

//======================================================================================
function fun(n,o) {
    console.log(o);
        return {
         fun:function(m){
           return fun(m,n);
         }
    };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);		    // undefined 0 0 0 

//fun(0)调用时候等同于
function fun(n,o) {
    var n=0;
    var o;
     console.log(o)  //undefined
         return {
          fun:function(m){
            return fun(m,n);  //---> n 就获取到fun里面的n为0的值。然后调用一次fun就会出现下面函数显示。
          }
     };
}

//a.fun(1)调用时候等同于fun(1,0)
function fun(n,o) {
    var n=1;
    var o=0;
     console.log(o)  //1
         return {
          fun:function(m){
            return fun(m,n);  //---> n 就获取到fun里面的n为0的值。
          }
     };
}

//======================================================================================