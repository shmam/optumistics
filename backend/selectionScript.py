import pyodbc
import numpy
import random, string
import datetime

# This establishes a connection to the database, and creates an object for sending queries 
server = 'DBSED3646.ms.ds.uhc.com'
database = 'SQUAD_DB'
driver= '{ODBC Driver 13 for SQL Server}'
#username = 'your_username'
#password = 'your_password'
cnxn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;') #;UID='+username+';PWD='+ password#
cursor = cnxn.cursor()


# selecting the time for for each provider in Action Performed

def select_times_for_action(action_id):
    if(isinstance(action_id,int) and action_id =! null):
        return cursor.execute("SELECT time_taken FROM dbo.Action_Performed WHERE action_id = " + action_id)
    else: 
        print("action_id needs to be an int and not null")

def select_times_for_action_date(action_id,date1, date2):
    if(isinstance(action_id,int) and action_id =! null):
        return cursor.execute("SELECT time_taken FROM dbo.Action_Performed WHERE action_id = "+ action_id +" AND action_date BETWEEN " + date1 + " AND " + date2 )
    else: 
        print("action_id needs to be an int and not null")