import pyodbc
server = 'DBSED3646.ms.ds.uhc.com'
database = 'SQUAD_DB'
driver= '{ODBC Driver 13 for SQL Server}'

cnxn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;')
print('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;')
cursor = cnxn.cursor()
cursor.execute("SELECT * FROM Patient_Information")
row = cursor.fetchone()
while row:
    print str(row[0]) + ":" + str(row[1])
    row = cursor.fetchone()
