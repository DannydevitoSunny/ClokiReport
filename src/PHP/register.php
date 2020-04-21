<?php
    require_once("connection.php"); 
    $validate = True;
    $new_connection = connection();
    $_POST=["email"=>"admin45@gmail.com","pass"=>"1234","submit"=>"Apply","confpass"=>"1234","lastname"=>"Gazykanov","name"=>"Ruslan","company"=>"Comerline","extra"=>"appDeveloper"];
    if (isset($_POST["submit"])) {
        foreach ($_POST as $key => $value) {
            if (empty($value)) {
                header("Location: http://localhost:3000/reg");
                $validate =False;
                $answer = ["success"=>"false","name"=>"","warning"=>"Please fill all the fields."];
                echo json_encode($answer);
            }
        }
    }
    if ($validate) {
        send_info();
    }
    function send_info(){
        global $new_connection;
        global $validate;
        $answer = [];
        $name = trim($_POST["name"]);
        $lastname = trim($_POST["lastname"]);
        $pass = trim($_POST["pass"]);
        $confirm = trim($_POST["confpass"]);
        $email =trim($_POST["email"]);
        $company = $_POST["company"];
        $extra = trim($_POST["extra"]);
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            if ($pass !== $confirm) {
                $answer = ["success"=>"false","name"=>"","warning"=>"Passwords doesn't match, try again!"];
                echo json_encode($answer);
            }
            else{
                $options = [
                    'cost' => 12,
                ];
                $pass = password_hash($pass,PASSWORD_BCRYPT, $options);

                $sql = "SELECT * FROM Users WHERE email = :email";
                $connection = $new_connection->prepare($sql);
                $connection->execute(array(":email" => $email));

                if ($connection->rowCount()===0) {
                    $sql = "INSERT INTO Users(name, lastname, pass, email, company,description) VALUES(:name, :lastname,:pass,:email,:company,:extra)";
                    $connection = $new_connection->prepare($sql);
                    $connection->execute(array(':name' => $name, ':lastname' => $lastname,':pass'=>$pass,':email'=>$email,':company'=>$company,':extra'=>$extra));
                        //Fetching the new id to included in the answer
                    $sql = "SELECT id FROM Users WHERE email = :email";
                    $connection = $new_connection->prepare($sql);
                    $connection->execute(array(":email" => $email));
                    $res = $connection->fetch(PDO::FETCH_ASSOC);
                    $id = $res["id"];
                    $res = $connection->fetch(PDO::FETCH_ASSOC);
                    $sql = "INSERT INTO config(id) VALUES(:id)";
                    $connection = $new_connection->prepare($sql);
                    $connection->execute(array(':id' => $id ));

                        //GOOD ANSWER
                    $answer = ["success"=>"true","name"=>$name,"warning"=>"Welcome", "email"=>$email,"id"=>$id, "company"=>$company, "extra"=>$extra];
                    echo json_encode($answer);
                }
                else{
                    $answer = ["success"=>"false","name"=>"","warning"=>"Register Failed! This user already exist."];
                    echo json_encode($answer);
                }
                
            }
        }
        else{
            $answer = ["success"=>"false","name"=>"","warning"=>$email." is not a valid email address"];
            echo json_encode($answer);
        } 
    } 
?>