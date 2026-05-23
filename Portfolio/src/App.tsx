import { Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import Resume from './pages/Resume'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
