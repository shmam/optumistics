'''
Created on Jun 8, 2017

@author: jhayne14

'''
import pyodbc
import datetime

server = 'DBSED3646.ms.ds.uhc.com'
database = 'SQUAD_DB'
username = 'ms\jhayne14'
password = '1238298Tdp!'
driver= '{ODBC Driver 13 for SQL Server}'
cnxn = pyodbc.connect('DRIVER='+driver+';PORT=1433;SERVER='+server+';PORT=1443;DATABASE='+database+';Trusted_Connection=yes;')
cursor = cnxn.cursor()

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
            if len(row_patient_id.fetchall())>0:   
                if len(row_question_id.fecthall)>0:
                    
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
def insert_Action_Performed(action_id, action_date, room_id, patient_id, time_taken, provider_id):
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
                row_patient_id= cursor.execute("SELECT * FROM Patient_Information WHERE room_id="+str(patient_id))
                patient_id_count= len(row_patient_id.fetchall())
            if provider_id==None:
                final_provider_id="''"
                provider_id_count=0
            else:
                row_provider_id= cursor.execute("SELECT * FROM Patient_Information WHERE room_id="+str(provider_id))
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
         
    
    
    
#insert_Question("how ar eyou")
now= datetime.datetime(2017, 5 ,5)
str_now = now.date().isoformat()
#insert_Action_Performed(6, str_now, 4, 1142, 5, 2273)

insert_Survey_Activity(1,5,str_now,5)

#insert_Activated_NFC_Patient(10, 1142, 1, 2, 4)

