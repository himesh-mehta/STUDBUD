<?php
$host = "localhost";
$user = "root";   // default XAMPP username
$password = "";   // default XAMPP password is empty
$database = "studyhub_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

