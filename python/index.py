import csv
import json

myCsv = 'data/Adults_Drugs_2018.csv'
myJson = './data/Adults_Drugs_2018.json'

data = []
with open(myCsv) as f:
    for row in csv.DictReader(f):
        data.append(row)

json_data = json.dumps(data)

with open(myJson, "w+") as writeJSON:
    json.dump(data, writeJSON, ensure_ascii=True)

print("Done! The Html is Now a JSON FILE")
