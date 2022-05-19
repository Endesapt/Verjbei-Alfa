document.addEventListener('keydown',function(event){
    if(event.code=='Enter'){
        if(question_count<5)checkAnswer();
    }
})
let question_count=5;
localStorage.clear();
window.addEventListener('storage',getRequest);
function setGenerator(id){
    localStorage.clear();
    document.getElementById('generator_div').classList.remove('show_generator');
    localStorage.setItem('generateProblem',id);   
}
function getRequest(event){
    if(event.key=='toGenerator'){
        console.log(JSON.parse(localStorage.getItem('toGenerator')));
        startQuiz();

    }
}
//чтобы не кликали раньше времени
function startQuiz(){
    question_count=0;
    for(let i=0;i<5;i++){
        document.getElementById('answers_count').children[i].classList.remove('red','green')
    }
    document.getElementById('generator_div').classList.add('show_generator');
    document.getElementById('input_button').addEventListener('click',checkAnswer);
    setQuestion();
}
function setQuestion(){
    let problem_set=JSON.parse(localStorage.getItem('toGenerator'));
    document.getElementById('question_number').innerText=`Вопрос ${question_count+1}`;
    document.getElementById('question_text').innerText=`${problem_set[question_count][0]}`;
}
function checkAnswer(){
    let problem_set=JSON.parse(localStorage.getItem('toGenerator'));
    //действия над глупыми надписями пользователя чтобы попытатся вычленить ответ
    let iscorrect=true;
    let answer=document.getElementById('answer_input').value;
    let regexp;
    if(Array.isArray(problem_set[question_count][1])){
        for(let i=0;i<problem_set[question_count][1].length;i++){
            regexp=new RegExp(`(?:[^\\d\-\/^*]|^)${problem_set[question_count][1][i]}(?:[^\\d\-\/^*]|$)`);
            if(!regexp.test(answer)){iscorrect=false;break;};
        }
    }else{
        regexp=new RegExp(`(?:[^\\d*\-\/^*]|^)${problem_set[question_count][1]}(?:[^\\d*\-\/^*]|$)`);
        if(!regexp.test(answer)){iscorrect=false;};
    }
    if(iscorrect){
        document.getElementById('answers_count').children[question_count].classList.add('green');
    }
    else{
        document.getElementById('answers_count').children[question_count].classList.add('red');
    }
    document.getElementById('answer_input').value='';
    question_count++;
    if(question_count>4){
        document.getElementById('input_button').removeEventListener('click',checkAnswer);
        return;
    }
    setQuestion();
}
