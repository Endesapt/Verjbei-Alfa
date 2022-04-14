'use strict'
function recreateFunctionText(function_text)
{
    function_text=function_text.replace(/,/g,';')
    function_text=function_text.replace(/.*y=/gm,'');
    function_text=function_text.replace(/([(?:\d\.|x)]+?)\^([?:\d\.|x)]+?)/gm,'Math.pow($1,$2)');
    function_text=function_text.replace(/sqrt\((.+?)\)/gm,'Math.sqrt($1)');
    function_text=function_text.replace(/sin\((.+?)\)/gm,'Math.sin($1)');
    function_text=function_text.replace(/cos\((.+?)\)/gm,'Math.cos($1)');
    function_text=function_text.replace(/tan\((.+?)\)/gm,'Math.tan($1)');
    function_text=function_text.replace(/cot\((.+?)\)/gm,'(1/Math.tan($1))');
    function_text=function_text.replace(/(\d)x/gm,'$1*x');
    function_text=function_text.replace(/(\d|x)\(/g,'$1*(')
    function_text=function_text.replace(/\)(\d|x)/g,')*$1')
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
        canvas.width=400;
        canvas.height=400;
        ctx.rotate(-Math.PI/2 );
        ctx.font='7px Verdana '
        /*система координат приведена к нижнему углу, только
        есть одна проблема- x и y поменялись местами*/
        //fillRect(y+offset,x,height,width);

        let yoffset=-400;
        ctx.beginPath();
        //отрисовка координатной плоскости
        ctx.moveTo(0+yoffset,200)
        ctx.lineTo(400+yoffset,200)
        ctx.moveTo(200+yoffset,0);
        ctx.lineTo(200+yoffset,400);
        ctx.rotate(Math.PI/2 );
        for(let i=0;i<20;i++){
            ctx.fillText(`${i-10}`,202,-i*20+398);
        }
        for(let i=0;i<20;i++){
            ctx.fillText(`${i-10}`,i*20+2,198);
        }
        ctx.rotate(-Math.PI/2 );
        //начало отрисовки графика
       
        yoffset=-200;
        let xoffset=200;
        let x=-10;
        function_text_arr.forEach(function(function_text){
            let time = performance.now();
            let y=eval(function_text[1].replace(/x/g,x));
            let y1;
            ctx.moveTo(y*20+yoffset,x*20);
            for(let x=-10;x<10;x+=0.1){
                y1=y;
                y=eval(function_text[1].replace(/x/g,x));
                if(isNaN(y1) ||Math.abs(y1-y)>40 ){
                    
                    ctx.moveTo(y*20+yoffset,x*20+xoffset);
                }
                ctx.lineTo(y*20+yoffset,x*20+xoffset);
            }
            time = performance.now() - time;
            console.log('Время выполнения = ', time);
        });
        

        ctx.stroke();
        
        
        return ctx.getImageData(0,0,canvas.width,canvas.height);
    } 
    catch (err) {
         return undefined;
    }
}