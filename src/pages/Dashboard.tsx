import React from 'react';
import Layout from '../components/Layout';
import { useProgress } from '../contexts/ProgressContext';
import { 
  BookOpen, 
  Play, 
  Brain, 
  Clock, 
  Trophy, 
  TrendingUp,
  Target,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function Dashboard() {
  const { progress } = useProgress();

  const quickActions = [
    { 
      title: 'Continue Reading', 
      subtitle: 'Physics - Quantum Mechanics', 
      icon: BookOpen, 
      color: 'bg-blue-500',
      href: '/notes'
    },
    { 
      title: 'Watch Lecture', 
      subtitle: 'Mathematics - Calculus', 
      icon: Play, 
      color: 'bg-red-500',
      href: '/videos'
    },
    { 
      title: 'Take Quiz', 
      subtitle: 'Chemistry - Organic', 
      icon: Brain, 
      color: 'bg-green-500',
      href: '/quiz'
    },
    { 
      title: 'Study Timer', 
      subtitle: 'Focus Session', 
      icon: Clock, 
      color: 'bg-purple-500',
      href: '/timer'
    },
  ];

  const stats = [
    { 
      label: 'Study Hours', 
      value: Math.floor(progress.totalStudyTime / 60), 
      icon: Clock, 
      color: 'text-blue-600',
      change: '+12%'
    },
    { 
      label: 'Quizzes Completed', 
      value: progress.completedQuizzes, 
      icon: Brain, 
      color: 'text-green-600',
      change: '+8%'
    },
    { 
      label: 'Notes Read', 
      value: progress.notesRead, 
      icon: BookOpen, 
      color: 'text-purple-600',
      change: '+15%'
    },
    { 
      label: 'Current Streak', 
      value: progress.currentStreak, 
      icon: Trophy, 
      color: 'text-orange-600',
      change: '+2 days'
    },
  ];

  const recentActivity = [
    { type: 'quiz', subject: 'Physics', topic: 'Thermodynamics', score: 85, time: '2 hours ago' },
    { type: 'video', subject: 'Mathematics', topic: 'Linear Algebra', duration: '45 min', time: '4 hours ago' },
    { type: 'notes', subject: 'Chemistry', topic: 'Chemical Bonding', pages: 12, time: '1 day ago' },
    { type: 'quiz', subject: 'Biology', topic: 'Cell Structure', score: 92, time: '2 days ago' },
  ];

  const upcomingDeadlines = [
    { subject: 'Physics', assignment: 'Lab Report', due: 'Tomorrow', priority: 'high' },
    { subject: 'Mathematics', assignment: 'Problem Set 5', due: '3 days', priority: 'medium' },
    { subject: 'Chemistry', assignment: 'Research Paper', due: '1 week', priority: 'low' },
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Study Goal: {progress.weeklyGoal} hours</span>
              <span>{progress.weeklyProgress.toFixed(1)}/{progress.weeklyGoal} hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((progress.weeklyProgress / progress.weeklyGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {progress.weeklyProgress >= progress.weeklyGoal 
              ? '🎉 Congratulations! You\'ve reached your weekly goal!' 
              : `${(progress.weeklyGoal - progress.weeklyProgress).toFixed(1)} hours remaining to reach your goal`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    activity.type === 'quiz' ? 'bg-green-100' :
                    activity.type === 'video' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'quiz' && <Brain className="w-5 h-5 text-green-600" />}
                    {activity.type === 'video' && <Play className="w-5 h-5 text-red-600" />}
                    {activity.type === 'notes' && <BookOpen className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.subject} - {activity.topic}</p>
                    <p className="text-sm text-gray-600">
                      {'score' in activity && `Score: ${activity.score}%`}
                      {'duration' in activity && `Duration: ${activity.duration}`}
                      {'pages' in activity && `${activity.pages} pages read`}
                      {' • ' + activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{deadline.assignment}</p>
                    <p className="text-sm text-gray-600">{deadline.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{deadline.due}</p>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                      deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {deadline.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}