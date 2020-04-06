<?php
    require_once("connection.php"); 
    $validate = True;
    $new_connection = connection();

    if (isset($_POST["submit"])) {
        foreach ($_POST as $key => $value) {
            if (empty($value)) {
                header("Location: http://localhost:3000/reg");
                $validate = False;
            }
        }

    }
    if ($validate) {
        send_info();
    }
    

    function send_info(){
        global $new_connection;
        global $validate;
        $name = trim($_POST["name"]);
        $lastname = trim($_POST["lastname"]);
        $pass = trim($_POST["pass"]);
        $confirm = trim($_POST["confpass"]);
        $email =trim($_POST["email"]);
        $company = $_POST["company"];
        $extra = trim($_POST["extra"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $valid = False;
            $e = $email." is not a valid email address";
          
      
        }
        if ($pass !== $confirm) {
            $validate = False;
            $e = "Password doesn't match witch the confimation, try again!";
        }
        else{
            $opciones = [
                'cost' => 12,
            ];
            $pass = password_hash($pass,PASSWORD_BCRYPT, $opciones);
        }

        if ($validate) {
            $sql = "INSERT INTO Users(name, lastname, pass, email, company,description) VALUES(:name, :lastname,:pass,:email,:company,:extra)";
            $connection = $new_connection->prepare($sql);
            $connection->execute(array(':name' => $name, ':lastname' => $lastname,':pass'=>$pass,':email'=>$email,':company'=>$company,':extra'=>$extra));
            echo "The register was  successfuly";
        }
        else{
            echo $e;
        }
    } 
?>