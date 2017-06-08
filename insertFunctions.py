import pyodbc
import numpy

server = 'DBSED3646.ms.ds.uhc.com'
database = 'SQUAD_DB'
driver= '{ODBC Driver 13 for SQL Server}'
#username = 'your_username'
#password = 'your_password'
cnxn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;') #;UID='+username+';PWD='+ password#
cursor = cnxn.cursor()

def insert_Appointment_Type(appointment_name, appointment_duration):
    if(appointment_name != None):
        with cursor.execute("INSERT INTO Appointment_Type VALUES ()")
        print("Successful insertion")
    else:
        print("ERROR: appointment name cannot be null")
