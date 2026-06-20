import Bottle from '@/pages/Bottle'
import Home from '@/pages/Home'
import Map from '@/pages/Map'
import Match from '@/pages/Match'
import Mbti from '@/pages/Mbti'
import Profile from '@/pages/Profile'
import { Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mbti" element={<Mbti view="welcome" />} />
      <Route path="/mbti/test" element={<Mbti view="quiz" />} />
      <Route path="/mbti/result" element={<Mbti view="result" />} />
      <Route path="/map" element={<Map />} />
      <Route path="/bottle" element={<Bottle />} />
      <Route path="/match" element={<Match />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default AppRouter
