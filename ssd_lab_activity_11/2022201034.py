import csv
data=[] 
with open('lab_11_data.csv', mode ='r') as file:
  csvFile = csv.reader(file)
  for lines in csvFile:
    data.append(lines)

dataModified = []
for i in data:
  dataModified.append(i[:-6])

headers = dataModified[0];
dataModified.pop(0)

dataNew = list(filter(lambda x:(float(x[6])>-3),dataModified)) #(ii)
dataBackUp = dataNew
for i in dataNew:
  i[1]=i[1].replace(",","")
  i[2]=i[2].replace(",","")
  i[3]=i[3].replace(",","")


n = len(dataNew)
averages=[] #(iii)
averageOpen = list(map(lambda x: float(x[1])/n, dataNew))
averageHigh = list(map(lambda x: float(x[2])/n, dataNew))
averageLow = list(map(lambda x: float(x[3])/n, dataNew))
averages.append(sum(averageOpen))
averages.append(sum(averageHigh))
averages.append(sum(averageLow))

#(iv)
ch = input("Enter starting character:")
dataStartWithCh = list(filter(lambda x:(x[0][0]==ch),dataBackUp))

f = open('stock_output.txt', 'w')
for i in dataStartWithCh:
  for j in i:
    f.write(j+" ")
  f.write("\n")
f.close()


f = open('avg_output.txt', 'w')
for i in averages:
  f.write(str(i)+"\n")
f.close()








