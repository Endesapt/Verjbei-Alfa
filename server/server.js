window.addEventListener('storage',getRequest);
function getRequest(event){
    if(event.key=='toServer'){
        localStorage.setItem('toClient',JSON.stringify(solveEquation(localStorage.getItem('toServer'))));
        console.log(localStorage.getItem('toClient'))
    }else if(event.key=='generateProblem'){
        localStorage.setItem('toGenerator',JSON.stringify(generateProblem(localStorage.getItem('generateProblem'))))
        console.log(localStorage.getItem('toGenerator'))
    }
}
function generateProblem(id){
    return id;
}
function solveEquation(equation_text){
    answer={}
    if(equation_text.replace(/ /gm,'')=='')return answer;
    answer.answer=getMortgageAndLoans(equation_text);
    if(answer.answer){
        answer.id=1
        return answer;
        
    }
    answer.answer=getCurrencies(equation_text);
    if(answer.answer){
        answer.id=2;
        return answer;
        
    }
    answer.answer=makePlotFromFunction(equation_text);
    if(answer.answer){
        answer.id=3
        console.log(JSON.stringify(answer));
        return answer;
        
    }
    answer.answer=solveMathEquation(equation_text);
    if(answer.answer){
        answer.id=4
        return answer;
    
    }
    answer.answer=getUnitsAndMeasures(equation_text);
    if(answer.answer){
        answer.id=5
        return answer;
    
    }
    return answer;
}