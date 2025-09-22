<?php
session_start();

// Redirect to login if user is not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: test_login.php");
    exit();
}

// Optional: get user info
$user_name = $_SESSION['user_name'] ?? "Student";
$user_email = $_SESSION['user_email'] ?? "student@example.com";
?>



<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>StudyHub - Student Learning Platform</title>
    <link rel="stylesheet" href="styles/main.css" />
    <link rel="stylesheet" href="styles/themes.css" />
     <link rel="stylesheet" href="styles/charts.css" />

     <style>
/* Logout button styling */
.btn-logout {
    display: inline-block;
    padding: 10px 20px;
    background-color: #EF4444; /* red color for logout */
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.3s, transform 0.2s;
    cursor: pointer;
    text-align: center;
}

.btn-logout:hover {
    background-color: #B91C1C; /* darker red on hover */
    transform: scale(1.05);
}
</style>

   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>  
  </head>
  <body>
    <!-- Theme Customizer -->
    <div id="themeCustomizer" class="theme-customizer">
      <button id="themeToggle" class="theme-toggle">🎨</button>
      <div class="theme-panel">
        <h3>Customize Theme</h3>
        <div class="color-picker">
          <label>Primary Color:</label>
          <input type="color" id="primaryColor" value="#3b82f6" />
        </div>
        <div class="color-picker">
          <label>Secondary Color:</label>
          <input type="color" id="secondaryColor" value="#10b981" />
        </div>
        <div class="color-picker">
          <label>Background:</label>
          <input type="color" id="backgroundColor" value="#f8fafc" />
        </div>
        <div class="preset-themes">
          <h4>Preset Themes</h4>
          <button class="preset-btn" data-theme="blue">Ocean Blue</button>
          <button class="preset-btn" data-theme="purple">Royal Purple</button>
          <button class="preset-btn" data-theme="green">Forest Green</button>
          <button class="preset-btn" data-theme="orange">Sunset Orange</button>
          <button class="preset-btn" data-theme="pink">Cherry Blossom</button>
          <button class="preset-btn" data-theme="dark">Dark Mode</button>
        </div>
        <button id="resetTheme">Reset to Default</button>
      </div>
    </div>





    <!-- Main App -->
    <div id="mainApp" class="main-app">
      <!-- Sidebar -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <h1>📚 StudyHub</h1>
        </div>
        <ul class="nav-menu">
          <li>
            <a href="#" data-page="dashboard" class="nav-link active"
              >📊 Dashboard</a
            >
          </li>
          <li>
            <a href="#" data-page="analytics" class="nav-link">📈 Analytics</a>
          </li>
          <li><a href="#" data-page="notes" class="nav-link">📝 Notes</a></li>
          <li><a href="#" data-page="videos" class="nav-link">🎥 Videos</a></li>
          <li><a href="#" data-page="quiz" class="nav-link">🧠 Quiz</a></li>
          <li><a href="#" data-page="timer" class="nav-link">⏰ Timer</a></li>
        </ul>
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">👤</div>
            <div class="user-details">
            <span id="userName"><?php echo htmlspecialchars($user_name); ?></span>
<small id="userEmail"><?php echo htmlspecialchars($user_email); ?></small>

            </div>
          </div>
         <a href="logout.php" class="btn-logout">Logout</a>

        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Dashboard -->
        <div id="dashboardContent" class="content-section active">
          <div class="page-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your learning progress</p>
          </div>

          <!-- Quick Stats -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-info">
                <h3 id="totalStudyTime">0</h3>
                <p>Hours Studied</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <div class="stat-info">
                <h3 id="chaptersCompleted">0</h3>
                <p>Chapters Completed</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📖</div>
              <div class="stat-info">
                <h3 id="lessonsCompleted">0</h3>
                <p>Lessons Completed</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">💡</div>
              <div class="stat-info">
                <h3 id="conceptsLearned">0</h3>
                <p>Concepts Learned</p>
              </div>
            </div>
          </div>

          <!-- Progress Overview -->
          <div class="dashboard-grid">
            <div class="card">
              <h3>Weekly Study Progress</h3>
              <canvas id="weeklyProgressChart"></canvas>
            </div>
            <div class="card">
              <h3>Subject Distribution</h3>
              <canvas id="subjectChart"></canvas>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <h3>Recent Activity</h3>
            <div id="recentActivity" class="activity-list">
              <!-- Activity items will be populated by JavaScript -->
            </div>
          </div>
        </div>

        

        <!-- Analytics -->
        <div id="analyticsContent" class="content-section">
          <div class="page-header">
            <h1>Detailed Analytics</h1>
            <p>Comprehensive insights into your learning journey</p>
          </div>

          <!-- Time Period Selector -->
          <div class="analytics-controls">
            <select id="timePeriod">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <!-- Detailed Stats -->
          <div class="detailed-stats">
            <div class="stat-row">
              <div class="stat-item">
                <h4>Total Study Duration</h4>
                <div class="stat-value" id="detailedStudyTime">0h 0m</div>
                <div class="stat-change positive">+12% from last period</div>
              </div>
              <div class="stat-item">
                <h4>Average Session Length</h4>
                <div class="stat-value" id="avgSessionLength">0m</div>
                <div class="stat-change positive">+5% from last period</div>
              </div>
              <div class="stat-item">
                <h4>Study Streak</h4>
                <div class="stat-value" id="studyStreak">0 days</div>
                <div class="stat-change neutral">Current streak</div>
              </div>
            </div>
          </div>

          <!-- Charts Grid -->
          <div class="charts-grid">
            <div class="chart-card">
              <h3>Daily Study Time</h3>
              <canvas id="dailyStudyChart"></canvas>
            </div>
            <div class="chart-card">
              <h3>Chapter Progress by Subject</h3>
              <canvas id="chapterProgressChart"></canvas>
            </div>
            <div class="chart-card">
              <h3>Concept Mastery</h3>
              <canvas id="conceptMasteryChart"></canvas>
            </div>
            <div class="chart-card">
              <h3>Learning Velocity</h3>
              <canvas id="learningVelocityChart"></canvas>
            </div>
          </div>

          <!-- Progress Breakdown -->
          <div class="progress-breakdown">
            <h3>Subject-wise Progress</h3>
            <div id="subjectProgress" class="subject-progress">
              <!-- Subject progress bars will be populated by JavaScript -->
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div id="notesContent" class="content-section">
          <div class="page-header">
            <h1>Study Notes</h1>
            <p>Access your comprehensive study materials</p>
          </div>
          <div class="notes-grid" id="notesGrid">
            <!-- Notes will be populated by JavaScript -->
          </div>
        </div>

        <!-- Videos -->
        <div id="videosContent" class="content-section">
          <div class="page-header">
            <h1>Video Lectures</h1>
            <p>Learn from expert instructors</p>
          </div>
          <div class="videos-grid" id="videosGrid">
            <!-- Videos will be populated by JavaScript -->
          </div>
        </div>

        <!-- Quiz -->
        <div id="quizContent" class="content-section">
          <div class="page-header">
            <h1>Practice Quizzes</h1>
            <p>Test your knowledge and track progress</p>
          </div>
          <div id="quizContainer">
            <!-- Quiz content will be populated by JavaScript -->
          </div>
        </div>

        <!-- Timer -->
        <div id="timerContent" class="content-section">
          <div class="page-header">
            <h1>Focus Timer</h1>
            <p>Stay focused with the Pomodoro technique</p>
          </div>
          <div class="timer-container">
            <div class="timer-display">
              <div class="timer-circle">
                <svg class="timer-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" class="timer-bg"></circle>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    class="timer-progress"
                    id="timerProgress"
                  ></circle>
                </svg>
                <div class="timer-text">
                  <div id="timerTime">25:00</div>
                  <div id="timerMode">Focus</div>
                </div>
              </div>
            </div>
            <div class="timer-controls">
              <button id="startTimer" class="btn-primary">Start</button>
              <button id="pauseTimer" class="btn-secondary">Pause</button>
              <button id="resetTimer" class="btn-secondary">Reset</button>
            </div>
            <div class="timer-stats">
              <div class="timer-stat">
                <span>Sessions Today</span>
                <span id="sessionsToday">0</span>
              </div>
              <div class="timer-stat">
                <span>Focus Time</span>
                <span id="focusTimeToday">0m</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>




    <script src="js/data.js"></script>
    <script src="js/charts.js"></script>
    <script src="js/themes.js"></script>
    <!-- <script src="js/auth.js"></script> -->
    <script src="js/timer.js"></script>
    <script src="js/app.js"></script> 
  </body>
</html>




