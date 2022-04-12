'use strict'
let operation_priority={
  ')':-1,
  '(':-1,
  '+':0,
  '-':0,
  '*':1,
  '/':1,
}
function solveStringEquation(equation_text){
  equation_text=equation_text.replace(/ /g,'');
  let output_arr=[];
  let operation_arr=[];
  for(let i=0;i<equation_text.length;i++){
    let str=equation_text.substring(i);
    let num=str.match(/^\((-\d+\.?\d*)\)/);
    if(!num){
      num=str.match(/^\d+\.?\d*/)}
    else{
      output_arr.push(parseFloat(num[1]));i+=num[0].length-1;
      continue;
    };
    if(!num){//если перед числом есть символ, то обрабатываем символ
      if(0<operation_arr.length){
        if(equation_text[i]=='('){
          operation_arr.push(equation_text[i]);
        }else if(equation_text[i]==')'){
          output_arr=output_arr.concat(operation_arr.slice(operation_arr.lastIndexOf('(')+1).reverse());
          operation_arr=operation_arr.slice(0,operation_arr.lastIndexOf('('));
        } else if(operation_priority[equation_text[i]]>operation_priority[operation_arr[operation_arr.length-1]]){
          operation_arr.push(equation_text[i]);
        }else{
          output_arr.push(operation_arr[operation_arr.length-1]);
          operation_arr[operation_arr.length-1]=equation_text[i];
        }
      }else{
        operation_arr.push(equation_text[i]);  
      }    
    }else{
      output_arr.push(parseFloat(num));i+=num[0].length-1;
    }
      
  }
  output_arr=output_arr.concat(operation_arr.reverse());
  //конец преобразований в обратную польскую 
  //начало вычислений
  for(let i=0;i<output_arr.length;i++){
    if('+-*/'.includes(output_arr[i])){
      let answr;
      switch(output_arr[i]){
          case'+':answr=Number(output_arr[i-1])+Number(output_arr[i-2]);break;
          case'-':
          if(isNaN(parseFloat(output_arr[i-2]))){
            output_arr[i-1]*=-1;
            output_arr.splice(i,1);
            
            continue;
          }
          answr=Number(output_arr[i-2])-Number(output_arr[i-1]);break;
          case'*':answr=Number(output_arr[i-1])*Number(output_arr[i-2]);break;
          case'/':answr=Number(output_arr[i-2])/Number(output_arr[i-1]);break;
      }
      output_arr[i-2]=answr;
      output_arr.splice(i-1,2);
      i-=2;
    }
  }
  return output_arr[0];
  
}
function sortEquationByX(equation_text){
  let sorted_x=['0','0','0','0'];
  let index_of_equal=equation_text.indexOf('=');
  if(/[^\d\x\=\+\-\*\/\(\)\^.]/.test(equation_text))return undefined;
  if(index_of_equal==-1){
    sorted_x[0]=solveStringEquation(equation_text);
    return [sorted_x[0],0,0,0];
  }
  let x_equations;
  //сортируем по степени до знака =
  x_equations=[...equation_text.substring(0,index_of_equal).matchAll(/([\+-](?:\([\d+\+\-\*\/]+\)|[\*\d]+))x\^(\d+)/gm)];//очень важно, находит (3+2)x^2->[...,(3+2),2(степень)];
  for(let i=0;i<x_equations.length;i++){
    sorted_x[x_equations[i][2]]+=x_equations[i][1];
  }  sorted_x[0]+=equation_text.substring(0,index_of_equal).replace(/([\+-](?:\([\d+\+\-\*\/]+\)|\d+))x\^(\d+)/gm,'');

  //сортируем по степени после знака =
  x_equations=[...equation_text.substring(index_of_equal+1).matchAll(/([\+-](?:\([\d+\+\-\*\/]+\)|\d+))x\^(\d+)/gm)];//очень важно, находит (3+2)x^2->[...,(3+2),2(степень)];
  for(let i=0;i<x_equations.length;i++){
    sorted_x[x_equations[i][2]]+=`-(0${x_equations[i][1]})`;
  }  
  sorted_x[0]+=`-(${equation_text.substring(index_of_equal+1).replace(/([\+-](?:\([\d+\+\-\*\/]+\)|\d+))x\^(\d+)/gm,'')})`;
  //преобразуем выражения в числа с помощью нашей функции
  for (let i in sorted_x) {
    sorted_x[i]=solveStringEquation(sorted_x[i]);
  }
  
  return sorted_x;
  
}
function reworkEquationString(equation_text){
  //обрабатываем строку от неправильного ввода
  //костыль с нулями для правильного вычисления
  equation_text='0+'+equation_text;
  equation_text=equation_text.replace(/=/,'=0+');
  //
  equation_text=equation_text.replace(/ /g,'');//убираем пробелы
  equation_text=equation_text.replace(/x(\d)/g,'x^$1');//добавляем сепень где это необходимо
  equation_text=equation_text.replace(/,/gm,'.');//заменяем запятые десятичного числа точками
  equation_text=equation_text.replace(/([\\\+\-\*\(])(-\d+\.?\d*)/g,'$1($2)');//ставим скобочки вокруг отрицательнх чисел
  equation_text=equation_text.replace(/^x|([-+])x/g,'$11x')//добавить елинику к единичным иксам
  equation_text=equation_text.replace(/x()$|x([+-=])/g,'x^1$2')//добавить стпени иксам 1 степени
  equation_text=equation_text.replace(/(\d)\(/g,'$1*(')
  equation_text=equation_text.replace(/\)(\d)/g,')*$1')
  equation_text=equation_text.replace(/[\*\/]x/g,'x');
  //убрать умножение перед иксами за ненадобностью
  return equation_text;
}

//релаизация решения уравнений 1 2 3 и 4 степеней
function solveEqutionBySortedX(sorted_x){
    if(sorted_x[3]!=0){
      return solve3Equation(sorted_x);
    }else if(sorted_x[2]!=0){
      return solve2GradeEquation(sorted_x);
    }else if(sorted_x[1]!=0){
      return solve1GradeEquation(sorted_x);
    }else{
      return sorted_x[0];
    }
}
function solve1GradeEquation(sorted_x){
  return (-sorted_x[0]/sorted_x[1]);
}
function solve2GradeEquation(sorted_x){
  let a=sorted_x[2],b=sorted_x[1],c=sorted_x[0];
  let d=b*b-4*a*c;
  let x1,x2;
  if(d>0){
    d=Math.sqrt(d);
    x1=((-b+d)/(2*a));
    x2=((-b-d)/(2*a));
    return [x1,x2];
  }if(d==0){
    return -(b/(2*a));
  }else{
    return 'не имеет рациональных корней';
  }
}


//


function solveMathEquation(equation_text){
  let answrs=[];
  let sorted_x;
  equation_text=reworkEquationString(equation_text);
  //приводим подобные, вычисляем их
  sorted_x=sortEquationByX(equation_text);
  if(!sorted_x)return undefined;
  //решаем уравнение на основе отсортированного массива
  answrs=solveEqutionBySortedX(sorted_x);
  return [equation_text.replace(/0\+/g,''),answrs];
  //
 
    
}
