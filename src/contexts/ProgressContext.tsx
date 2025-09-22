import React, { createContext, useContext, useState, useEffect } from 'react';

interface Progress {
  totalStudyTime: number;
  completedQuizzes: number;
  notesRead: number;
  videosWatched: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface ProgressContextType {
  progress: Progress;
  updateProgress: (type: keyof Progress, value: number) => void;
  addStudyTime: (minutes: number) => void;
  completeQuiz: () => void;
  readNote: () => void;
  watchVideo: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>({
    totalStudyTime: 0,
    completedQuizzes: 0,
    notesRead: 0,
    videosWatched: 0,
    currentStreak: 0,
    weeklyGoal: 20, // hours
    weeklyProgress: 0
  });

  useEffect(() => {
    const storedProgress = localStorage.getItem('progress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (type: keyof Progress, value: number) => {
    setProgress(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const addStudyTime = (minutes: number) => {
    setProgress(prev => ({
      ...prev,
      totalStudyTime: prev.totalStudyTime + minutes,
      weeklyProgress: prev.weeklyProgress + (minutes / 60)
    }));
  };

  const completeQuiz = () => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: prev.completedQuizzes + 1
    }));
  };

  const readNote = () => {
    setProgress(prev => ({
      ...prev,
      notesRead: prev.notesRead + 1
    }));
  };

  const watchVideo = () => {
    setProgress(prev => ({
      ...prev,
      videosWatched: prev.videosWatched + 1
    }));
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateProgress,
      addStudyTime,
      completeQuiz,
      readNote,
      watchVideo
    }}>
      {children}
    </ProgressContext.Provider>
  );
};