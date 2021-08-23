#This file takes the information pertaining to NJIT courses (stored in a .txt file)
#and sorts it into a SQL table

from njit_schedule4 import parse_jsonp, CourseSchedule
from njit_schedule4Helper import Course2, SingleClass
import json
import mysql.connector
import requests

db = mysql.connector.connect(host='', user='', passwd='', db='')

cursor = db.cursor()

def get_schedule(term_id: str = ""):
    url = f"https://uisnetpr01.njit.edu/courseschedule/alltitlecourselist.aspx?term={term_id}"
    return CourseSchedule.from_dict(parse_jsonp(requests.get(url).content))


allData = get_schedule('''202190''')
for i in allData.courses:
    course = Course2(str(i))
    for ii in range(1, len(course.getClasses())):
        aClass = SingleClass(course.getClasses()[ii])

        print(aClass.subjectId + " " + aClass.crn + " " + aClass.instructionMethod + " " + aClass.days + " " + aClass.startTime + " " + aClass.endTime + " " + aClass.sectionId + " " + aClass.instructor + " " + aClass.building + " " + aClass.roomNum)
        
        add_class = ("INSERT INTO scheduleInfoFall2021 " "(course, crn, instructionMethod, day, start, end, section, instructor, building, room) " "VALUE (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        data_class = (aClass.subjectId, aClass.crn, aClass.instructionMethod, aClass.days, aClass.startTime, aClass.endTime, aClass.sectionId, aClass.instructor, aClass.building, aClass.roomNum)

        cursor.execute(add_class, data_class)

        db.commit()
        


cursor.close()
db.close()

