// Pomodoro Timer Management
class TimerManager {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentTime = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.mode = 'focus'; // 'focus' or 'break'
        this.sessionsCompleted = 0;
        this.focusTimeToday = 0;
        this.interval = null;
        
        this.focusDuration = 25 * 60; // 25 minutes
        this.breakDuration = 5 * 60; // 5 minutes
        
        this.init();
    }
    
    init() {
        this.loadSavedData();
        this.setupEventListeners();
        this.updateDisplay();
        this.updateStats();
    }
    
    loadSavedData() {
        const savedData = localStorage.getItem('studyhub-timer-data');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.sessionsCompleted = data.sessionsCompleted || 0;
            this.focusTimeToday = data.focusTimeToday || 0;
        }
    }
    
    saveData() {
        const data = {
            sessionsCompleted: this.sessionsCompleted,
            focusTimeToday: this.focusTimeToday,
            lastSaved: new Date().toDateString()
        };
        localStorage.setItem('studyhub-timer-data', JSON.stringify(data));
    }
    
    setupEventListeners() {
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        const resetBtn = document.getElementById('resetTimer');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.start();
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.pause();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.reset();
            });
        }
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isPaused = false;
            
            this.interval = setInterval(() => {
                this.tick();
            }, 1000);
            
            this.updateButtons();
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.isPaused = true;
            clearInterval(this.interval);
            this.updateButtons();
        }
    }
    
    reset() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.interval);
        
        if (this.mode === 'focus') {
            this.currentTime = this.focusDuration;
            this.totalTime = this.focusDuration;
        } else {
            this.currentTime = this.breakDuration;
            this.totalTime = this.breakDuration;
        }
        
        this.updateDisplay();
        this.updateButtons();
    }
    
    tick() {
        if (this.currentTime > 0) {
            this.currentTime--;
            this.updateDisplay();
        } else {
            this.complete();
        }
    }
    
    complete() {
        this.isRunning = false;
        clearInterval(this.interval);
        
        if (this.mode === 'focus') {
            // Focus session completed
            this.sessionsCompleted++;
            this.focusTimeToday += 25; // Add 25 minutes
            this.switchToBreak();
            this.showNotification('Focus session completed! Time for a break.');
        } else {
            // Break completed
            this.switchToFocus();
            this.showNotification('Break time over! Ready for another focus session?');
        }
        
        this.saveData();
        this.updateStats();
        this.updateButtons();
        this.playNotificationSound();
    }
    
    switchToFocus() {
        this.mode = 'focus';
        this.currentTime = this.focusDuration;
        this.totalTime = this.focusDuration;
        this.updateDisplay();
    }
    
    switchToBreak() {
        this.mode = 'break';
        this.currentTime = this.breakDuration;
        this.totalTime = this.breakDuration;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const timeDisplay = document.getElementById('timerTime');
        const modeDisplay = document.getElementById('timerMode');
        const progressCircle = document.getElementById('timerProgress');
        
        if (timeDisplay) {
            const minutes = Math.floor(this.currentTime / 60);
            const seconds = this.currentTime % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (modeDisplay) {
            modeDisplay.textContent = this.mode === 'focus' ? 'Focus' : 'Break';
        }
        
        if (progressCircle) {
            const progress = ((this.totalTime - this.currentTime) / this.totalTime) * 283;
            progressCircle.style.strokeDashoffset = 283 - progress;
        }
    }
    
    updateButtons() {
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        
        if (startBtn && pauseBtn) {
            if (this.isRunning) {
                startBtn.style.display = 'none';
                pauseBtn.style.display = 'inline-block';
            } else {
                startBtn.style.display = 'inline-block';
                pauseBtn.style.display = 'none';
                
                if (this.isPaused) {
                    startBtn.textContent = 'Resume';
                } else {
                    startBtn.textContent = 'Start';
                }
            }
        }
    }
    
    updateStats() {
        const sessionsDisplay = document.getElementById('sessionsToday');
        const focusTimeDisplay = document.getElementById('focusTimeToday');
        
        if (sessionsDisplay) {
            sessionsDisplay.textContent = this.sessionsCompleted;
        }
        
        if (focusTimeDisplay) {
            focusTimeDisplay.textContent = `${this.focusTimeToday}m`;
        }
    }
    
    showNotification(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'timer-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    playNotificationSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }
}

// Initialize timer manager
let timerManager;