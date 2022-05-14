'use strict'
/*формат возврата answer:
    arr[question_text<string>,answer<string>]
  все функции сделаны так, что решение всегда целочисленное, потому-что кривые числа 
  кривые(
*/

function createPlusMinusProblemSet(){
    let arr=[];
    let x,y,answer,question;
    for(let i=0;i<5;i++){
        x=Math.round(Math.random()*99+1);
        y=Math.round(Math.random()*99+1); 
        question=`${x}${'-+'[Math.round(Math.random()*1)]}${y}`;
        answer=solveMathEquation(question);
        question=question+'=?';
        arr.push([question,answer[1]]);
    }
    return arr;
}
function createMultDivProblemSet(){
    let arr=[];
    let x,y,answer,question;
    for(let i=0;i<5;i++){
        x=Math.round(Math.random()*100);
        y=Math.round(Math.random()*100); 
        question=`${x}${'+-*'.charAt(Math.round(Math.random()*2))}${y}`;
        answer=solveMathEquation(question);
        question=question+'=?';
        arr.push([question,answer[1]]);
    }
    return arr;    
}
//GCD
function gcd(a, b) {
	if (b == 0)
		return a;
	return gcd(b, a % b);
}
function createGCDandLCMProblemSet(){
    let x,y,answer,question,arr=[];
    let type;
    console.log(type);
    for(let i=0;i<5;i++){
        type=Math.round(Math.random()*2);
        x=Math.round(Math.random()*100);
        y=Math.round(Math.random()*100);
        question=`${type==1 ? 'НОД':'НОК'}(${x},${y})=?`;
        answer=type==1 ? gcd(3*x,6*y):(x*y/gcd(x,y));
        arr.push([question,answer]);

    }
    return arr;
}
function createLinearEquation(){
    //ща будут гениальнейшие методы генерации 
    //чтобы в ответе всегда было целое число
    //Разработаны мной
    let arr=[];
    let answer,question;
    let k,b,c;
    for(let i=0;i<5;i++){
        k=Math.round(Math.random()*6+1);
        b=Math.round(Math.random()*19+1)-k;
        c=k*Math.round(Math.random()*3+2)+b;
        question=`${k}x${b<0? '':'+'}${b}=${c}; x=?`;
        console.log(question);
        answer=solveMathEquation(question);
        answer[0]=answer[0].replace(/\^1/g,'');
        arr.push(answer);
    }
    return arr;

}
function createQuadraticEquation(){
    let arr=[],answer,question,x1,x2,a;
    //теорема виета имба
    for(let i=0;i<5;i++){
        a=Math.round(Math.random()*3+1);
        x1=Math.round(Math.random()*10-5);
        x2=Math.round(Math.random()*10-5);
        question=`${a==1 ? '':a}x^2${-(x1+x2)>0 ? '+':''}${(x1+x2)!=0?(-a*(x1+x2)+'x'):''}${x1*x2>0 ? '+':''}${a*x1*x2}; x=?`
        answer=x1==x2? x1:[x1,x2];
        arr.push([question,answer]);
    }
    return arr;
}