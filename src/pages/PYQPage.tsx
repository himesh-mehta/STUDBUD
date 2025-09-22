import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  Star,
  Bookmark
} from 'lucide-react';

export default function PYQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedExam, setSelectedExam] = useState('all');

  const subjects = ['all', 'Physics', 'Mathematics', 'Chemistry', 'Biology'];
  const years = ['all', '2024', '2023', '2022', '2021', '2020'];
  const exams = ['all', 'JEE Main', 'JEE Advanced', 'NEET', 'CBSE Board', 'State Board'];

  const pyqs = [
    {
      id: 1,
      title: 'JEE Main Physics 2024',
      subject: 'Physics',
      exam: 'JEE Main',
      year: '2024',
      session: 'January',
      questions: 30,
      duration: '60 min',
      difficulty: 'Advanced',
      rating: 4.8,
      downloads: 2543,
      isBookmarked: true,
      topics: ['Mechanics', 'Thermodynamics', 'Optics'],
      description: 'Complete question paper with detailed solutions and marking scheme.'
    },
    {
      id: 2,
      title: 'NEET Biology 2023',
      subject: 'Biology',
      exam: 'NEET',
      year: '2023',
      session: 'Main',
      questions: 45,
      duration: '90 min',
      difficulty: 'Intermediate',
      rating: 4.7,
      downloads: 3421,
      isBookmarked: false,
      topics: ['Cell Biology', 'Genetics', 'Ecology'],
      description: 'Previous year NEET biology questions with comprehensive explanations.'
    },
    {
      id: 3,
      title: 'JEE Advanced Mathematics 2023',
      subject: 'Mathematics',
      exam: 'JEE Advanced',
      year: '2023',
      session: 'Paper 1',
      questions: 18,
      duration: '180 min',
      difficulty: 'Advanced',
      rating: 4.9,
      downloads: 1876,
      isBookmarked: true,
      topics: ['Calculus', 'Algebra', 'Coordinate Geometry'],
      description: 'Challenging mathematics problems from JEE Advanced with step-by-step solutions.'
    },
    {
      id: 4,
      title: 'CBSE Chemistry Class 12 2024',
      subject: 'Chemistry',
      exam: 'CBSE Board',
      year: '2024',
      session: 'Main',
      questions: 35,
      duration: '180 min',
      difficulty: 'Intermediate',
      rating: 4.6,
      downloads: 4532,
      isBookmarked: false,
      topics: ['Organic Chemistry', 'Physical Chemistry', 'Inorganic Chemistry'],
      description: 'CBSE board examination paper with marking scheme and sample answers.'
    },
    {
      id: 5,
      title: 'JEE Main Physics 2022',
      subject: 'Physics',
      exam: 'JEE Main',
      year: '2022',
      session: 'June',
      questions: 30,
      duration: '60 min',
      difficulty: 'Advanced',
      rating: 4.5,
      downloads: 1987,
      isBookmarked: true,
      topics: ['Waves', 'Modern Physics', 'Electromagnetism'],
      description: 'JEE Main physics paper with detailed analysis and solution strategies.'
    },
    {
      id: 6,
      title: 'NEET Chemistry 2023',
      subject: 'Chemistry',
      exam: 'NEET',
      year: '2023',
      session: 'Main',
      questions: 45,
      duration: '90 min',
      difficulty: 'Intermediate',
      rating: 4.4,
      downloads: 2876,
      isBookmarked: false,
      topics: ['Organic Reactions', 'Chemical Bonding', 'Thermodynamics'],
      description: 'NEET chemistry questions with explanations and important concepts.'
    }
  ];

  const filteredPYQs = pyqs.filter(pyq => {
    const matchesSearch = pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pyq.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || pyq.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || pyq.year === selectedYear;
    const matchesExam = selectedExam === 'all' || pyq.exam === selectedExam;
    return matchesSearch && matchesSubject && matchesYear && matchesExam;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}K`;
    }
    return downloads.toString();
  };

  const handleDownload = (pyqId: number) => {
    // In a real app, this would trigger the download
    console.log(`Downloading PYQ ${pyqId}`);
  };

  const handleView = (pyqId: number) => {
    // In a real app, this would open the PYQ viewer
    console.log(`Viewing PYQ ${pyqId}`);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Previous Year Questions</h1>
          <p className="text-gray-600">Access comprehensive collection of previous year examination papers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or topic..."
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
                className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {exams.map(exam => (
                  <option key={exam} value={exam}>
                    {exam === 'all' ? 'All Exams' : exam}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PYQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPYQs.map((pyq) => (
            <div key={pyq.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{pyq.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium text-blue-600">{pyq.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{pyq.exam}</span>
                    <span className="mx-2">•</span>
                    <span>{pyq.year}</span>
                  </div>
                </div>
                <button className={`p-2 rounded-lg transition-colors ${
                  pyq.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                }`}>
                  <Bookmark className="w-5 h-5" fill={pyq.isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Session and Description */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Session: {pyq.session}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{pyq.description}</p>
              </div>

              {/* Topics */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {pyq.topics.slice(0, 3).map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                      {topic}
                    </span>
                  ))}
                  {pyq.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">
                      +{pyq.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{pyq.questions}</span> questions
                </div>
                <div>
                  <span className="font-medium">{pyq.duration}</span> duration
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{pyq.rating}</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{formatDownloads(pyq.downloads)}</span>
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(pyq.difficulty)}`}>
                  {pyq.difficulty}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(pyq.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button
                  onClick={() => handleDownload(pyq.id)}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPYQs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}