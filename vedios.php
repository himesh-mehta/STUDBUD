<?php
// videos.php
session_start();

// check if user is logged in
if(!isset($_SESSION['username'])){
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>StudyHub - Videos</title>
    <link rel="stylesheet" href="style.css"> <!-- use same CSS -->
</head>
<body>
    <?php include 'sidebar.php'; ?> <!-- your sidebar file -->

    <div class="content">
        <h2>Study Videos</h2>

        <div class="video-card">
            <h3>Integration Techniques (Maths)</h3>
            <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/VIDEO_ID1" 
                frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <div class="video-card">
            <h3>Organic Chemistry Basics</h3>
            <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/VIDEO_ID2" 
                frameborder="0" allowfullscreen>
            </iframe>
        </div>

        <div class="video-card">
            <h3>Cell Biology & Genetics</h3>
            <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/VIDEO_ID3" 
                frameborder="0" allowfullscreen>
            </iframe>
        </div>
    </div>
</body>
</html>
