'use strict'
localStorage.clear();
function sendRequest(){
    localStorage.setItem('toServer',document.getElementById('equation_input').value);
}
document.onkeyup=function(e){
    if(e.code=='Enter'){
       sendRequest();
    }
}
window.addEventListener('storage',function(event){
    if(event.key=='toClient'){
        if(document.getElementById('answer_div')){
            document.getElementById('insert_answer').removeChild(document.getElementById('answer_div'));
        }
        let answer=JSON.parse(localStorage.getItem('toClient'));
        switch(answer.id){
            case 1:createMortgageAndLoansAnswerDiv(answer.answer);break;
            case 2:createCurrenciesAnswerDiv(answer.answer);break;
            case 3:createPlotAnswerDiv(answer.answer);break;
            case 4:createMathAnswerDiv(answer.answer);break;
            case 5:createUnitsAndMeasuresAnswerDiv(answer.answer);break;
            default:createErrorDiv();
        }
    }
});

//разные способы добавления блока с ответом
function createMortgageAndLoansAnswerDiv(answer){

    let main_div=document.createElement('div');
    main_div.id='answer_div';

    let input_div=document.createElement('div')
    input_div.innerHTML='Интерпретация ввода';

    let input_answer=document.createElement('div');
    //1-fixed mortgage 2-mortgage 3-interest
    let info=answer[1];
    if(answer[0]==2 || answer[0]==1){
        input_answer.innerHTML+=`<table>
        <tr><td>Сумма займа</td><td>${info.interest_info[1]}</td></tr>
        <tr><td>Время выплачивания долга(в годах)</td><td>${info.interest_info[2]}</td></tr>
        <tr><td>Годовой процент</td><td>${info.interest_info[3]}%</td></tr>
        </table>`;
    }else{
        input_answer.innerHTML+=`<table>
        <tr><td>Сумма вкалада</td><td>${info.interest_info[1]}</td></tr>
        <tr><td>Время нахождения вклада(в годах)</td><td>${info.interest_info[2]}</td></tr>
        <tr><td>Процент прироста</td><td>${info.interest_info[3]}%</td></tr>
        </table>`; 
    }
    let answer_div=document.createElement('div');
    answer_div.innerHTML=(answer[0]==1 || answer[0]==2) ?'Информация о кредите':'Информация о вкладе';
    
    let answer_solution=document.createElement('div');
    let answer_table=document.createElement('table');
    if(answer[0]==1 || answer[0]==2){
        answer_table.innerHTML+=`
        <tr><td>Всего переплат</td><td>${info.total_payment}</td></tr>
        <tr><td>Переплата</td><td>${info.overpayment}</td></tr>
        <tr><td>Месчный платеж</td><td>${info.month_payment}</td></tr>
        `
    }else{
        answer_table.innerHTML+=`
        <tr><td>Итоговое кол-во денег</td><td>${info.future_rate}</td></tr>
        <tr><td>Итоговая прибыль</td><td>${info.income}</td></tr>
        `
    }
    answer_solution.appendChild(answer_table);
    //

    main_div.appendChild(input_div);
    main_div.appendChild(input_answer);
    main_div.appendChild(answer_div);
    main_div.appendChild(answer_solution);
    document.getElementById('insert_answer').appendChild(main_div);
}
function createCurrenciesAnswerDiv(answer){
    let main_div=document.createElement('div');
    main_div.id='answer_div';

    let input_div=document.createElement('div')
    input_div.innerHTML='Интерпретация ввода';

    let input_answer=document.createElement('div');
    input_answer.innerHTML=document.getElementById('equation_input').value;

    let answer_div=document.createElement('div');
    if(answer[0]==1){
        answer_div.innerHTML='Перевод в другие популярные валюты';
    }else{
        answer_div.innerHTML='Сравнение двух валют';
    }
    let answer_solution=document.createElement('div');
    let answer_table=document.createElement('table');
    let table_str=''
    if(answer[0]==1){
        let arr=answer[2];
        let founded_curr=answer[1];
        table_str+=`<tr> 
        <td rowspan="${arr.length*2}">${founded_curr[2]} ${founded_curr[0]}${founded_curr[2]==1 ? '':'s'}</td>
        <td>${(founded_curr[1]/arr[0].Cur_OfficialRate*founded_curr[2]).toFixed(5)} ${arr[0].Cur_Abbreviation} </td>
        </tr>`
        for(let i=1;i<arr.length;i++){
            table_str+=`<tr>
            <td>${(founded_curr[1]/arr[i].Cur_OfficialRate*founded_curr[2]).toFixed(5)} ${arr[i].Cur_Abbreviation}</td>
            <tr>`
        }
    }else{
        table_str+=`<tr>
        <td>${answer[1][2]} ${answer[1][0]} / ${answer[2][2]} ${answer[2][0]} = ${(answer[1][2]*answer[1][1]/(answer[2][1]*answer[2][2])).toFixed(5)}</td>
        </tr>`
    }
    answer_table.innerHTML+=table_str;
    answer_solution.appendChild(answer_table);
    //

    main_div.appendChild(input_div);
    main_div.appendChild(input_answer);
    main_div.appendChild(answer_div);
    main_div.appendChild(answer_solution);
    document.getElementById('insert_answer').appendChild(main_div);

}
function createPlotAnswerDiv(answer){
    let main_div=document.createElement('div');
    main_div.id='answer_div';

    let input_div=document.createElement('div')
    input_div.innerHTML='Ввод';
   
    let input_answer=document.createElement('div');
    input_answer.innerHTML=document.getElementById('equation_input').value;

    let answer_div=document.createElement('div');
    answer_div.innerHTML='График';

    let answer_solution=document.createElement('div');
    let canvas=document.createElement('canvas');
    answer_solution.appendChild(canvas);
    main_div.appendChild(input_div);
    main_div.appendChild(input_answer);
    main_div.appendChild(answer_div);
    main_div.appendChild(answer_solution);

    let ctx=canvas.getContext('2d');
    canvas.width=300;
    canvas.height=300;
    const imageData = ctx.createImageData(300,300);
    for(let i=0;i<imageData.data.length;i++){
        imageData.data[i]=answer.data[i];
    }


    ctx.putImageData(imageData,0,0);
    
    
  
    

    
    document.getElementById('insert_answer').appendChild(main_div);

}
function createMathAnswerDiv(answer){
    
    let main_div=document.createElement('div');
    main_div.id='answer_div';
    let input_div=document.createElement('div')
    input_div.innerHTML='Ввод';
   
    let input_answer=document.createElement('div');
    input_answer.innerHTML=answer[0];
    
    let answer_div=document.createElement('div');
    answer_div.innerHTML='Решение';

    let answer_solution=document.createElement('div');
    answer_solution.innerHTML=`x = ${answer[1]}`;

    main_div.appendChild(input_div);
    main_div.appendChild(input_answer);
    main_div.appendChild(answer_div);
    main_div.appendChild(answer_solution);
    document.getElementById('insert_answer').appendChild(main_div);

}
function createUnitsAndMeasuresAnswerDiv(answers){
    let answer=answers[1];
    let main_div=document.createElement('div');
    main_div.id='answer_div';

    let input_div=document.createElement('div')
    input_div.innerHTML='Интерпретация ввода';

    let input_answer=document.createElement('div');
    input_answer.innerHTML=answer.input_text;

    let answer_div=document.createElement('div');
    answer_div.innerHTML='Перевод в другие единицы измерения';
     
    // oh no, cringe
    let answer_solution=document.createElement('div');
    let answer_table=document.createElement('table');
    let table_str=''
    if(answers[0]==1){
        
        table_str+=`<tr> 
        <td rowspan="${answer.arr.length*2}">${answer.element_count} ${answer.arr[answer.element_index][0]}</td>
        <td>${answer.element_count*answer.arr[0][1]/answer.arr[answer.element_index][1]} ${answer.arr[0][0]} </td>
        </tr>`
        for(let i=1;i<answer.arr.length;i++){
            table_str+=`<tr>
            <td>${answer.element_count*answer.arr[i][1]/answer.arr[answer.element_index][1]} ${answer.arr[i][0]}</td>
            <tr>`
        }
    }else if(answers[0]==2) {
        if(answer.element_count[1]>1){
            console.log(answer.element_count[0]*answer.arr[answer.element_index[0]][1]+' '+answer.element_count[1]*answer.arr[answer.element_index[1]][1])
            table_str+=`<tr>
            <td>${answer.element_count[0]} ${answer.arr[answer.element_index[0]][0]}/${answer.element_count[1]} ${answer.arr[answer.element_index[1]][0]}</td>
            <td>${(answer.element_count[0]*answer.arr[answer.element_index[1]][1])/(answer.element_count[1]*answer.arr[answer.element_index[0]][1])} </td>
            </tr>`
        }else{
            
            table_str+=`<tr>
            <td>${answer.element_count[0]} ${answer.arr[answer.element_index[0]][0]}</td>
            <td>${answer.element_count[0]*answer.arr[answer.element_index[1]][1]/answer.arr[answer.element_index[0]][1]} ${answer.arr[answer.element_index[1]][0]}</td>
            </tr>`
        }
            
        
    }
    answer_table.innerHTML+=table_str;
    answer_solution.appendChild(answer_table);
    //

    main_div.appendChild(input_div);
    main_div.appendChild(input_answer);
    main_div.appendChild(answer_div);
    main_div.appendChild(answer_solution);
    document.getElementById('insert_answer').appendChild(main_div);




}
function createErrorDiv(){
    let main_div=document.createElement('div');
    main_div.id='answer_div';
    let input_div=document.createElement('div')
    input_div.innerHTML='Интерпретация ввода';
    let input_answer=document.createElement('div');
    input_answer.innerHTML='Ты глупый';
    let answer_div=document.createElement('div');
    answer_div.innerHTML='Че делать то?';
    let answer_solution=document.createElement('div');
    answer_solution.innerHTML=`Если ты не умеешь нормально вводить запросы, то посмотри примеры правильного ввода по сслыкам ниже, ну а если баг, то сорян гг`;

    main_div.appendChild(input_div);
    main_div.appendChild(input_answer);
    main_div.appendChild(answer_div);
    main_div.appendChild(answer_solution);
    document.getElementById('insert_answer').appendChild(main_div);
}
