import pyodbc
import numpy

server = 'DBSED3646.ms.ds.uhc.com'
database = 'SQUAD_DB'
driver= '{ODBC Driver 13 for SQL Server}'
#username = 'your_username'
#password = 'your_password'
cnxn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;') #;UID='+username+';PWD='+ password#
print('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;')
cursor = cnxn.cursor()

# Testing the ability to fetch data from the database 
cursor.execute("SELECT * FROM Patient_Information")
row = cursor.fetchone()
while row:
    print str(row[0]) + ":" + str(row[1])
    row = cursor.fetchone()

# Testing the script to put data into the database
with cursor.execute("INSERT INTO Patient_Information VALUES ('Daniel', 'Wu', 'M', 1)"):
    print("Successful insertion")

cnxn.commit()

# Testing to see if the function actually returns the data inputed above
cursor.execute("SELECT * FROM Patient_Information")
row = cursor.fetchone()
while row:
    print str(row[0]) + ":" + str(row[1])
    row = cursor.fetchone()