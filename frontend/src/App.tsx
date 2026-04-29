import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { Layout } from './Layout';
import { LoreDocPage } from './lore/LoreDocPage';
import { LoreHomePage } from './lore/LoreHomePage';
import { LoreSectionPage } from './lore/LoreSectionPage';
import { QuizPage } from './quiz/QuizPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="kviz" element={<QuizPage />} />
        <Route path="lore">
          <Route index element={<LoreHomePage />} />
          <Route path=":category" element={<LoreSectionPage />} />
          <Route path=":category/:slug" element={<LoreDocPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function NotFound() {
  return <main style={{ padding: '64px 24px', textAlign: 'center' }}>Stránka nenalezena.</main>;
}
