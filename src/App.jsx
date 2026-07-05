import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import AssessmentPage from './pages/AssessmentPage';
import VerifyPage from './pages/VerifyPage';

export default function App() {
  return (
    <div className="min-h-screen bg-nova-bg">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
      <footer className="mx-auto max-w-5xl px-6 py-10 text-center text-xs text-nova-muted font-mono">
        Nova Base — a digital literacy launchpad. Built with React, Vite & Tailwind.
      </footer>
    </div>
  );
}
