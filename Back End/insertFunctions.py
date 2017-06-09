import pyodbc
import numpy
import random, string


# This establishes a connection to the database, and creates an object for sending queries 
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
        if(isinstance(appointment_duration,int)):
            with cursor.execute("INSERT INTO Appointment_Type VALUES ('"+ appointment_name + "', "+ str(appointment_duration) + ")"):
                print("Successful insertion")
        elif(appointment_duration == None): 
            with cursor.execute("INSERT INTO Appointment_Type VALUES ('"+ appointment_name + "', '')"):
                print("Successful insertion")
        else:
            print("Appointment duration has to be an int or null")
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
    else:
        print("nfc_status_name has to be a string")


# This function takes in NFC status Id as an argument and creates a new row into the NFC Bracelts table
def insert_NFC_Bracelet(nfc_status_id):
    if(isinstance(nfc_status_id, int)):
        with cursor.execute("INSERT INTO NFC_Bracelet VALUES ("+ str(nfc_status_id) + ")"):
            print("Successful insertion into NFC Braclet")
    else:
        print("nfc_status_id cannot be null")


# This funciton takes in room name as an argument and then creates a new row in the table room
def insert_Room(room_name, room_status):
    if(isinstance(room_name,str) and isinstance(room_status,str)):
        with cursor.execute("INSERT INTO Room VALUES ('" + room_name + "','"+ room_status +"')"):
            print("Sucessful insertion into Room")
    else:
        print("room_name has to be a string")


# This function takes in arguments and inserts a new row into the table Actions 
# Actions 
def insert_Actions(action_name, flag_color, button_label, action_duration, action_status, icon):
    if(isinstance(action_name,str) and isinstance(flag_color,str) and isinstance(button_label,str) and isinstance(action_duration, int) and isinstance(action_status, str)):
        if(isinstance(icon,str)):
            with cursor.execute("INSERT INTO Actions VALUES ('"+ action_name +"', '"+ flag_color +"', '"+ button_label +"', "+ str(action_duration)+",'"+ action_status +"','"+ icon +"')"):
                print("Successful insertion into Action")

        elif(icon == None):
            with cursor.execute("INSERT INTO Actions VALUES ('"+ action_name +"', '"+ flag_color +"', '"+ button_label +"', "+ str(action_duration)+",'"+ action_status +"','')"):
                print("Successful insertion into Action")
        else:
            print("Icon has to be null or a string ")
    else: 
        print("Invaid Arguments types")


# This function takes in arguments and inserts a new row into the table Person_Type 
def insert_Person_Type(person_type_name):
    if(isinstance(person_type_name,str)):
        with cursor.execute("SELECT * FROM Person_Type"):
            foo = cursor.fetchall()
            isUnique = True
            for row in foo:
                if person_type_name == row[1]:
                    isUnique = False
                    break
            if(isUnique):
                with cursor.execute("INSERT INTO Person_Type VALUES ('"+ person_type_name.lower() +"')"):
                    print("Successful insertion into Person_Type")
            else:
                print("ERROR: person_type_name has to be unique")

    else:
        print("person_type_name needs to be a string")


def insert_Patient_Information(patient_first_name, patient_last_name, patient_gender,person_type_id):
    if(isinstance(patient_first_name,str) and isinstance(patient_last_name,str) and isinstance(person_type_id,int)):
        if(isinstance(patient_gender,str)):
            with cursor.execute("INSERT INTO Patient_Information VALUES ('"+ patient_first_name+"','"+ patient_last_name+"','"+ patient_gender +"',"+ str(person_type_id)+")"):
                print("Successful insertion into Patient_Information")

        elif(patient_gender == None):
            with cursor.execute("INSERT INTO Patient_Information VALUES ('"+ patient_first_name+"','"+ patient_last_name+"','',"+ str(person_type_id)+")"):
                print("Successful insertion into Patient_Information")
        else:
            print("ERROR: patient_gender has to be a string or null")
    else:
        print("ERROR: Invalid argument type")

def insert_Provider_Information(provider_first_name, provider_last_name, gender, username, password, person_type_id, provider_status):
    if(isinstance(provider_first_name,str) and isinstance(provider_last_name,str) and isinstance(username,str) and isinstance(password,str) and isinstance(person_type_id,int) and isinstance(provider_status,str)):
        if(isinstance(gender,str)):
            with cursor.execute("INSERT INTO Provider_Information VALUES ('"+ provider_first_name +"','"+ provider_last_name +"', '"+ gender +"', '"+ username +"', '"+ password +"',"+ str(person_type_id) +", '"+ provider_status+"')"):
                print("Sucessful insertion into Provider_Information")
        elif(gender == None):
            with cursor.execute("INSERT INTO Provider_Information VALUES ('"+ provider_first_name +"','"+ provider_last_name +"', '', '"+ username +"', '"+ password +"',"+ str(person_type_id) +", '"+ provider_status+"')"):
                print("Sucessful insertion into Provider_Information")
        else: 
            print("ERROR: Gender has to be null or a string")

    else: 
        print("ERROR: invalid argument type")

def insert_ActivatedNFC_Provider(person_type_id, provider_id,room_id,nfc_id):
    if(isinstance(person_type_id,int) and isinstance(provider_id,int) and isinstance(room_id,int) and isinstance(nfc_id,int)):
        if(room_id == None):
            room_id = ''
        with cursor.execute("INSERT INTO ActivatedNFC_Provider VALUES ("+ str(person_type_id)+","+ str(provider_id)+","+ str(room_id)+","+ str(nfc_id)+",)"):
            print("Successful insertion into ActivatedNFC_Provider")





# Testing the function that we are writing above 
#def randomword(length):
#   return ''.join(random.choice(string.lowercase) for i in range(length))

insert_Provider_Information("Dr. Grey", "Anatomy",None,"username","password",8,'active')
#insert_ActivatedNFC_Provider(,)