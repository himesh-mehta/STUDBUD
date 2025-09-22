<?php
session_start();
session_unset();
session_destroy();
header("Location: test_login.php");
exit();
