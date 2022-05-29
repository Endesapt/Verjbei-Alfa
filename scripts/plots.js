'use strict'
function recreateFunctionText(function_text)
{
    function_text=function_text.replace(/,/g,';')
    function_text=function_text.replace(/ /g,'')
    function_text=function_text.replace(/.*y=/gm,'');
    //function_text=function_text.replace(/([(?:\w\d\.|x)]+?)\^(?:[\d\.|x)]+)/gm,'Math.pow($1,$2)');
    function_text=function_text.replace(/((?:[^\+\-\*\/+]+)|(?:\([\d\w\.\+\-\*\/]+\)))\^((?:\([\d\w\.\+\-\*\/]+\))|(?:-*[^\+\-\*\/+]+))/gm,'Math.pow($1,$2)');
    function_text=function_text.replace(/sqrt\((.+?)\)/gm,'Math.sqrt($1)');
    function_text=function_text.replace(/sin\((.+?)\)/gm,'Math.sin($1)');
    function_text=function_text.replace(/cos\((.+?)\)/gm,'Math.cos($1)');
    function_text=function_text.replace(/tan\((.+?)\)/gm,'Math.tan($1)');
    function_text=function_text.replace(/cot\((.+?)\)/gm,'(1/Math.tan($1))');
    function_text=function_text.replace(/(\d)x/gm,'$1*x');
    function_text=function_text.replace(/(\d|x)\(/g,'$1*(')
    function_text=function_text.replace(/\)(\d|x)/g,')*$1')
    console.log(function_text);
    return function_text
}
function makePlotFromFunction(function_text){
    //проверка является ли это функцией
    if(!/(^| )y=/.test(function_text))return undefined;
    try {
        
        function_text=recreateFunctionText( function_text);
        //
        let function_text_arr=[...function_text.matchAll(/(.+?)(?:;|$)/gm)];
        let canvas=document.createElement('canvas');
        let ctx=canvas.getContext('2d');
        canvas.width=300;
        canvas.height=300;
        ctx.rotate(-Math.PI/2 );
        ctx.font='7px Verdana '
        /*система координат приведена к нижнему углу, только
        есть одна проблема- x и y поменялись местами*/
        //fillRect(y+offset,x,height,width);
        console.log(function_text_arr);
        let yoffset=-300;
        ctx.beginPath();
        //отрисовка координатной плоскости
        ctx.moveTo(0+yoffset,150)
        ctx.lineTo(300+yoffset,150)
        ctx.moveTo(150+yoffset,0);
        ctx.lineTo(150+yoffset,300);
        ctx.rotate(Math.PI/2 );
        for(let i=0;i<16;i++){
            ctx.fillText(`${i-8}`,152,-i*20+307);
        }
        for(let i=0;i<16;i++){
            ctx.fillText(`${i-8}`,i*20-8,146);
        }
        ctx.rotate(-Math.PI/2 );
        ctx.stroke();
        //начало отрисовки графика
       
        yoffset=-150;
        let xoffset=150;
        let x=-10;
        function_text_arr.forEach(function(function_text){
            let y=eval(function_text[1].replace(/x/g,x));
            let y1;
            ctx.moveTo(y*20+yoffset,x*20);
            for(let x=-8;x<8;x+=0.06){
                y1=y;
                y=eval(function_text[1].replace(/x/g,x));
                
                if(isNaN(y1) ||Math.abs(y1-y)>100 ){
                    
                    ctx.moveTo(y*20+yoffset,x*20+xoffset);
                }
                if(y>100 || y<-100)continue;
                ctx.lineTo(y*20+yoffset,x*20+xoffset);
            }
            
        });
        

        ctx.stroke();
        
        
        return ctx.getImageData(0,0,canvas.width,canvas.height);
    } 
    catch (err) {
        console.log(err);
         return undefined;
    }
}