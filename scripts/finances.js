//фуфуфу как без Node.js криво сделано(
let curencies_dict=[
    ['BYN','belarusian ruble','белорусск','belarus'],
    ['USD','dollar','американский','доллар'],
    ['EUR','euro','евро'],
    ['RUB','ruble','российский','рубль'],
    ['CNY','yuan','юан'],
    ['CAD','canadian dollar','canadian','канадский'],
    ['JPY','yen','йен'],
    ['GBP','funt','фунт','британск']

]

function getCurrenciesInfo(curr_string){
    let founded_curr=getCurrenciesTextInfo(curr_string);
    if(!founded_curr)return undefined;
    for(i of currency_data){
        if(founded_curr[0]==i.Cur_Abbreviation)return[founded_curr[1],i.Cur_OfficialRate]
    }
}
function getCurrenciesTextInfo(curr_string){
    let regexp;
    for(let i=0;i<curencies_dict.length;i++){
        for(let j=0;j<curencies_dict[i].length;j++){
            regexp=new RegExp(`${curencies_dict[i][j]}`,'i')
            if(regexp.test(curr_string)){
                return [curencies_dict[i][0],curencies_dict[i][1]];
                 
            }
        }
    }
}
function getMortgageAndLoans(equation_string){
    let interest_info=equation_string.match(/(\d+).*?(\d+).*?(\d+)%/);
    let answer={};
    answer.interest_info=interest_info;
    if(/mortgage/i.test(equation_string)){
        let loan_amount=interest_info[1],
        month_interst_rate=interest_info[3],
        number_of_payment=interest_info[2];
        
        if(/fixed/i.test(equation_string)){
            month_interst_rate=month_interst_rate/1200;
            answer.month_payment=(loan_amount*month_interst_rate/(1-Math.pow(1+month_interst_rate,-12*number_of_payment))).toFixed(2);
            answer.total_payment=(answer.month_payment*number_of_payment*12).toFixed(2);
            answer.overpayment=(answer.total_payment-loan_amount).toFixed(2);
            answer.interest_info=interest_info;
            return [1,answer];
            

        }else{
            let S=0;
            b=loan_amount/(12*number_of_payment);
            let Sn=loan_amount;
            let p=loan_amount*month_interst_rate/1200;
            Sn-=b;
            let fisrt_pay=(b+p).toFixed(2);last_pay=(b+b*month_interst_rate/1200).toFixed(2);
            for(let i=0;i<12*number_of_payment;i++){
                p=Sn*month_interst_rate/1200;
                S+=b+p;
                Sn-=b;
            }
            answer.overpayment=(S-loan_amount).toFixed(3);
            answer.total_payment=(S).toFixed(3);
            answer.month_payment=`${fisrt_pay}-${last_pay}`;
            
            return [2,answer]
        }
    }else if(/interest/i.test(equation_string)){
        let present_value=interest_info[1];
        let interest_periods=interest_info[2];
        let interest_rate=interest_info[3];
        answer.future_rate=(present_value*Math.pow(1+(interest_rate/1200),12*interest_periods)).toFixed(2);
        answer.income=(answer.future_rate-present_value).toFixed(2);
        return[3,answer];
    }
    return undefined;
}
function getCurrencies(equation_string){
 let founded_currs=[...equation_string.matchAll(/(\d*)\s?([A-zА-я]{3,})/gm)];
 if(founded_currs.length>2 || founded_currs.length==0)return undefined;
 if(founded_currs.length==1){
   let curr_info=getCurrenciesInfo(founded_currs[0][2]);
   if(!curr_info)return undefined;
   curr_info.push(founded_currs[0][1]||1);
   return [1,curr_info,currency_data];

 }else{
    let firstcurr_info=getCurrenciesInfo(founded_currs[0][2]);
    let secondcurr_info=getCurrenciesInfo(founded_currs[1][2]);
    if(!firstcurr_info||!secondcurr_info)return undefined;
    firstcurr_info.push(founded_currs[0][1]||1);
    secondcurr_info.push(founded_currs[1][1]||1);
    return [2,firstcurr_info,secondcurr_info];
 }
}