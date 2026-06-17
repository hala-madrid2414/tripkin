import { Navigate, Route, Routes } from 'react-router-dom'
import Bottle from '@/pages/Bottle'
import Map from '@/pages/Map'
import Match from '@/pages/Match'
import Mbti from '@/pages/Mbti'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mbti" replace />} />
      <Route path="/mbti" element={<Mbti />} />
      <Route path="/map" element={<Map />} />
      <Route path="/bottle" element={<Bottle />} />
      <Route path="/match" element={<Match />} />
    </Routes>
  )
}

export default AppRouter
