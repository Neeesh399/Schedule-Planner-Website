var count = 1;
var url = "scheduleProjectHelper.php?crn1=";
var crnArray;
var daysArray = ["S", "M", "T", "W", "R", "F", "S"];
var interval;
var theme = true; //true implies lite theme, false implies dark

var locations = [
  {abbrv:"FMH", name:"Faculty Memorial Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9156472587197!2d-74.18025936086143!3d40.7418815929867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537dbd38f923%3A0x16cecf43f9e3b9c0!2sFaculty%20Memorial%20Hall%2C%20Newark%2C%20NJ%2007103!5e0!3m2!1sen!2sus!4v1622163200074!5m2!1sen!2sus"},
  {abbrv:"COLT", name:"Colton Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9397623283357!2d-74.17980958463409!3d40.741350979328715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537dc6ea18a1%3A0xb3e978ec56d1cd90!2sColton%20Hall%2C%20363-383%20M.L.K.%20Jr%20Blvd%2C%20Newark%2C%20NJ%2007102!5e0!3m2!1sen!2sus!4v1622163274352!5m2!1sen!2sus"},
  {abbrv:"FENS", name:"Fenster Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.888429054165!2d-74.17928828463415!3d40.74248047932854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537dfc9c9cb5%3A0xb8751f5991ea1dc4!2sFenster%20Hall%2C%20Newark%2C%20NJ%2007103!5e0!3m2!1sen!2sus!4v1622163328012!5m2!1sen!2sus"},
  {abbrv:"TIER", name:"Tiernan Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9108167779473!2d-74.18187348463417!3d40.74198787932862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537da0f3617f%3A0x3739b13bf5c80f39!2sTiernan%20Hall%2C%20Newark%2C%20NJ%2007103!5e0!3m2!1sen!2sus!4v1622163380342!5m2!1sen!2sus"},
  {abbrv:"GITC", name:"Guttenberg Information Technologies Center", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.799525861249!2d-74.18172798463402!3d40.74443657932836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25482666fffff%3A0x39cf989997d234!2sGITC%20(William%20S.%20Guttenberg%20Information%20Technologies%20Center)!5e0!3m2!1sen!2sus!4v1622163426853!5m2!1sen!2sus"},
  {abbrv:"KUPF", name:"Kupfrian Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1760.7655056758078!2d-74.17931305385956!3d40.74253492657922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537d92f72fe5%3A0x301c2c0d6193c422!2sKupfrian%20Hall%2C%20Newark%2C%20NJ%2007103!5e0!3m2!1sen!2sus!4v1622160482951!5m2!1sen!2sus"},
  {abbrv:"CULM", name:"Cullimore Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.867781793752!2d-74.17953438463414!3d40.74293477932855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537df8ecef11%3A0x9bbfd11697a5db59!2sCullimore%20Hall%2C%20Newark%2C%20NJ%2007103!5e0!3m2!1sen!2sus!4v1622163476798!5m2!1sen!2sus"},
  {abbrv:"ECEC", name:"Electrical and Computer Engineering Center", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.939912304306!2d-74.18095418463415!3d40.74134767932876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c253f8f1602063%3A0xcefa7bd4295a031e!2sNJIT%20Electrical%20%26%20Computer%20Engineering%20Building!5e0!3m2!1sen!2sus!4v1622163517297!5m2!1sen!2sus"},
  {abbrv:"WEST", name:"Weston Hall", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9556460915123!2d-74.17961018463413!3d40.74100147932875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537dd0511729%3A0xa16de89dfe23e347!2sWeston%20Hall-NJIT!5e0!3m2!1sen!2sus!4v1622163555682!5m2!1sen!2sus"},
  {abbrv:"CAB", name:"Central Avenue Building", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8315134185946!2d-74.18026818463395!3d40.743732779328525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254821268df3f%3A0x6b3f722cff4295f5!2sCentral%20Avenue%20Bldg%2C%20Newark%2C%20NJ%2007103!5e0!3m2!1sen!2sus!4v1622163736543!5m2!1sen!2sus"},
  {abbrv:"ME", name:"Mechanical Engineering Center", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8113928528323!2d-74.18072068463405!3d40.74417547932845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254826c31d4f3%3A0x1f080527dc9a98eb!2sMechanical%20Engineering%20Center!5e0!3m2!1sen!2sus!4v1622163766140!5m2!1sen!2sus"},
  {abbrv:"YORK", name:"York Center", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.960927020189!2d-74.18074028463414!3d40.7408852793288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537db4468f6f%3A0xa14b16ffec5b41cf!2sYork%20Center%20for%20Environmental%20Engineering%20and%20Science!5e0!3m2!1sen!2sus!4v1622163805738!5m2!1sen!2sus"},
  {abbrv:"WEC", name:"Wellness & Events Center", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8988366920757!2d-74.18263078463409!3d40.74225147932866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537d729dd2fb%3A0x632f0aca4b3c4dc6!2sWellness%20and%20Events%20Center!5e0!3m2!1sen!2sus!4v1622163832643!5m2!1sen!2sus"},
  {abbrv:"CKB", name:"Central King Building", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9128437512427!2d-74.17962608463407!3d40.74194327932869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537de0e0222b%3A0x64b0b1feff722a33!2sCentral%20King%20Building%2C%20Newark%2C%20NJ%2007102!5e0!3m2!1sen!2sus!4v1622163871180!5m2!1sen!2sus"},
  {abbrv:"ERR", name:"Error", location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8739264528576!2d-74.1792770846341!3d40.74279957932853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2537d98c396f9%3A0xb97c287a2ef95f43!2sNew%20Jersey%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1622163922050!5m2!1sen!2sus"}
];

var dayConverter = [
  {abbrv:"M", realDay:"Monday"},
  {abbrv:"T", realDay:"Tuesday"},
  {abbrv:"W", realDay:"Wednesday"},
  {abbrv:"R", realDay:"Thursday"},
  {abbrv:"F", realDay:"Friday"},
  {abbrv:"S", realDay:"Saturday"}
];

function toggleHelp(){
  let obj = document.getElementById("helpWrapper");
  if (obj.style.display == ""){
    obj.style.display = "flex";
  }
  else{
    obj.style.display = "";
  }  
}

function toggleTheme(){
  if (theme){ //toggle to dark
    //white to dark gray
    document.getElementById("ForBody").style.backgroundColor = "rgb(31,31,31)"; 
    document.getElementById("helpWrapper").style.backgroundColor = "rgb(31,31,31)";
    //black to dark gray
    document.getElementById("addButton").style.color = "rgb(31,31,31)";
    document.getElementById("addButton").style.borderColor = "rgb(31,31,31)";
    document.getElementById("delButton").style.color = "rgb(31,31,31)";
    document.getElementById("delButton").style.borderColor = "rgb(31,31,31)";    
    document.getElementById("submitButton").style.color = "rgb(31,31,31)";
    document.getElementById("topBannerText").style.color = "rgb(31,31,31)"; 
    document.getElementById("helpButton").style.color = "rgb(31,31,31)"; 
    document.getElementById("themeButton").style.color = "rgb(31,31,31)";
    //black to white
    document.getElementById("timer").style.color = "rgb(250,250,250)";
    document.getElementById("middleText").style.color = "rgb(250,250,250)";  
    document.getElementById("classText").style.color = "rgb(250,250,250)";
    document.getElementById("instructionType").style.color = "rgb(250,250,250)";   
    document.getElementById("locationText").style.color = "rgb(250,250,250)"; 
    document.getElementById("timeText").style.color = "rgb(250,250,250)";
    document.getElementById("helpWrapper").style.color = "rgb(250,250,250)";
    //red to electric blue
    document.getElementById("topBanner").style.backgroundColor = "rgb(112,250,253)"; 
    document.getElementById("topBannerText").style.backgroundColor = "rgb(112,250,253)";  
    document.getElementById("helpButton").style.backgroundColor = "rgb(112,250,253)"; 
    document.getElementById("themeButton").style.backgroundColor = "rgb(112,250,253)"; 
    document.getElementById("helpWrapper").style.borderColor = "rgb(112,250,253)";
    
    for (let i=0; i < document.getElementsByClassName("inputsForCRN").length; i++){
      document.getElementsByClassName("inputsForCRN")[i].style.backgroundColor = "rgb(31,31,31)";
      document.getElementsByClassName("inputsForCRN")[i].style.color="rgb(250,250,250)";
      document.getElementsByClassName("inputsForCRN")[i].style.borderBottomColor = "rgb(112,250,253)"; 
    }
    
    setCookie("myXYZTheme", "dark");
    theme = false;
  }
  else{ //toggle to light
    //dark gray to white
    document.getElementById("ForBody").style.backgroundColor = "rgb(250,250,250)"; 
    document.getElementById("helpWrapper").style.backgroundColor = "rgb(250,250,250)";
    //dark gray to black
    document.getElementById("addButton").style.color = "black";
    document.getElementById("addButton").style.borderColor = "black";
    document.getElementById("delButton").style.color = "black";
    document.getElementById("delButton").style.borderColor = "black";    
    document.getElementById("submitButton").style.color = "black";
    document.getElementById("topBannerText").style.color = "black"; 
    document.getElementById("helpButton").style.color = "black"; 
    document.getElementById("themeButton").style.color = "black";
    //white to black
    document.getElementById("timer").style.color = "black";
    document.getElementById("middleText").style.color = "black";  
    document.getElementById("classText").style.color = "black";
    document.getElementById("instructionType").style.color = "black";   
    document.getElementById("locationText").style.color = "black"; 
    document.getElementById("timeText").style.color = "black"; 
    document.getElementById("helpWrapper").style.color = "black";
    //electric blue to red
    document.getElementById("topBanner").style.backgroundColor = "red"; 
    document.getElementById("topBannerText").style.backgroundColor = "red";  
    document.getElementById("helpButton").style.backgroundColor = "red"; 
    document.getElementById("themeButton").style.backgroundColor = "red"; 
    document.getElementById("helpWrapper").style.borderColor = "red";
    
    for (let i=0; i < document.getElementsByClassName("inputsForCRN").length; i++){
      document.getElementsByClassName("inputsForCRN")[i].style.backgroundColor = "rgb(250,250,250)";
      document.getElementsByClassName("inputsForCRN")[i].style.color="black";
      document.getElementsByClassName("inputsForCRN")[i].style.borderBottomColor = "red"; 
    }
    
    setCookie("myXYZTheme", "lite");
    theme = true;
  }
}

function myMain(temp){
  //I think I could remove the time calculation from calculateTimeLeft (because I do it in findClosestDay4?) but I don't want to look at that right now
  let closestClass = findClosestDay4(temp);
  document.getElementById("classText").innerText = closestClass.course + "-" + closestClass.section;
  document.getElementById("instructionType").innerText = closestClass.instructionMethod;
  console.log(closestClass)
  if (closestClass.building == "None"){
    document.getElementById("locationText").innerText = "None";
    document.getElementById("timeText").innerText = "None";
  }
  else{
    document.getElementById("locationText").innerText = findProperLocation(closestClass.building) + ", Room: " + closestClass.room;
    let timeTextString = findProperDay(closestClass.day) + ", " +closestClass.start.slice(0,2)+":"+closestClass.start.slice(2,4) + " - " + closestClass.end.slice(0,2)+":"+closestClass.end.slice(2,4)
    document.getElementById("timeText").innerText = timeTextString; 
  }
  document.getElementById("map").src = returnLocString(closestClass.building);
  if (interval == 0){
    interval = setInterval(calculateTimeLeft, 1000, closestClass);
  }
  else{
    clearInterval(interval);
    interval = setInterval(calculateTimeLeft, 1000, closestClass);
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
      console.log(data);
      clearCookies();
      
      for (let key in data){
        if (data[key] != null){
          if (!checkCookies(data[key].crn)){
            var valString = data[key].course+"%"+data[key].crn+"%"+data[key].day+"%"+data[key].start+"%"+data[key].end;
            setCookie("myCrns"+data[key].crn, valString);
            //console.log("myCrns"+data[key].crn + " is created");
          }
          else{
            //console.log("myCrns"+data[key].crn + " already exists");
          }
        }
      } 
      
      callback(data);
      //return closest;
    }
  }
}

function drawFromCookies(){
  let allCookies = document.cookie;
  cookieJar = allCookies.split(";");
  for(var i=0; i<cookieJar.length; i++){
    if(cookieJar[i].includes("myCrns")){
      //console.log(cookieJar[i]);
      var cookieParts = cookieJar[i].split("%");
      if (document.getElementById("crnInput1").value == ""){
        document.getElementById("crnInput1").value = cookieParts[1];
      }
      else{
        spawnNew(cookieParts[1]);
      }
    }
    else if (cookieJar[i].includes("myXYZTheme")){ //myXYZTheme=lite
      let myTheme = cookieJar[i].slice(12,16);
      if (myTheme == "dark"){
        toggleTheme();
      }
    }
  }
  if (document.getElementById("crnInput1").value != ""){
    returnData(myMain);
  }
}

function setCookie(cookieName, cookieVal){ //instantiates and sets new cookies
  var exDays = 100;
  var d = new Date();
  d.setTime(d.getTime() + (10*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieVal + ";" + expires + ";path=/";
}

function getCookie(cookieName){
  var name = cookieName + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i<ca.length;i++){
    var c = ca[i];
    while (c.charAt(0) == ' '){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }  
  }
  return "";
}

function checkCookies(temp){
  if (getCookie("myCrns"+temp) == ""){
    return false;
  }
  else{
    return true;
  }
}

function clearCookies(){
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++){
    var key = ca[i].split("=");
    //console.log(key[0] + " " + key[0].includes("crn"));
    if (key[0].includes("myCrns")){ 
      //console.log(key[0] + " is cleared");
      document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
}

function clearThemeCookie(){
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++){
    var key = ca[i].split("=");
    if (key[0].includes("myXYZTheme")){ 
      document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
}

function spawnNew(temp){
  if (count < 7){
    var nodeID = "crnInput" + count;
    var boxID = "ForContentBox" + count;
    var labelID = "label" + count;
    var node = document.getElementById("ForForm");
    
    var cloneBox = document.getElementById(boxID).cloneNode();
    var cloneLabel = document.getElementById(labelID).cloneNode();
    var cloneOther = document.getElementById(nodeID).cloneNode();
    //var cloneDel = document.getElementById("delButton").cloneNode();
    
    count++;
    var nodeID = "crnInput" + count;
    var labelID = "label" + count;
    var boxID = "ForContentBox" + count;
    //var br = document.createElement('br');
    cloneLabel.id = labelID;
    cloneOther.id = nodeID;
    cloneBox.id = boxID;
    
    cloneLabel.setAttribute("for", nodeID);
    cloneOther.setAttribute("name", nodeID);
    
  
    //cloneBox.appendChild(br);
    cloneBox.appendChild(cloneLabel);
    cloneBox.appendChild(cloneOther);
    node.appendChild(cloneBox);//.appendChild(cloneDel);
    //cloneLabel.innerHTML="Enter CRN: ";
    
    if (temp!=null){
      cloneOther.value = temp;
    }
    else{
      cloneOther.value = "";
    }
  
  }
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
      //setCookie("crn"+tempcrn, temp);
    }
  }
  if (tempArr.length==0){
    tempArr.push("90002");
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

function findClosestDay4(data){
  var newDate = new Date();
  let today = newDate.getDay();
  var potentialClosestArr = [];
  let isHappening = false;
  
  let totalCurrentSeconds = (today*24*60*60)+(newDate.getHours()*60*60)+(newDate.getMinutes()*60)+(newDate.getSeconds());
  
  for (let i=0; i<(data.length-1); i++){
    let classDays = data[i]["day"];
    for (let ii=0; ii<classDays.length; ii++){
      if (data[i]["day"] == "None"){
        continue; //situations that return nothing are problematic, may remove this line of code
      }
      let dayNum = associateDaysNumbers(data[i]["day"][ii]);
      if (dayNum-today < 0){
        dayNum = (dayNum-today+7);
      }
      let potentialClassStartSeconds = (dayNum*24*60*60)+( (parseInt(data[i]["start"].slice(0,2)))*60*60 )+( (parseInt(data[i]["start"].slice(2,4)))*60 );
      
      if (dayNum-today == 0 && (totalCurrentSeconds-potentialClassStartSeconds) > 0){
        let potentialClassEndSeconds = (dayNum*24*60*60)+( (parseInt(data[i]["end"].slice(0,2)))*60*60 )+( (parseInt(data[i]["end"].slice(2,4)))*60 );
        if (totalCurrentSeconds-potentialClassEndSeconds < 0){
          //class is happening right now, so we do nothing (?)
          isHappening = true;
        }
        else{
          dayNum = 7;
          potentialClassStartSeconds = (dayNum*24*60*60)+( (parseInt(data[i]["start"].slice(0,2)))*60*60 )+( (parseInt(data[i]["start"].slice(2,4)))*60 );
        }
      }
      potentialClosestArr.push( {crn:data[i]["crn"], day:data[i]["day"][ii], dayAsNum:associateDaysNumbers(data[i]["day"][ii]), start:data[i]["start"], end:data[i]["end"], totalStart:potentialClassStartSeconds, happening:isHappening, course:data[i]["course"], building:data[i]["building"], instructionMethod:data[i]["instructionMethod"], instructor:data[i]["instructor"], room:data[i]["room"], section:data[i]["section"] } );    
    } 
  }
  
  if (potentialClosestArr.length == 0){
    return { crn:data[0]["crn"], day:"None", dayAsNum:"None", start:"None", end:"None", totalStart:"None", happening:"None", course:data[0]["course"], building:"None", instructionMethod:data[0]["instructionMethod"], instructor:data[0]["instructor"], room:"None", section:data[0]["section"] };
  }
  
  potentialClosestArr.sort((a,b) => parseInt(a.totalStart) - parseInt(b.totalStart) );
  let closest = potentialClosestArr[0];
  return closest;
}

function calculateTimeLeft(classOne){ //I want this function to update the timer object
  var newDate = new Date();
  let today = newDate.getDay();
  let currentTime = newDate.getHours()
  
  let finalDays = classOne["dayAsNum"];
  
  //What happens if the class is today (finalDays==0) and it has already happened?
  if (classOne["dayAsNum"]<today){
    finalDays = (classOne["dayAsNum"]+7);
  }
  else if (finalDays-today == 0 && classOne["happening"]){
    //class is currently happening, so we need to do something about that
    //might be done? need to check. Something weird happened when it got to 00:00:00
    let totalCurrentSeconds = (today*24*60*60)+(newDate.getHours()*60*60)+(newDate.getMinutes()*60)+(newDate.getSeconds());
    let classStartSeconds = (finalDays*24*60*60)+( (parseInt(classOne["start"].slice(0,2)))*60*60 ) + ( (parseInt(classOne["start"].slice(2,4)))*60 );
    let classLength = ((parseInt(classOne["end"].slice(0,2))-parseInt(classOne["start"].slice(0,2)))*3600) + ((parseInt(classOne["end"].slice(2,4))-parseInt(classOne["start"].slice(2,4)))*60)
    
    let finalTime = convertSeconds(classLength-(totalCurrentSeconds-classStartSeconds));
  
    document.getElementById("timer").innerText = finalTime;
    
    return;
  }
  else if (finalDays-today == 0 && hasClassHappened(classOne)){
    //console.log("c");
    finalDays += 7;
  }
  
  let totalCurrentSeconds = (today*24*60*60)+(newDate.getHours()*60*60)+(newDate.getMinutes()*60)+(newDate.getSeconds());
  let classStartSeconds = (finalDays*24*60*60)+( (parseInt(classOne["start"].slice(0,2)))*60*60 ) + ( (parseInt(classOne["start"].slice(2,4)))*60 );
  
  let finalTime = convertSeconds(classStartSeconds-totalCurrentSeconds);
  
  document.getElementById("timer").innerText = finalTime;
  
  return;
}

function convertSeconds(temp){
  let days = parseInt(temp/(24*60*60));
  temp = temp % (24*60*60);
  
  let hours = parseInt(temp/(60*60))+(days*24);
  temp = temp % (60*60);
  
  let minutes = parseInt(temp/(60));
  temp = temp % 60
  
  seconds = temp;
  
  if (days == 0 && hours == 0 && minutes == 0 && seconds == 0){
    location.reload(true); //pls work
  }  
  
  return addZero(hours)+":"+addZero(minutes)+":"+addZero(seconds); 
}

function returnLocString(temp){
  for (each in locations){
    if (locations[each].abbrv == temp){
      return locations[each].location;
    }
  } 
  return locations[14].location;
}

function addZero(i){
  if (i<10){
    i = "0" + i;
  }
  return i;
}

function findProperLocation(abbrv){
  for (let i=0; i<locations.length; i++){
    if (locations[i].abbrv == abbrv){
      return locations[i].name;
    }
  }
}

function findProperDay(abbrv){
  for (let i=0; i<dayConverter.length; i++){
    if (dayConverter[i].abbrv == abbrv){
      return dayConverter[i].realDay;
    }
  }
}

function hasClassHappened(classOne){
  var newDate = new Date();
  let relevantHours = parseInt(newDate.getHours());

  return ( parseInt(classOne["start"].slice(0,2)) < relevantHours);
}

function associateDaysNumbers(day){
  var daysArray = ["S", "M", "T", "W", "R", "F", "S"];
  for (var i=0; i<daysArray.length; i++){
    if (daysArray[i] == day){
      return i;
    }
  }
}
