import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useProgress } from '../contexts/ProgressContext';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Eye,
  Download,
  Bookmark
} from 'lucide-react';

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { readNote } = useProgress();

  const subjects = ['all', 'Physics', 'Mathematics', 'Chemistry', 'Biology'];

  const notes = [
    {
      id: 1,
      title: 'Quantum Mechanics Fundamentals',
      subject: 'Physics',
      topic: 'Quantum Physics',
      pages: 24,
      readTime: '45 min',
      difficulty: 'Advanced',
      rating: 4.8,
      downloads: 1234,
      lastUpdated: '2 days ago',
      isBookmarked: true,
      preview: 'Introduction to wave-particle duality, uncertainty principle, and quantum states...'
    },
    {
      id: 2,
      title: 'Calculus Integration Techniques',
      subject: 'Mathematics',
      topic: 'Calculus',
      pages: 18,
      readTime: '35 min',
      difficulty: 'Intermediate',
      rating: 4.6,
      downloads: 987,
      lastUpdated: '1 week ago',
      isBookmarked: false,
      preview: 'Comprehensive guide to integration by parts, substitution, and partial fractions...'
    },
    {
      id: 3,
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      pages: 32,
      readTime: '60 min',
      difficulty: 'Advanced',
      rating: 4.9,
      downloads: 1567,
      lastUpdated: '3 days ago',
      isBookmarked: true,
      preview: 'Detailed mechanisms of substitution, elimination, and addition reactions...'
    },
    {
      id: 4,
      title: 'Cell Biology and Genetics',
      subject: 'Biology',
      topic: 'Cell Biology',
      pages: 28,
      readTime: '50 min',
      difficulty: 'Intermediate',
      rating: 4.7,
      downloads: 876,
      lastUpdated: '5 days ago',
      isBookmarked: false,
      preview: 'Understanding cellular structures, DNA replication, and genetic inheritance...'
    },
    {
      id: 5,
      title: 'Thermodynamics Laws',
      subject: 'Physics',
      topic: 'Thermodynamics',
      pages: 20,
      readTime: '40 min',
      difficulty: 'Intermediate',
      rating: 4.5,
      downloads: 654,
      lastUpdated: '1 week ago',
      isBookmarked: false,
      preview: 'First, second, and third laws of thermodynamics with practical applications...'
    },
    {
      id: 6,
      title: 'Linear Algebra Matrices',
      subject: 'Mathematics',
      topic: 'Linear Algebra',
      pages: 22,
      readTime: '42 min',
      difficulty: 'Intermediate',
      rating: 4.4,
      downloads: 543,
      lastUpdated: '4 days ago',
      isBookmarked: true,
      preview: 'Matrix operations, determinants, eigenvalues, and eigenvectors explained...'
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleReadNote = (noteId: number) => {
    readNote();
    // In a real app, this would navigate to the note content
    console.log(`Reading note ${noteId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Notes</h1>
          <p className="text-gray-600">Access comprehensive notes for all your subjects</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title or topic..."
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

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{note.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium text-blue-600">{note.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{note.topic}</span>
                  </div>
                </div>
                <button className={`p-2 rounded-lg transition-colors ${
                  note.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                }`}>
                  <Bookmark className="w-5 h-5" fill={note.isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Preview */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.preview}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{note.pages} pages</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{note.readTime}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span>{note.rating}</span>
                </div>
              </div>

              {/* Difficulty and Downloads */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(note.difficulty)}`}>
                  {note.difficulty}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Download className="w-4 h-4 mr-1" />
                  <span>{note.downloads}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleReadNote(note.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Read Now
                </button>
                <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Last Updated */}
              <p className="text-xs text-gray-400 mt-3">Updated {note.lastUpdated}</p>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}