'use strict'
let dictionary_of_measures= [
  [ 
    ['meter',1],
    ['kilometre',0.001],        
    ['centimeter',100],
    ['milimetre',1000],  
    ['micrometres',1e+6], 
    ['yard',1.09361], 
    ['foot',3.28084]
  ],[
    ['kilogram',1],
    ['tonne',0.001],
    ['gram',1000],
    ['milligram',1e+6],
    ['microgram',1e+9],
    ['imperial ton',0.000984207],
    ['US ton',0.00110231],
    ['stone',0.157473],
    ['pound',2.20462],
    ['ounce',35.274]
  ],
  [
    ['megabit',1],
    ['bit',1e+6],
    ['kilobit',1000],
    ['kilobyte',125],
    ['kibbit',976.563],
    ['megabit',0.001024],
    ['megabyte',0.125],
    ['mebibit',0.953674],
    ['gigabit',0.001],
    ['gigabyte',0.000125],
    ['terabyte',1.25e-7]
  ],
  [
    ['meters/s',1],
    ['miles/h',2.23694],
    ['foot/s',3.28084],
    ['km/h',3.6],
    ['knot',1.94384]
  ]
]
function foundMeasure(equation_text,fi=0){
  let regexp;
  for(let i=fi;i<dictionary_of_measures.length;i++){
    for(let j=0;j<dictionary_of_measures[i].length;j++){
      regexp=new RegExp(`(\s|^)${dictionary_of_measures[i][j][0]}(\s|$)`)
      if(regexp.test(equation_text)){
        alert(i+' '+j+' '+dictionary_of_measures[i][j][0])
        return {arr_index:i,element_index:j}
      }
    }
  }
}
function getUnitsAndMeasures(equation_text){
  let answer={};
  let founded_measures=[...equation_text.matchAll(/(\d*)\s*([A-я]{3,})/g)];
  
  

  if(founded_measures.length>2 || founded_measures.length==0)return undefined;
  if(founded_measures.length==1){

    
    
    let temp_measure=foundMeasure(founded_measures[0][2]);
    if(!temp_measure)return undefined;
    answer.input_text=`${founded_measures[0][1]} ${founded_measures[0][2]}`;
    answer.arr=dictionary_of_measures[temp_measure.arr_index];
    answer.element_index=temp_measure.element_index;
    answer.element_count=founded_measures[0][1]||1;
    return[1,answer];
  }else{
    let first_measure=foundMeasure(founded_measures[0][2]);
    if(!first_measure)return undefined;
    let second_measure=foundMeasure(founded_measures[1][2],founded_measures.arr_index);
    if(!second_measure)return undefined;
    answer.input_text=`${founded_measures[0][1]} ${founded_measures[0][2]} to ${founded_measures[1][1]} ${founded_measures[1][2]}`;
    answer.arr=dictionary_of_measures[first_measure.arr_index];
    answer.element_index=[first_measure.element_index,second_measure.element_index];
    answer.element_count=[founded_measures[0][1]||1,founded_measures[1][1]||1];
    return[2,answer];

  }
  
}
