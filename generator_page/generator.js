localStorage.clear();
function setGenerator(id){
    document.getElementById('generator_div').style.display='block';
    localStorage.setItem('generateProblem',id);
}