import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  Eye,
  Star,
  Bookmark,
  PlayCircle
} from 'lucide-react';

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { watchVideo } = useProgress();

  const subjects = ['all', 'Physics', 'Mathematics', 'Chemistry', 'Biology'];

  const videos = [
    {
      id: 1,
      title: 'Quantum Mechanics: Wave-Particle Duality',
      subject: 'Physics',
      topic: 'Quantum Physics',
      duration: '45:32',
      views: 12543,
      rating: 4.8,
      instructor: 'Dr. Sarah Johnson',
      difficulty: 'Advanced',
      isBookmarked: true,
      thumbnail: 'https://images.pexels.com/photos/8471918/pexels-photo-8471918.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Comprehensive explanation of wave-particle duality with real-world examples and mathematical derivations.'
    },
    {
      id: 2,
      title: 'Calculus: Integration by Parts',
      subject: 'Mathematics',
      topic: 'Calculus',
      duration: '32:15',
      views: 8976,
      rating: 4.6,
      instructor: 'Prof. Michael Chen',
      difficulty: 'Intermediate',
      isBookmarked: false,
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Step-by-step guide to integration by parts with multiple solved examples and practice problems.'
    },
    {
      id: 3,
      title: 'Organic Chemistry: Reaction Mechanisms',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      duration: '58:47',
      views: 15632,
      rating: 4.9,
      instructor: 'Dr. Emily Rodriguez',
      difficulty: 'Advanced',
      isBookmarked: true,
      thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Detailed analysis of organic reaction mechanisms including substitution and elimination reactions.'
    },
    {
      id: 4,
      title: 'Cell Biology: DNA Replication',
      subject: 'Biology',
      topic: 'Cell Biology',
      duration: '41:23',
      views: 9854,
      rating: 4.7,
      instructor: 'Dr. James Wilson',
      difficulty: 'Intermediate',
      isBookmarked: false,
      thumbnail: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Understanding DNA replication process, enzymes involved, and molecular mechanisms.'
    },
    {
      id: 5,
      title: 'Thermodynamics: First Law Applications',
      subject: 'Physics',
      topic: 'Thermodynamics',
      duration: '36:18',
      views: 7234,
      rating: 4.5,
      instructor: 'Prof. Lisa Anderson',
      difficulty: 'Intermediate',
      isBookmarked: false,
      thumbnail: 'https://images.pexels.com/photos/8471918/pexels-photo-8471918.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Practical applications of the first law of thermodynamics with solved problems.'
    },
    {
      id: 6,
      title: 'Linear Algebra: Matrix Operations',
      subject: 'Mathematics',
      topic: 'Linear Algebra',
      duration: '44:56',
      views: 6789,
      rating: 4.4,
      instructor: 'Dr. Robert Kim',
      difficulty: 'Intermediate',
      isBookmarked: true,
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete guide to matrix operations including multiplication, determinants, and inverses.'
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || video.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleWatchVideo = (videoId: number) => {
    watchVideo();
    // In a real app, this would open the video player
    console.log(`Watching video ${videoId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Lectures</h1>
          <p className="text-gray-600">Learn from expert instructors with high-quality video content</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos by title, topic, or instructor..."
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

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 overflow-hidden">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                     onClick={() => handleWatchVideo(video.id)}>
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                <button className={`absolute top-2 right-2 p-2 rounded-lg transition-colors ${
                  video.isBookmarked ? 'text-yellow-500 bg-black bg-opacity-50' : 'text-white bg-black bg-opacity-50 hover:text-yellow-500'
                }`}>
                  <Bookmark className="w-5 h-5" fill={video.isBookmarked ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Subject */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium text-blue-600">{video.subject}</span>
                    <span className="mx-2">•</span>
                    <span>{video.topic}</span>
                  </div>
                </div>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mb-3">by {video.instructor}</p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{formatViews(video.views)} views</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    <span>{video.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </span>
                </div>

                {/* Watch Button */}
                <button
                  onClick={() => handleWatchVideo(video.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
}