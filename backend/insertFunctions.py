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
        nfc_status_id_row = cursor.execute("SELECT * FROM NFC_Status WHERE nfc_status_id = " + str(nfc_status_id))
        if(nfc_status_id_row.fetchall() > 0):
            with cursor.execute("INSERT INTO NFC_Bracelet VALUES ("+ str(nfc_status_id) + ")"):
                print("Successful insertion into NFC Braclet")

        else:
            print("Error: Foreign Key does not exist for this entry in table NFC_Status")
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
        person_type_id_row = cursor.execute("SELECT * FROM Person_Type WHERE person_type_id = " + str(person_type_id))
        if(person_type_id_row.fetchall() > 0):
            if(isinstance(patient_gender,str)):
                with cursor.execute("INSERT INTO Patient_Information VALUES ('"+ patient_first_name+"','"+ patient_last_name+"','"+ patient_gender +"',"+ str(person_type_id)+")"):
                    print("Successful insertion into Patient_Information")

            elif(patient_gender == None):
                with cursor.execute("INSERT INTO Patient_Information VALUES ('"+ patient_first_name+"','"+ patient_last_name+"','',"+ str(person_type_id)+")"):
                    print("Successful insertion into Patient_Information")
            else:
                print("ERROR: patient_gender has to be a string or null")
        else: 
            print("ERROR: Foreign Key for person_type_id does not exist")
    else:
        print("ERROR: Invalid argument type")


def insert_Provider_Information(provider_first_name, provider_last_name, gender, username, password, person_type_id, provider_status):
    if(isinstance(provider_first_name,str) and isinstance(provider_last_name,str) and isinstance(username,str) and isinstance(password,str) and isinstance(person_type_id,int) and isinstance(provider_status,str)):
        person_type_id_row = cursor.execute("SELECT * FROM Person_Type WHERE person_type_id = " + str(person_type_id))
        if(person_type_id_row.fetchall() > 0):
            if(isinstance(gender,str)):
                with cursor.execute("INSERT INTO Provider_Information VALUES ('"+ provider_first_name +"','"+ provider_last_name +"', '"+ gender +"', '"+ username +"', '"+ password +"',"+ str(person_type_id) +", '"+ provider_status+"')"):
                    print("Sucessful insertion into Provider_Information")
            elif(gender == None):
                with cursor.execute("INSERT INTO Provider_Information VALUES ('"+ provider_first_name +"','"+ provider_last_name +"', '', '"+ username +"', '"+ password +"',"+ str(person_type_id) +", '"+ provider_status+"')"):
                    print("Sucessful insertion into Provider_Information")
            else: 
                print("ERROR: Gender has to be null or a string")
        else: 
            print("ERROR: Foreign Key for person_type_id does not match the values in Person_Type")
    else: 
        print("ERROR: invalid argument type")


def insert_ActivatedNFC_Provider( provider_id,room_id,nfc_id):
    if(isinstance(provider_id,int) and isinstance(nfc_id,int)):
        if(room_id == None):
            room_id = 0
            room_id_row = 1
        else: 
            room_id_row = cursor.execute("SELECT * FROM Room WHERE room_id =" + room_id)
        provider_id_row = cursor.execute("SELECT * FROM Provider_Information WHERE provider_id =" + provider_id)
        nfc_id_row = cursor.execute("SELECT * FROM NFC_Bracelet WHERE nfc_id =" + nfc_id)

        if(room_id_row.fetchall() > 0 and provider_id_row.fetchall() > 0 and nfc_id_row.fetchall() > 0):   
            with cursor.execute("INSERT INTO ActivatedNFC_Provider VALUES ('"+ str(provider_id) +"','"+ str(room_id) +"','"+ str(nfc_id) +"')"):
                print("Successful insertion into ActivatedNFC_Provider")
    else:
        print("ERROR: Invalid Argument Types")

#inserting into the Question database
def insert_Question(question):
    
    #check if the question is a string and is not
    if isinstance(question,str) and question != None:           
        with cursor.execute("INSERT INTO Question VALUES ('" + question + "')" ):
            print "successful insertion to Question table"


#inserting into the Action_performed database
def insert_Survey_Activity(patient_id, rating, rating_date, question_id):
    if(patient_id != None and rating != None  and question_id != None and rating_date != None ):
        #all value need to be int, except rating date, which needs to be a string formatted in datetime
        #date needs to be in format of YYYY-MM-DD
        if isinstance(patient_id, int) and isinstance(rating, int) and isinstance(question_id, int) and isinstance(rating_date,str):
            # make sure the foreign key for patient_id and question_id exists
            row_patient_id= cursor.execute("SELECT * FROM Patient_Information WHERE patient_id="+str(patient_id))
            row_question_id= cursor.execute("SELECT * FROM Question WHERE question_id="+str(question_id))
            if row_patient_id != None:   
                if row_question_id != None:
                    
                    with cursor.execute("INSERT INTO Survey_Activity (patient_id, rating, rating_date, question_id) VALUES (" + str(patient_id) +","+str(rating)+",'"+rating_date  +"',"+ str(question_id)+")"):
                       
                        print "successful insertion to Survey Activity table"
                else:
                    "Unsuccessful insertion into Survey Activity table. Make sure the question exists"
            else:
                print "Unsuccessful insertion into Survey Activity table. Make sure the patient exists"
                
                
        else:
            print "Unsuccessful insertion into Survey Activity table. One of the values was not correct type"
    else:
        print "Unsuccessful insertion into Survey Activity table. One of the values was null"


#insert into action_performed table
def insert_Action_Performed(action_id, action_date, patient_id, room_id, time_taken, provider_id):
       #date needs to be in format of YYYY-MM-DD
    
    #check if the values are of the correct type. For nullable values, check if they are either null or correct value
    if(isinstance(action_id,int) and isinstance(action_date, str) and (patient_id ==None or isinstance(patient_id, int)) and (room_id ==None or isinstance (room_id,int)) and (provider_id == None or isinstance(provider_id, int))):
         #check if the non-nullable values are null
        if(action_id!=None or action_date !=None or time_taken != None):
            provider_id_count=0
            patient_id_count=0
            room_id_count=0
            final_room_id= room_id
            final_patient_id= patient_id
            final_provider_id= provider_id
             # if a value is null, set it to an empty string
            if room_id==None:
                final_room_id="''"
                room_id_count=1
                
            else:
                row_room_id= cursor.execute("SELECT * FROM Room WHERE room_id="+str(room_id))
                room_id_count= len(row_room_id.fetchall())
            if patient_id==None:
                final_patient_id="''"
                patient_id_count=0
            else:
                row_patient_id= cursor.execute("SELECT * FROM Patient_Information WHERE patient_id="+str(patient_id))
                patient_id_count= len(row_patient_id.fetchall())
            if provider_id==None:
                final_provider_id="''"
                provider_id_count=0
            else:
                row_provider_id= cursor.execute("SELECT * FROM Provider_Information WHERE provider_id="+str(provider_id))
                provider_id_count= len(row_provider_id.fetchall())
            if provider_id_count>0 and patient_id_count>0 and room_id_count>0:
        
                #execute insert query            
                with cursor.execute("INSERT INTO Action_Performed (action_id, action_date, room_id, patient_id, time_taken, provider_id) VALUES (" + str(action_id)+ ",'" +action_date+"',"+ str(final_room_id)+","+str(final_patient_id)+","+str(time_taken)+","+str(final_provider_id)+")"):
                    print ("successful insertion to Action Performed table")
            else: 
                print("Unsuccessful insertion into Action Performed table. Check all foreign keys")
        else:
            print("Unsuccessful insertion into Action Performed table. One of the values was null")
    else:
        print ("Unsuccessful insertion into Action Performed table. One of the values was not correct type")

def insert_Activated_NFC_Patient( patient_id, room_id, appointment_id, nfc_id):
    
    #check if the values are of the correct type. For nullable values, check if they are either null or correct value
    if(isinstance(patient_id,int) and (isinstance(room_id,int) or room_id==None ) and isinstance(appointment_id,int) and isinstance(nfc_id,int) ):
        #check if the non-nullable values are null
        if( patient_id!= None and appointment_id!= None and nfc_id != None):
            final_room_id= room_id
            room_id_count=0
            
            if room_id== None:
                final_room_id= "''"
                room_id_count=1
            else:
                row_patient_id= cursor.execute("SELECT * FROM Room WHERE room_id="+str(room_id))
                room_id_count= len(row_patient_id.fetchall())
            
            patient_id_count= len(cursor.execute("SELECT * FROM Patient_Information WHERE patient_id="+str(patient_id)).fetchall())
            appointment_id_count= len(cursor.execute("SELECT * FROM Appointment_Type WHERE appointment_id="+str(appointment_id)).fetchall())
            nfc_id_count= len(cursor.execute("SELECT * FROM NFC_Bracelets WHERE nfc_id="+str(nfc_id)).fetchall())
            
            if(room_id_count>0 and patient_id_count>0 and appointment_id_count>0 and nfc_id_count>0):
                
            #execute insert query
                with cursor.execute("INSERT INTO Activated_NFC_Patient (patient_id, room_id, appointment_id, nfc_id) VALUES ("+ str(patient_id)+","+ str(room_id)+","+ str(appointment_id)+","+str(nfc_id)+")"):
                    print ("successful insertion to Activated NFC Patient table")
            else:
                print("Unsuccessful insertion to Activated FNC Patient table. Check all foreign keys")
        else:
            print("Unsuccessful insertion into Action Performed table. One of the values was null")
    else:
        print ("Unsuccessful insertion into Action Performed table. One of the values was not correct type")
         