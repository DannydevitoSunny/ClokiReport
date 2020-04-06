<?php 
    require_once("connection.php"); 
    $new_connection = connection();
	if (!empty($_POST["pass"] and !empty($_POST["email"]))) {
		$pass =$_POST["pass"];
		$email = $_POST["email"];
		$sql = "SELECT * FROM Users WHERE email = :email";
		$connection = $new_connection->prepare($sql);
		$result = $connection->execute(array(":email" => $email));
		$res = $connection->fetch(PDO::FETCH_ASSOC);
		if ($res) {
			$acount_pass = $res["pass"];
			if (password_verify($pass, $acount_pass)) {
				echo "true";
			}
			else{
				echo "The password or email are wrong";
			}
		}
		else{
			echo "There is no such user";
		}
		
		
	}
	else{
		echo "You need fill all the fields";
	}




?>