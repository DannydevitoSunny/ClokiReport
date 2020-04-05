<?php
    /* require_once("connection.php"); */
    echo "Hola";
    /* $new_connection = connection();

    if (isset($_POST["submit"])) {
        foreach ($_POST as $key => $value) {
            if (empty($value)) {
                header("Location: ../register.js?param1='You must fill all the fields'");
        }
    }
    else{
        send_info();
    }


    function send_info(){
        global $new_connection;
        $validate = True;
        $name = trim($_POST["name"]);
        $lastname = trim($_POST["lastaname"]);
        $pass = trim($_POST["pass"]);
        $confirm = trim($_POST["confirm"]);
        $email =trim($_POST["email"]);
        $company = $_POST["comapany"];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $valid = False;
            $e = $email." is not a valid email address";
          
      
        }
        if ($pass !== $confirm) {
            $validate = False;
            $e = "Password doesn't match witch the confimation, try again!";
        }

        if ($validate) {
            $sql = "INSERT INTO users(name, lastname, pass, email, company) VALUES(:name, :lastaname,:pass,:email,:company)";
            $connection = $new_connection->prepare($sql);
            $connection->execute(array(':name' => $name, ':lastname' => $lastname,':pass'=>$pass,':email'=>$email,':company'=>$company));
            echo "The register was  successfuly";
        }
        else{
            header("Location: ../register.js?param1=".$e);
        }
    } */
?>