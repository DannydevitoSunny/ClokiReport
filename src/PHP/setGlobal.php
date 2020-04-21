<?php 
require_once("connection.php"); 
$new_connection = connection();
$answer = [];
if (isset($_POST)) {
	$CIF = $_POST["CIF"];
	$apikey = $_POST["apikey"];
	$lang = $_POST["lang"];
	$company = $_POST["company"];
	$id = $_POST["id"];
	$breakTime = $_POST["breakTime"];
	$sql = "SELECT * FROM config WHERE id = :id";
	$connection = $new_connection->prepare($sql);
	$connection->execute(array(":id" => $id));
	$res = $connection->fetch(PDO::FETCH_ASSOC);

	if ($connection->rowCount() <1) {
		$sql = "INSERT INTO config(id,apikey,lang,breakTime,CIF) VALUES(:id, :apikey,:lang,:breakTime,:CIF)";
		$connection = $new_connection->prepare($sql);
		$connection->execute(array(":id" => $id,":apikey" => $apikey,":lang" => $lang,":breakTime"=>$breakTime,":CIF"=>$CIF));

		$sql = "INSERT INTO Users(company) VALUES(:company)";
		$connection = $new_connection->prepare($sql);
		$connection->execute(array(":company"=>$company));

		$answer = ["success"=>"true"];

		echo json_encode($answer);
	}
	else{
		$sql = "UPDATE config SET apikey = :apikey, lang= :lang, breakTime=:breakTime, CIF=:CIF WHERE id = :id";
		$connection = $new_connection->prepare($sql);
		$connection->execute(array(":id"=>$id,":apikey" => $apikey,":lang" => $lang,":breakTime"=>$breakTime,":CIF"=>$CIF));

		$sql = "UPDATE Users SET company=:company WHERE id = :id";
		$connection = $new_connection->prepare($sql);
		$connection->execute(array(":id"=>$id,":company"=>$company));

		$answer = ["success"=>"true"];
		echo json_encode($answer);
	}
}

?>