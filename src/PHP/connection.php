<?php
    function connection(){
      $dbName = "ClokiReport2";
      $host = "127.0.0.1";
      $user = "Master";
      $pass = "clokireact";

      try {
        $db = new PDO('mysql:host=' . $host . ';dbname=' . $dbName . ';charset=utf8', $user, $pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $db;
      } catch (\Throwable $e) {
        die("Error!: " . $e->getMessage() . "<br/>");
      }
    }
