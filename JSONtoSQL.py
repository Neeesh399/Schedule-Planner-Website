#This file takes the information pertaining to NJIT courses (stored in a .txt file)
#and sorts it into a SQL table

import json
import mysql.connector

f = open("")

db = mysql.connector.connect(host='', user='', passwd='', db='' )

data_as_string = f.read()
occurences_section = data_as_string.count('"SECTION": ')
num_of_courses = data_as_string.count('"INSTRUCTORUCID"')
#print(occurences_section)

cursor = db.cursor()

initial = 0 #The initial position will always be 0


for each in range(occurences_section):
    initial = (data_as_string.find('"SECTION": ', initial, -1) + 1)
    
    begining = data_as_string.rfind("COURSE", 0, initial)
    end = data_as_string.find("}", initial, -1)
    temp_string = data_as_string[begining:end]
    
    begining_course = temp_string.rfind("COURSE", 0, initial)
    end_course = temp_string.find('",', begining_course,-1) 
    course = temp_string[(begining_course+10):end_course] #First variable, course
    print(course+ " ")

    begining_crn = temp_string.find("CALLNR")
    crn = temp_string[(begining_crn+10):(begining_crn+15)] #Second variable, section
    print(crn+ " ")

    begining_days = temp_string.find("MTG_DAYS") #Third variable, days
    end_days = temp_string.rfind('"')
    if begining_days == -1:
        days = "None"
    else:
        days = temp_string[(begining_days+12):(end_days)]
    print(days+ " ")

    begining_startTime = temp_string.find("START_TIME")
    if begining_days == -1:
        startTime = "None"
    else:
        startTime = temp_string[(begining_startTime+14):(begining_startTime+18)] #Fourth variable, start time
    print(startTime+ " ")

    begining_endTime = temp_string.find("END_TIME")
    if begining_days == -1:
        endTime = "None"
    else:
        endTime = temp_string[(begining_endTime+12):(begining_endTime+16)] #Fifth variable, end time
    print(endTime+ " ")
    
    begining_section = temp_string.find("SECTION")
    section = temp_string[(begining_section+11):(begining_section+14)] #Sixth variable, section
    print(section+ "\n")

    add_class = ("INSERT INTO scheduleInfo " "(course, crn, day, start, end, section) " "VALUES (%s, %s, %s, %s, %s, %s)") #This needs an sql query
    data_class = (course, crn, days, startTime, endTime, section)

    cursor.execute(add_class, data_class)

    db.commit()

cursor.close()
db.close()

