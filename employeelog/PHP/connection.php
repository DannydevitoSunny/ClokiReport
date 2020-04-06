<?php 

    function connection(){
        $dbName = "ClokiFather";
        $host = "127.0.0.1";
        $user = "root";
        $pass = "";
        

       try {
        $db = new PDO('mysql:host='.$host.';dbname='.$dbName.';charset=utf8', $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;

       } catch (\Throwable $e) {
            die("Error!: " . $e->getMessage() . "<br/>");
       }

    }



?>