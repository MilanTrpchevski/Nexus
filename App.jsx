import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import LanguageLayout from './i18n/LanguageLayout'
import RootRedirect from './i18n/RootRedirect'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* "/" → redirects to /en or /mk based on saved/browser preference */}
        <Route path="/" element={<RootRedirect />} />

        {/* "/en" and "/mk" both render the same page, language synced via LanguageLayout */}
        <Route path="/:lang" element={<LanguageLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Any unknown path falls back to root redirect logic */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}
