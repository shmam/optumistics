import pyodbc
import numpy

server = 'DBSED3646.ms.ds.uhc.com'
database = 'SQUAD_DB'
driver= '{ODBC Driver 13 for SQL Server}'
#username = 'your_username'
#password = 'your_password'
cnxn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;') #;UID='+username+';PWD='+ password#
cursor = cnxn.cursor()

# This function takes in appointment name and appointment duration as arguments, and then inserts a new row into the appointment type table
def insert_Appointment_Type(appointment_name, appointment_duration):
    if(appointment_name != None and isinstance(appointment_name,str)):
        if(appointment_duration == None or isinstance(appointment_duration,int)):
            with cursor.execute("INSERT INTO Appointment_Type VALUES ('"+ appointment_name + "', "+ str(appointment_duration) + ")"):
                print("Successful insertion")
    else:
        print("ERROR: appointment name cannot be null")

# This function takes in nfc_status_name as arguments and then inserts a new row into the table of NFC Status
# it also runs a loop that check to see if the values for the insertion are unique, becuase this is a requirement for the NFC Status
# NFC Status either has to be a on or off
def insert_NFC_Status(nfc_status_name):
    if(isinstance(nfc_status_name,str)):
        with cursor.execute("SELECT * FROM NFC_Status"):
            foo = cursor.fetchall()
            isUnique = True
            for row in foo: 
                if nfc_status_name == row[1]:
                    isUnique = False
                    break
            if(isUnique):
                with cursor.execute("INSERT INTO NFC_Status VALUES('" + nfc_status_name + "')"):
                    print("Successful insertion into NFC_Status")
            else:
                print("NFC_Status has to be unique")

                



# This function takes in NFC status Id as an argument and creates a new row into the NFC Bracelts table
def insert_NFC_Bracelet(nfc_status_id):
    if(isinstance(nfc_status_id, int)):
        with cursor.execute("INSERT INTO NFC_Bracelet VALUES ("+ str(nfc_status_id) + ")"):
            print("Successful insertion into NFC Braclet")
    else:
        print("nfc_status_id cannot be null")

# 
def insert_Room(room_name):
    if(isinstance(room_name,str)):
        with cursor.execute("INSERT INTO Room VALUES ('" + room_name + "')"):
            print("Sucessful insertion into ")



# Testing the function that we are writing above 
insert_NFC_Status("on")
insert_NFC_Status("off")
insert_NFC_Status("on")

insert_NFC_Bracelets(34)
