<?php
$user = $_POST['user'];
$pass = $_POST['pass'];

if($user == "adminuser"
&& $pass == "adminpass")
{
        include("secure.html");
}
else
{
    if(isset($_POST))
    {?>
            <p>You must be a DM to enter.</p>
            <form method="POST" action="index.php">
            User <input type="text" name="user"></input><br/>
            Pass <input type="password" name="pass"></input><br/>
            <input type="submit" name="submit" value="Go"></input>
            </form>
    <?}
}
?>