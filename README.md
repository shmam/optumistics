# IOT-REVEAL
The idea of this project is using a connected system of small microcontrollers that register clinical protocol activities with NFC bracelets, sends the data to a databse that can be called back for real time analysis. The goal that this would accomplish is giving providers the ability to augment their procedures in real time, to improve and reach a better level of efficiency. We are putting equal focus on the patient and provider experice in order to make a product that improves the overall clinical experience. 

## Architecture (as of Jun 8th 2017) 
[LINK HERE](https://docs.google.com/drawings/d/1yU5bx8NPWrrxemk3uijcvZSZAbNoPDtRd3Csm5I0-tA/edit)

[Raspberry Pi NFC Shield] -> [Python throwing SQL Query]    -> [Azure SQL Database]

[Angular Frontend] <- [Python Computing Data for Analysis]   <-  [Database Callback Query]       

## Installation 
Follow these steps to install the modules needed to communicate with the Azure SQL Databse. 
 
#### MAC OSX 
1. Download Python 3 directly from the website at [python.org/download.](https://www.python.org/download)
2. Open terminal and type `sudo easy_install pip`
3. Then, type `sudo pip install pyodbc`


#### RASPBERRY PI (RASPBIAN) [IN PROGRESS]
1. Boot up NOOBS and install Raspbian 
(Python 3 should come with the most current of Raspbian)
2. Open terminal and type `sudo easy install pip`
3. Then, type `sudo pip install pyodbc`
4. Install ODBC Driver by typing ...


## PROGRESS

✓ : Sprint 1 (Buisness model canvas and use case) 

✓ : Setup Azure hostes SQL Database [DATABASE MAP AND GUIDE HERE](https://docs.google.com/drawings/d/1bGvgUyuUlZeVZPlfvcJQgDw7W7cnx_SUfNHcNOJASa0/edit)

✓ : Connect macs and throw querys at the databse with python 
  
  : Connect the raspberry pi and throw queries to the database

  : Connect the NFC components to the RP3



