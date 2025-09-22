<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include 'config.php';

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($name && $email && $password) {
        $hashed = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        if (!$stmt) {
            die("❌ SQL Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("sss", $name, $email, $hashed);

        if ($stmt->execute()) {
            // Redirect to login page after successful signup
            header("Location: test_login.php");
            exit();
        } else {
            $message = "❌ SQL Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        $message = "❌ Please fill all fields!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Signup</title>
<style>
/* General body */
body {
    font-family: Arial, sans-serif;
    background: #f0f4f8;
    margin: 0;
    padding: 0;
}

/* Center the page */
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Container for form */
.signup-container {
    background: #fff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    width: 350px;
}

/* Form title and description */
.signup-form h2 {
    margin: 0 0 10px;
    text-align: center;
    color: #333;
}

.signup-form p {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-bottom: 30px;
}

/* Form fields */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    transition: border 0.3s;
}

.form-group input:focus {
    border-color: #007BFF;
    outline: none;
}

/* Submit button */
.btn-primary {
    width: 100%;
    padding: 12px;
    background: #007BFF;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
}

.btn-primary:hover {
    background: #0056b3;
}

/* Links */
.signup-form .login-link {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
}

.signup-form .login-link a {
    color: #007BFF;
    text-decoration: none;
}

.signup-form .login-link a:hover {
    text-decoration: underline;
}

/* Message styling */
p.message {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
</head>
<body>
<div id="signupPage" class="page">
  <div class="signup-container">
    <div class="signup-form">
      <h2>Create Account</h2>
      <p>Join thousands of students achieving their goals</p>

      <!-- Show message -->
      <?php if (!empty($message)): ?>
          <p class="message"><?php echo $message; ?></p>
      <?php endif; ?>

      <form id="signupForm" action="" method="POST">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" name="name" required>
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" name="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" required>
        </div>
        <button type="submit" class="btn-primary">Create Account</button>
      </form>

      <p class="login-link">
        Already have an account? <a href="test_login.php">Sign in here</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>
