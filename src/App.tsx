import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SAMPLE_FEEDBACKS } from './data/sampleFeedbacks';
import { FeedbackFormPage } from './pages/FeedbackFormPage';
import { HomePage } from './pages/HomePage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';
import {
  FeedbackItem,
  FeedbackStatus,
  FeedbackTopic,
  PageId,
} from './types/feedback';

const STORAGE_KEY = 'doubleshot_voice_feedbacks_v1';

function loadInitialFeedbacks(): FeedbackItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return SAMPLE_FEEDBACKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback to sample data if storage is unavailable or corrupted
  }
  return SAMPLE_FEEDBACKS;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(loadInitialFeedbacks);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
    } catch {
      // Ignore storage write errors in restricted browsing modes
    }
  }, [feedbacks]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateFeedback = (data: {
    rating: 1 | 2 | 3 | 4 | 5;
    topics: FeedbackTopic[];
    details: string;
    customerName: string;
  }): FeedbackItem => {
    const maxNumericId = feedbacks.reduce((max, item) => {
      const parsed = Number.parseInt(item.id, 10);
      return Number.isNaN(parsed) ? max : Math.max(max, parsed);
    }, 1000);

    const newItem: FeedbackItem = {
      id: String(maxNumericId + 1),
      rating: data.rating,
      topics: data.topics,
      details: data.details,
      customerName: data.customerName,
      createdAt: new Date().toISOString(),
      status: 'รอดำเนินการ',
    };

    setFeedbacks((prev) => [newItem, ...prev]);
    return newItem;
  };

  const handleUpdateStatus = (id: string, status: FeedbackStatus) => {
    setFeedbacks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleUpdateStaffNote = (id: string, note: string) => {
    setFeedbacks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, staffNote: note.length > 0 ? note : undefined }
          : item
      )
    );
  };

  const handleResetSampleData = () => {
    setFeedbacks(SAMPLE_FEEDBACKS);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6F0] text-[#2C1A10]">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage feedbacks={feedbacks} onNavigate={handleNavigate} />
        )}
        {currentPage === 'submit' && (
          <FeedbackFormPage
            onSubmitFeedback={handleCreateFeedback}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'dashboard' && (
          <StaffDashboardPage
            feedbacks={feedbacks}
            onUpdateStatus={handleUpdateStatus}
            onUpdateStaffNote={handleUpdateStaffNote}
            onResetSampleData={handleResetSampleData}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
