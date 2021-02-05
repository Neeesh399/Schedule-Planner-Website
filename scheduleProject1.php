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
    <title> Schedule Stopwatch </title>
    <link rel="stylesheet" type="text/css" href="scheduleProject.css">
    <script type="text/javascript" src="scheduleProject.js"> </script>
    <script>
    </script>
    <meta charset="utf-8" />
  </head>
  <body id="ForBody">   
  
    <main id="main">
      <div id="timeLeftWords">
        <p id="nextClass"></p>
      </div>
      <div id="timeLeft">
        
        <p id="timer">00:00:00</p>
        
      </div>
    </main>
    
    <form method="post" action="scheduleProject1.php" id="ForForm">
      <input type="button" value="submit" id="submitButton" onClick="returnData(myMain);">
      <div id="ForContentBox1" class="ForContentBox">
        <input id="delButton" type="button" value="-" onClick="deleteOld();">
        <br>
        <label id="label1" for="crnInput1">Enter CRN: </label>
        <input type="text" id="crnInput1" name="crnInput1">
      </div>
    </form>
    
    <input id="addButton" type="button" value="+" onClick="spawnNew();">
  
<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST"){
    echo "<br><br><br>";
    $count = count($_POST);
    for ($i=0; $i<=$count; $i++){
      if ($i==0){
        
        //echo current($_POST) . " ";
        
        $crn = current($_POST);
        $query = "SELECT * FROM `scheduleInfo` WHERE crn='$crn'";
        $result = mysqli_query($con, $query);
        
        while ($row = mysqli_fetch_array($result)){
          echo $row["course"] . " ";
          echo $row["crn"] . " ";
          echo $row["day"] . " ";
          echo $row["start"] . " ";
          echo $row["end"] . " ";
          echo $row["section"] . " ";
          echo "<br>"; 
        }
        
      }
      else{
      
        //echo next($_POST) . " ";
      
        $crn = next($_POST);
        $query = "SELECT * FROM `scheduleInfo` WHERE crn='$crn'";
        $result = mysqli_query($con, $query);
        
        while ($row = mysqli_fetch_array($result)){
          echo $row["course"] . " ";
          echo $row["crn"] . " ";
          echo $row["day"] . " ";
          echo $row["start"] . " ";
          echo $row["end"] . " ";
          echo $row["section"] . " ";
          echo "<br>"; 
        }      
      }
    } 
  }
?>  

   
  </body>
</html>