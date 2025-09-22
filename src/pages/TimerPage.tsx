import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Coffee, 
  Brain,
  CheckCircle,
  Circle,
  Plus,
  Trash2
} from 'lucide-react';

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessions, setSessions] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState<{id: number, text: string, completed: boolean}[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { addStudyTime } = useProgress();

  const focusTimeSeconds = focusTime * 60;
  const breakTimeSeconds = breakTime * 60;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completed
      if (mode === 'focus') {
        setSessions(prev => prev + 1);
        addStudyTime(focusTime);
        setMode('break');
        setTimeLeft(breakTimeSeconds);
      } else {
        setMode('focus');
        setTimeLeft(focusTimeSeconds);
      }
      setIsActive(false);
      
      // Play notification sound (in a real app)
      console.log('Timer completed!');
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, mode, focusTime, breakTime, addStudyTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? focusTimeSeconds : breakTimeSeconds);
  };

  const switchMode = (newMode: 'focus' | 'break') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? focusTimeSeconds : breakTimeSeconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'focus' 
    ? ((focusTimeSeconds - timeLeft) / focusTimeSeconds) * 100
    : ((breakTimeSeconds - timeLeft) / breakTimeSeconds) * 100;

  const addTask = () => {
    if (currentTask.trim()) {
      setTasks(prev => [...prev, {
        id: Date.now(),
        text: currentTask.trim(),
        completed: false
      }]);
      setCurrentTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Focus Timer</h1>
              <p className="text-gray-600">Stay focused and productive with the Pomodoro technique</p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timer Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                {/* Mode Selector */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-100 p-1 rounded-2xl flex">
                    <button
                      onClick={() => switchMode('focus')}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center ${
                        mode === 'focus'
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Focus
                    </button>
                    <button
                      onClick={() => switchMode('break')}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center ${
                        mode === 'break'
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Coffee className="w-4 h-4 mr-2" />
                      Break
                    </button>
                  </div>
                </div>

                {/* Timer Display */}
                <div className="relative mb-12">
                  <div className="w-80 h-80 mx-auto relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                        className={mode === 'focus' ? 'text-blue-500' : 'text-green-500'}
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-mono font-bold text-gray-900 mb-2">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-gray-600 text-lg capitalize">
                          {mode} Session
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center space-x-4 mb-8">
                  <button
                    onClick={toggleTimer}
                    className={`px-8 py-4 rounded-2xl font-semibold text-white flex items-center transition-all duration-200 transform hover:scale-105 ${
                      mode === 'focus'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause  
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="px-8 py-4 rounded-2xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center transition-all duration-200 transform hover:scale-105"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </button>
                </div>

                {/* Session Progress */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-center items-center space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < sessions ? 'bg-blue-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-gray-600 text-sm ml-4">
                      {sessions}/4 sessions completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timer Settings</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Focus Time (minutes)
                      </label>
                      <input
                        type="number"
                        value={focusTime}
                        onChange={(e) => setFocusTime(parseInt(e.target.value) || 25)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        max="60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Break Time (minutes)
                      </label>
                      <input
                        type="number"
                        value={breakTime}
                        onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        max="30"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Task Management */}
            <div className="space-y-6">
              {/* Add Task */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Pending Tasks */}
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Circle className="w-5 h-5" />
                      </button>
                      <span className="flex-1 text-gray-900">{task.text}</span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Completed ({completedTasks.length})
                  </h3>
                  <div className="space-y-2">
                    {completedTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="flex-1 text-gray-600 line-through">{task.text}</span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Today's Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Focus Sessions</span>
                    <span className="font-semibold text-gray-900">{sessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Study Time</span>
                    <span className="font-semibold text-gray-900">{sessions * focusTime} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="font-semibold text-gray-900">{completedTasks.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tasks Remaining</span>
                    <span className="font-semibold text-gray-900">{pendingTasks.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}