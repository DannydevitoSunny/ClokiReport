<?php
require_once("connection.php");
$new_connection = connection();
if (!empty($_POST["email"])) {
    $email = $_POST["email"];
    $sql = "SELECT * FROM Users WHERE email = :email";

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $connection = $new_connection->prepare($sql);
        $result = $connection->execute(array(":email" => $email));
        $res = $connection->fetch(PDO::FETCH_ASSOC);
        if ($res) {
            $name = $res["name"];
            $email = $res["email"];
            $id = $res["id"];
            $company =  $res["company"];
            $extra = $res["description"];
            $answer = ["success" => "true", "name" => $name, "warning" => "Welcome", "email" => $email, "id" => $id, "company" => $company, "extra" => $extra];
            echo json_encode($answer);
        } else {
            $answer = ["success" => "false", "name" => "", "warning" => "There is no such user: " . $email];
            echo json_encode($answer);
        }
    } else {
        $answer = ["success" => "false", "name" => "", "warning" => "This email is not valid"];
        echo json_encode($answer);
    }
} else {
    $answer = ["success" => "false", "name" => "", "warning" => "Can't find the email"];
    echo json_encode($answer);
}
