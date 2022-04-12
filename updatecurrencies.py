import requests
import json
post_arr=[{'Cur_Abbreviation':'BYN','Cur_OfficialRate':1}]
currencies=['USD','EUR','RUB','CNY','CAD','JPY','GBP']
for curr in currencies:
    response=requests.get(f'https://www.nbrb.by/api/exrates/rates/{curr}?parammode=2')
    temp=json.loads(response.text)
    temp['Cur_OfficialRate']/=temp['Cur_Scale']
    del temp['Cur_ID'],temp['Date'],temp['Cur_Name'],temp['Cur_Scale']
    post_arr.append(temp)

with open("scripts/currencies_data.js", "w") as write_file:
   write_file.write('currency_data='+json.dumps(post_arr))
print("Валюты успешно обновлены")
 
