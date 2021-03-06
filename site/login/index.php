<?php
$user = $_POST['username'];
$pass = $_POST['pass'];

$monster = $_GET['monster'];
$submitted = $_POST['submitted'];
if (!isset($_GET['monster']))
{
	echo "<span>No monster is selected to return to, please go back to the <a href='../'>Home page</a>, or continue to be taken to the monster list.</span>";
}
if($user == "adminuser"
&& $pass == "adminpass")
{
	if (!isset($_GET['monster']))
{
	include("../pages/monsterlist.html");
}
	else {
        include("../monsters/" . $monster . "/stats/secure.php");
	}
}
else
{
    if(isset($_POST))
    {?><!DOCTYPE html>
<html lang="en">
<head>
	<title>DM Login</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="/images/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
</head>
<body>
	<div class="limiter">
	<span style="position:absolute; padding-top:20px; padding-left: 20px;"><a href="/">&larr; Back</a></span>
		<div class="container-login100">
			<div class="wrap-login100 p-t-85 p-b-20">
				<form class="login100-form validate-form" method="POST" action="index.php?monster=<?php echo $monster ?>">
					<span class="login100-form-title p-b-70">
						Welcome
					</span>
					<span class="login100-form-avatar">
						<img src="images/logo.png" alt="AVATAR">
					</span>
					<input type="hidden" name="monster" value="<?php $_GET['monster'];?>">
					<input type="hidden" name="submitted" value="submitted">
					<?php
		 			if ($submitted == "submitted")
					{
						echo "<p style='text-align:center;'><br><font color='red'>Your Username and/or Password is incorrect. Try again fam.</font></p>";
					}
					?>
					<div class="wrap-input100 validate-input m-t-85 m-b-35" data-validate = "Enter username">
						<input class="input100" type="text" name="username">
						<span class="focus-input100" data-placeholder="Username"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-50" data-validate="Enter password">
						<input class="input100" type="password" name="pass">
						<span class="focus-input100" data-placeholder="Password"></span>
					</div>

					<div class="container-login100-form-btn">
						<input class="login100-form-btn" type="submit" name="submit" value="Login"></input>
					</div>
				
				  <?php
		 			if ($submitted == "submitted")
					{
						echo "<p style='text-align:center;'><br><font color='green'>Hint: From the DM's favorite game.</font></p>";
					}
					?>

					<ul class="login-more p-t-190">
						<li class="m-b-8">
							<span class="txt1">
								Forgot
							</span>

							<a href="../#contact" class="txt2">
								Username / Password?
							</a>
						</li>
					</ul>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>

</body>
</html><?php }
}
?>