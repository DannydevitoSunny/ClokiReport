<?php 
	require_once("connection.php"); 
	$new_connection = connection();
	$answer=[];
	if (!empty($_POST["pass"] and !empty($_POST["email"]))) {
		$pass =$_POST["pass"];
		$email = $_POST["email"];
		$sql = "SELECT * FROM Users WHERE email = :email";
		
		if(filter_var($email, FILTER_VALIDATE_EMAIL)){
			$connection = $new_connection->prepare($sql);
			$result = $connection->execute(array(":email" => $email));
			$res = $connection->fetch(PDO::FETCH_ASSOC);
			if ($res) {
				$acount_passw = $res["pass"];
				if (!password_verify($pass, $acount_passw)) {
					$answer = ["success"=>"false","name"=>"","warning"=>"The password or email are wrong"];
					echo json_encode($answer);
				}
				else{
					$id = $res["id"];
					$email = $res["id"];
					$name =  $res["name"];
					$company =  $res["company"];
					$extra = $res["description"];
						//GOOD ANSWER
					$answer = ["success"=>"true","name"=>$name,"warning"=>"Welcome", "email"=>$email,"id"=>$id, "company"=>$company, "extra"=>$extra];
					echo json_encode($answer);
				}
			}
			else{
				$answer = ["success"=>"false","name"=>"","warning"=>"There is no such user: ".$email];
				echo json_encode($answer);	
			}
		}
		else{
			$answer = ["success"=>"false","name"=>"","warning"=>"This email is not valid"];
			echo json_encode($answer);
		}
	}
	else{
		$answer = ["success"=>"false","name"=>"","warning"=>"You must fill all the fields."];
		echo json_encode($answer);
	}
?>
