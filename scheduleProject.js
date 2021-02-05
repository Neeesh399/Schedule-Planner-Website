//This file is incomplete. I am trying to make it so the website stores any courses the user put into it before in Cookies
//but I have not finished that part yet. It is (mostly) complete though

var count = 1;
var url = "scheduleProjectHelper.php?crn1=";
var crnArray;
var daysArray = ["S", "M", "T", "W", "R", "F", "S"];
var pos = associateDaysNumbers(returnDate());
var close;
var running = false;
var interval;

function setCookie(cookieName, cookieVal){ //instantiates and sets new cookies
  var d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieVal + ";" + expires + ";path=/";
}

function lookForCookies(){ 
  //checks is cookies exist, have to make it so this function runs on page load, and have to make it insert the values of the cookies into
  //the bars, also should run all the JS (shouldn't be more than (a?) clever for loop)                  
  var decodedCookies = decodeURIComponent(document.cookie);
  if (decodedCookies.search("crnInput") > 0){
    return true;
  }
  else{
    return false;
  }
}

function spawnNew(){
  var nodeID = "crnInput" + count;
  var boxID = "ForContentBox" + count;
  var labelID = "label" + count;
  var node = document.getElementById("ForForm");
  
  var cloneBox = document.getElementById(boxID).cloneNode();
  var cloneLabel = document.getElementById(labelID).cloneNode();
  var cloneOther = document.getElementById(nodeID).cloneNode();
  var cloneDel = document.getElementById("delButton").cloneNode();
  
  count++;
  var nodeID = "crnInput" + count;
  var labelID = "label" + count;
  var boxID = "ForContentBox" + count;
  var br = document.createElement('br');
  cloneLabel.id = labelID;
  cloneOther.id = nodeID;
  cloneBox.id = boxID;
  
  cloneLabel.setAttribute("for", nodeID);
  cloneOther.setAttribute("name", nodeID);
  
  node.appendChild(cloneBox).appendChild(cloneDel);
  cloneBox.appendChild(br);
  cloneBox.appendChild(cloneLabel);
  cloneBox.appendChild(cloneOther);
  cloneLabel.innerHTML="Enter CRN: ";
  cloneOther.value = "";
  
  //var t = "crnInput" + (count-1);
  //var otherTempCRN = document.getElementById(t).value;
  //crnArray.push(otherTempCRN);
  //console.log(crnArray); // the only thing about this is that it will NOT append the contents of the most recent crnInput. Prob would be better to have a function that puts all available crn's into the crnArray when submit is pressed
}
function deleteOld(){
  if (count > 1){
    var bigBox = document.getElementById("ForForm");
    
    var lastNodeID = "ForContentBox" + count;
    lastNode = document.getElementById(lastNodeID);
    lastNode.remove();
    count--;
  }
}

function tallyCRNs(){
  var tempArr = [];
  for (var i=0; i<count; i++){
    var tempcrn = "crnInput" + (i+1);
    var temp = document.getElementById(tempcrn).value;
    if (checkIfValid(temp)){
      tempArr.push(temp);
      // assignment of cookies
      setCookie(tempcrn, temp);
    }
  }
  if (tempArr.length==0){
    tempArr.push("10001");
  }
  crnArray = tempArr;
}

function checkIfValid(temp){
  if (temp.length==5 && temp.match("[0-9]")){
    return true;
  }
  return false;
}

function createURL(){
  var tempUrl = url;
  tempUrl += crnArray[0];
  for (var i=1; i<crnArray.length; i++){
    tempUrl += "&crn" + (i+1) + "=" + crnArray[i];
  }
  return tempUrl;
}

function myMain(temp){
  if (running == false){
    findClosestDay2(temp);
    interval = setInterval(degrade2, 1000);
    running = true;
  }
  else{
    clearInterval(interval);
    running = false;
  }
}


function returnData(callback){
  tallyCRNs();
  var newUrl = createURL();
  console.log(newUrl);
  var ajax = new XMLHttpRequest();
  var method = "GET";
  var async = true;
  var data;
  
  ajax.open(method, newUrl, async);
  ajax.send()
  
  ajax.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      data = JSON.parse(this.responseText);
      //console.log(data);
      //closest = findClosestDay(data);
      callback(data);
      //findRealTime(closest);
      //setInterval(findRealTime(closest), 1000);
      //return closest;
    }
  }
}

function findClosestDay2(data){
  var closest;
  var present = [];
  var dayListAlpha = [];
  var today = pos;
  
  for (var i=0; i<(data.length-1); i++){
    var dayListBeta = [];
    for (var ii=0; ii<(data[i]["day"].length); ii++){
      if(data[i]["day"] == "None"){
        break;
      }
      dayListBeta.push(data[i]["day"].charAt(ii));
    }
    dayListAlpha.push(dayListBeta);
  }
  
  for (var j=0; j<dayListAlpha.length; j++){
    for (var jj=0; jj<dayListAlpha[j].length; jj++){
      if(data[j]["day"] == "None"){
        break;
      }
      var potentialLow = associateDaysNumbers(dayListAlpha[j][jj]);
      var diff = today-potentialLow;
      
      if (diff == 0){
        var timeDiff = timeDifferenceCalculator3(data[j]["start"], diff, data[j]["end"]);
      }
      else if (diff < 0){
        var timeDiff = timeDifferenceCalculator3(data[j]["start"], Math.abs(diff), data[j]["end"]);
      }
      else if (diff > 0){
        var timeDiff = timeDifferenceCalculator3(data[j]["start"], 7-diff, data[j]["end"]); 
      }
      
      var temp = {timeDifference:timeDiff, course:j, day:dayListAlpha[j][jj], difference:diff, nextClass:data[j]["course"]};
      present.push(temp);
    }
  }
  
  if (present.length == 0){
    var temp = {timeDifference:0, course:"None", day:"None", difference:0, nextClass:"None"};
    present.push(temp);
  }
  
  present.sort(timeComparator); 
  closest = present[0];
  
  close = closest;
  return closest;
}

function timeDifferenceCalculator3(startTime, diff, endTime){
  var d = new Date();
  var realHours = addZero(d.getHours());
  var realMinutes = addZero(d.getMinutes());
  var realSeconds = addZero(d.getSeconds());
  
  var classHours = addZero(startTime.slice(0,2));
  var classMinutes = addZero(startTime.slice(2,4));
  
  var classEndHours = addZero(endTime.slice(0,2));
  var classEndMinutes = addZero(endTime.slice(0,2));
  
    if (diff == 0){ //The class is today, but it either HAS or HASN'T happened
      if ( (parseInt(realHours) - parseInt(classHours) <= 0) ){ // The class HASN'T happened (hours check) and is today
        var finalHours = parseInt(realHours) - parseInt(classHours) + "";
        if (parseInt(classMinutes) == 30){
          if (parseInt(realMinutes) < 30){
            //console.log("a");
            var finalMinutes = 30 - parseInt(realMinutes) + "";
          }
          else{
            //console.log("b");
            var finalMinutes = (60-parseInt(realMinutes))+30 + "";
          }
        }
        else{ // The class starts at :00
          //console.log("c");
          var finalMinutes = 60 - parseInt(realMinutes) + "";
        }
      }
      else{ // The class HAS happened and is today
        if ( parseInt(realHours) - parseInt(classEndHours) >= 0 ){ //If class is happening right now
          if ( parseInt(realMinutes) - parseInt(classEndMinutes) >= 0 ){
            var finalHours = parseInt(classEndHours) - parseInt(realHours);
            var finalMinutes = parseInt(classEndMinutes) - parseInt(realMinutes);
          }
        }
        else{
          var finalHours = parseInt(classHours) + (7*24) - parseInt(realHours) + ""; 
          if (parseInt(classMinutes) == 30){
            if (parseInt(realMinutes) < 30){
              //console.log('d');
              var finalMinutes = 30 - parseInt(realMinutes) + "";
            }
            else{
              //console.log("e");
              var finalMinutes = (60-parseInt(realMinutes))+30 + "";
            }
          }
          else{
            //console.log("f");
            var finalMinutes = 60 - parseInt(realMinutes) + "";
          }
        }
      }
    }
    else{
      var finalHours = parseInt(classHours) + (diff*24) - parseInt(realHours);
      if (parseInt(classMinutes) == 30){
        if (parseInt(realMinutes) < 30){
          //console.log("g");
          var finalMinutes = 30 - parseInt(realMinutes) + "";
        }
        else{
          //console.log("h");
          var finalMinutes = (60-parseInt(realMinutes))+30 + "";
        }
      }
      else{
          //console.log("i");
          var finalMinutes = 60 - parseInt(realMinutes) + "";
      }
    }
  
  finalTime = addZero(finalHours) + addZero(finalMinutes) + realSeconds;
  return finalTime;
}

function addZero(i){
  if (i<10){
    i = "0" + i;
  }
  return i;
}

function timeComparator(a,b){
  return (a.timeDifference - b.timeDifference);
}

function associateDaysNumbers(day){
  var daysArray = ["S", "M", "T", "W", "R", "F", "S"];
  for (var i=0; i<daysArray.length; i++){
    if (daysArray[i] == day){
      return i;
    }
  }
}

function returnDate(){
  var date = new Date();
  var day = date.getDay();
  var daysArray = ["S", "M", "T", "W", "R", "F", "S"];
  
  return daysArray[day];
}

function degrade2(){ //I think I can calculate the minutes/hours the same way I calculate the seconds here (not commented out)
  var temp = close.timeDifference + "";
  var d = new Date();
  //console.log(temp);
  if (temp.length == 7){
    
    var h = parseInt(temp.slice(0,3));
    var m = parseInt(temp.slice(3,5));
    //var s = parseInt(temp.slice(5,7));
    var s = parseInt(addZero(d.getSeconds()));
    
    //s = s-1;
    s = 60-s;
    
    /*
    if (s == 0){
      s = 60;
      m = m-1;
      if (m == 0){
        m = 60;
        h = h-1;
      }
    }*/
    if (s == 0){
      if (m == 0){
        m = 59;
        h = h-1;
      }
    }
    
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    
    close.timeDifference = (h+"") + (m+"") + (s+"");
    
    var time = h + ":" + m + ":" + s;
    document.getElementById("timer").innerHTML = time;
  }
  else{
    
    var h = parseInt(temp.slice(0,2));
    var m = parseInt(temp.slice(2,4));
    //var s = parseInt(temp.slice(4,6));
    var s = parseInt(addZero(d.getSeconds()));
    
    //s = s-1;
    s = 60-s;
    
    /*
    if (s == 0){
      s = 60;
      m = m-1;
      if (m == 0){
        m = 60;
        h = h-1;
      }
    }*/
    if (s == 0){
      if (m == 0){
        m = 59;
        h = h-1;
      }
    }
    
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    
    close.timeDifference = (h+"") + (m+"") + (s+"");
    
    var time = h + ":" + m + ":" + s;
    document.getElementById("timer").innerHTML = time;
  }
  document.getElementById("nextClass").innerHTML = (close.nextClass);
}
