<?php 

    function connection(){
        $dbName = "ClokiReport";
        $host = "localhost";
        $user = "ClockiFather";
        $pass = "clokireact";
        

       try {
        $db = new PDO('mysql:host='.$host.';dbname='.$dbName.';charset=UTF-8', $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;

       } catch (\Throwable $e) {
            die("Error!: " . $e->getMessage() . "<br/>");
       }

    }



?>