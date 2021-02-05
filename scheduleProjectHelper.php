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
      
      $count = count($_GET);
      
      
      $data = array();
      for ($i=0; $i<=$count; $i++){
        if ($i==0){
          
          //echo current($_POST) . " ";
          
          $crn = current($_GET);
          $query = "SELECT * FROM `scheduleInfo` WHERE crn='$crn'";
          $result = mysqli_query($con, $query);
          
          $arr = mysqli_fetch_assoc($result);
          
          $data[] = $arr;
        }
        else{
        
          //echo next($_POST) . " ";
        
          $crn = next($_GET);
          $query = "SELECT * FROM `scheduleInfo` WHERE crn='$crn'";
          $result = mysqli_query($con, $query);
               
          $arr = mysqli_fetch_assoc($result); 
          
          $data[] = $arr;
        }
      }
      echo json_encode($data);
?>