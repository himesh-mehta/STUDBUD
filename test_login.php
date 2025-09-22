<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $name, $hashedPassword);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($password, $hashedPassword)) {
        $_SESSION['user_id'] = $id;
        $_SESSION['user_name'] = $name;
        echo "✅ Login successful! Welcome, " . $name;

        header("Location: dashboard.php");
        exit();

    } else {
        echo "❌ Invalid email or password!";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>loginPage</title>
    <link rel="stylesheet" href="styles/main.css" />
    <link rel="stylesheet" href="styles/themes.css" />
    <link rel="stylesheet" href="styles/charts.css" />
</head>
<body>
        <!-- Login Page -->
    <div id="loginPage" class="page active">
      <div class="login-container">
        <div class="login-left">
          <div class="brand">
            <h1>📚 StudyHub</h1>
            <p>Your Ultimate Learning Companion</p>
          </div>
          <div class="features">
            <div class="feature">
              <span class="icon">📖</span>
              <span>Comprehensive study materials</span>
            </div>
            <div class="feature">
              <span class="icon">📊</span>
              <span>Detailed progress analytics</span>
            </div>
            <div class="feature">
              <span class="icon">🎯</span>
              <span>Personalized learning paths</span>
            </div>
          </div>
        </div>
        <div class="login-right">
          <div class="login-form">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your learning journey</p>
            <form id="loginForm" action="" method="POST">   
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" name="email" required />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required />
              </div>
              <button type="submit"   class="btn-primary">Sign In</button>
            </form>

            <p class="signup-link">
              Don't have an account?
              <a href="test_signup.php" id="showSignup">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
</body>
</html>