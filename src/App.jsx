import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import HudLayout from './components/HudLayout';
import ContactPage from './pages/ContactPage';
import ExperiencePage from './pages/ExperiencePage';
import GitHubPage from './pages/GitHubPage';
import HeroPage from './pages/HeroPage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<HudLayout />}>
          <Route index element={<HeroPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="github" element={<GitHubPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
