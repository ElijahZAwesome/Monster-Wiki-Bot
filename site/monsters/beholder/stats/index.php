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
        ?> <p>Either your username or password is incorrect. You must be a DM to enter.</p> <?
}
else
{
    if(isset($_POST))
    {?>

            <form method="POST" action="index.php">
            User <input type="text" name="user"></input><br/>
            Pass <input type="password" name="pass"></input><br/>
            <input type="submit" name="submit" value="Go"></input>
            </form>
    <?}
}
?>