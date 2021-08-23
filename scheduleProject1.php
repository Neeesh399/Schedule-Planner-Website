<?php
  
?>
<!DOCTYPE html>
<?php
     $servername = "";
      $username ="";
      $password = "";
      $dbname = "";
      
      $con = mysqli_connect($servername,$username,$password,$dbname);
      if (mysqli_connect_errno())
      {
        echo "Failed to connect to MySQL:" . mysqli_connect_error();
      }
?>
     
<html lang="en">
  <head>
    <title> Course Clock </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <link rel="stylesheet" type="text/css" href="scheduleProject.css">
    <script type="text/javascript" src="scheduleProject.js"> </script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <meta charset="utf-8" />
  </head>
  <body id="ForBody" onload="drawFromCookies()">   
    <div id="topBanner">
      <div id="topBannerText">
        Course Clock
      </div>
      <div id="optionsButtons">
        <input id="helpButton" type="button" value="Help" onClick="toggleHelp();">
        <input id="themeButton" type="button" value="Theme" onClick="toggleTheme();">
      </div>
    </div>
  
    <div id="helpWrapper">
      <p>This application can be used to track the time and location of your next NJIT class.</p>
      <ol>
        <li>Enter the CRNs (also called course numbers) for every course you are taking into the menu on the right. Ex: 90002</li>
        <li>Press the "Submit" button.</li>
        <li>The clock will display how much time is left until your next class, the information below will display what your next class is, its meeting format, the building/room number, and the time in which the class occurs. </li>
        <li>The resulting map will show where on campus this class takes place, using Google Maps.</li> 
      </ol>
      <p>Thanks for trying it out! Made by a student.</p>
    </div>
  
    <div id="roddyRichTheWrapper">
      <p id="timer">00:00:00</p>
      <div id="middleText">
        <p id="classText">None</p>
        <p id="instructionType">None</p>
        <p id="locationText">None</p>
        <p id="timeText">00:00 - 00:00</p>
      </div>
    </div>
        
    <div id="right">
      <div id="right-button-container"> 
        <input id="addButton" type="button" value="+" onClick="spawnNew();">
        <input id="delButton" type="button" value="-" onClick="deleteOld();">
      </div>
      
      <div id="right-form-container">
        
        <form method="post" action="scheduleProject1.php" id="ForForm">
          <div id="ForContentBox1" class="ForContentBox">
          <label id="label1" for="crnInput1"></label><input class="inputsForCRN" type="text" id="crnInput1" name="crnInput1" placeholder="CRN" maxlength="5">
          </div>
        </form>
        
      </div>
      
      <div id="submitButtonDiv">
        <input type="button" value="Submit" id="submitButton" onClick="returnData(myMain);">
      </div>
      
    </div>
     
  
<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST"){
    echo "<br><br><br>";
    $count = count($_POST);
    for ($i=0; $i<=$count; $i++){
      if ($i==0){
        
        //echo current($_POST) . " ";
        
        $crn = current($_POST);
        $query = "SELECT * FROM `scheduleInfoFall2021` WHERE crn='$crn'";
        $result = mysqli_query($con, $query);
        
        while ($row = mysqli_fetch_array($result)){
          echo $row["course"] . " ";
          echo $row["crn"] . " ";
          echo $row["instructionMethod"] . " ";
          echo $row["days"] . " ";
          echo $row["start"] . " ";
          echo $row["end"] . " ";
          echo $row["section"] . " ";
          echo $row["instructor"] . " ";
          echo $row["building"] . " ";
          echo $row["room"] . " ";
          echo "<br>"; 
        }
        
      }
      else{
      
        //echo next($_POST) . " ";
      
        $crn = next($_POST);
        $query = "SELECT * FROM `scheduleInfoFall2021` WHERE crn='$crn'";
        $result = mysqli_query($con, $query);
        
        while ($row = mysqli_fetch_array($result)){
          echo $row["course"] . " ";
          echo $row["crn"] . " ";
          echo $row["instructionMethod"] . " ";
          echo $row["days"] . " ";
          echo $row["start"] . " ";
          echo $row["end"] . " ";
          echo $row["section"] . " ";
          echo $row["instructor"] . " ";
          echo $row["building"] . " ";
          echo $row["room"] . " ";
          echo "<br>"; 
        }      
      }
    } 
  }
?>  

   <iframe id="map" src="" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
     
  </body>
</html>
