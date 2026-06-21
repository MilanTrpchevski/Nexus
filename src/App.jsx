import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import PrivacyPage from './PrivacyPage'
import LanguageLayout from './i18n/LanguageLayout'
import RootRedirect from './i18n/RootRedirect'
import PageviewTracker from './PageviewTracker'

export default function App() {
  return (
    <BrowserRouter>
      <PageviewTracker />
      <Routes>
        {/* "/" → redirects to /en or /mk based on saved/browser preference */}
        <Route path="/" element={<RootRedirect />} />

        {/* "/en" and "/mk" both render the same page, language synced via LanguageLayout */}
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>

        {/* Any unknown path falls back to root redirect logic */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}
