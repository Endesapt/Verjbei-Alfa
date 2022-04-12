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
let dictionary_of_const=[
  ['e','элементарный заряд[Кл]',1.602176e-19],
  ['k','постоянная Больцмана[Дж/К−1]',1.380e-23],
  ['c','скорость света в вакууме[м/с]',2.99792e8 ]
]

function getUnitFromString(string,start_index = 0){
  let regexp;
  for(let i=start_index;i<dictionary_of_measures.length;i++){
    for(let j=0;j<dictionary_of_measures[i].length;j++){
      regexp=new RegExp(`(^| )${dictionary_of_measures[i][j][0]}(s?)($| )`,'i'); 
      if(regexp.test(string)){
        return [i,j];
      }
    }

  }
}   
function getConstInfo(string){
  for(let i=0;i<dictionary_of_const.length;i++){
    let regexp=new RegExp(`(^| )${dictionary_of_const[i][0]}($| )`,'i'); 
    if(regexp.test(string)){
      return i;
    }
  }
  return undefined;
}
function getUnitsAndMeasures(equation_text){
  //пытаемся найти константу
    let const_index=getConstInfo(equation_text);
    if(const_index>=0)return [2,dictionary_of_const[const_index]]; 
  //

  //нет, ну ладно
  if(equation_text.indexOf('to')!=-1){
    let temp_string=equation_text.substring(0,equation_text.indexOf('to'));
    let unit_indexes=getUnitFromString(temp_string);
    if(!unit_indexes)return  undefined;
    let first_measure=dictionary_of_measures[unit_indexes[0]][unit_indexes[1]];
    temp_string=equation_text.substring(equation_text.indexOf('to')+3);
    unit_indexes=getUnitFromString(temp_string,unit_indexes[0]);
    let second_measure=dictionary_of_measures[unit_indexes[0]][unit_indexes[1]];
    if(!unit_indexes)return  undefined;
    return [0,first_measure,second_measure];
     
  }else{
    let unit_indexes=getUnitFromString(equation_text);
    if(!unit_indexes)return  undefined;
    return [1,dictionary_of_measures[unit_indexes[0]],unit_indexes[1]];

  }

  
}