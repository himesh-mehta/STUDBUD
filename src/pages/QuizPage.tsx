import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Brain, 
  Search, 
  Filter, 
  Clock, 
  Trophy,
  Star,
  Play,
  CheckCircle,
  Target
} from 'lucide-react';

export default function QuizPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const { completeQuiz } = useProgress();

  const subjects = ['all', 'Physics', 'Mathematics', 'Chemistry', 'Biology'];

  const quizzes = [
    {
      id: 1,
      title: 'Quantum Mechanics Fundamentals',
      subject: 'Physics',
      topic: 'Quantum Physics',
      questions: 15,
      duration: 30,
      difficulty: 'Advanced',
      rating: 4.8,
      attempts: 1234,
      bestScore: 85,
      description: 'Test your understanding of quantum mechanics principles including wave-particle duality and uncertainty principle.',
      questions_data: [
        {
          question: "What is the fundamental principle behind wave-particle duality?",
          options: [
            "Particles can only exist as waves",
            "Light and matter exhibit both wave and particle properties",
            "Waves can only exist as particles",
            "Energy is always conserved"
          ],
          correct: 1
        },
        {
          question: "The Heisenberg uncertainty principle states that:",
          options: [
            "Energy and time cannot be measured simultaneously",
            "Position and momentum cannot be precisely determined simultaneously",
            "Wave and particle nature cannot coexist",
            "Quantum states are always uncertain"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: 'Calculus Integration',
      subject: 'Mathematics',
      topic: 'Calculus',
      questions: 12,
      duration: 25,
      difficulty: 'Intermediate',
      rating: 4.6,
      attempts: 987,
      bestScore: 92,
      description: 'Practice integration techniques including substitution, integration by parts, and partial fractions.',
      questions_data: [
        {
          question: "What is the integral of x²?",
          options: [
            "x³/3 + C",
            "2x + C",
            "x³ + C",
            "3x² + C"
          ],
          correct: 0
        }
      ]
    },
    {
      id: 3,
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      questions: 20,
      duration: 40,
      difficulty: 'Advanced',
      rating: 4.9,
      attempts: 1567,
      bestScore: 78,
      description: 'Comprehensive quiz on organic reaction mechanisms, stereochemistry, and synthesis.',
      questions_data: [
        {
          question: "Which mechanism is most likely for primary alkyl halides in nucleophilic substitution?",
          options: [
            "SN1",
            "SN2",
            "E1",
            "E2"
          ],
          correct: 1
        }
      ]
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartQuiz = (quizId: number) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (quiz && currentQuestion < quiz.questions_data.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    completeQuiz();
  };

  const calculateScore = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return 0;
    
    let correct = 0;
    quiz.questions_data.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++;
      }
    });
    
    return Math.round((correct / quiz.questions_data.length) * 100);
  };

  if (selectedQuiz && !showResults) {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return null;

    const question = quiz.questions_data[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions_data.length) * 100;

    return (
      <Layout>
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  Exit Quiz
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {quiz.questions_data.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h2>
              
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === quiz.questions_data.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (showResults) {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    const score = calculateScore();
    
    return (
      <Layout>
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
                <p className="text-gray-600">{quiz?.title}</p>
              </div>

              <div className="mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
                <p className="text-gray-600">Your Score</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{Object.keys(selectedAnswers).length}</div>
                  <p className="text-gray-600">Questions Answered</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {quiz?.questions_data.filter((q, i) => selectedAnswers[i] === q.correct).length}
                  </div>
                  <p className="text-gray-600">Correct Answers</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {quiz?.questions_data.filter((q, i) => selectedAnswers[i] !== q.correct).length}
                  </div>
                  <p className="text-gray-600">Incorrect Answers</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleStartQuiz(selectedQuiz!)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="px-6 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl"
                >
                  Back to Quizzes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Quizzes</h1>
          <p className="text-gray-600">Test your knowledge and track your progress</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes by title or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              {/* Header */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{quiz.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span className="font-medium text-blue-600">{quiz.subject}</span>
                  <span className="mx-2">•</span>
                  <span>{quiz.topic}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{quiz.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Brain className="w-4 h-4 mr-2" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{quiz.duration} min</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>{quiz.rating}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{quiz.attempts} attempts</span>
                </div>
              </div>

              {/* Difficulty and Best Score */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
                {quiz.bestScore && (
                  <div className="flex items-center text-sm text-green-600">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span>Best: {quiz.bestScore}%</span>
                  </div>
                )}
              </div>

              {/* Start Quiz Button */}
              <button
                onClick={() => handleStartQuiz(quiz.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Quiz
              </button>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}