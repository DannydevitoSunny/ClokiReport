<?php
    require_once("connection.php");
    $new_connection = connection();
    $answer = [];
    if (isset($_POST)) {
        $id = $_POST["id"];
        $sql = "SELECT * FROM Users, config WHERE Users.id=config.id AND Users.id=:id";
        $connection = $new_connection->prepare($sql);
        $connection->execute(array(":id" => $id));
        $res = $connection->fetch(PDO::FETCH_ASSOC);
        if ($connection->rowCount() <1) {
            $answer = ["apikey"=>"", "id"=>$id,"lang"=>""];
            echo json_encode($answer);
        }
        else{
            $answer = ["apikey"=>$res["apikey"], "id"=>$res["id"],"lang"=>$res["lang"],
            "breakTime"=>$res["breakTime"], "email"=>$res["email"], "name"=>$res["name"],"company"=>$res["company"], "extra"=>$res["description"],"CIF"=>$res["CIF"]];
            echo json_encode($answer);
        }
    }
?>

