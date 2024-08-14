import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import DisplayAllData from './pages/DisplayAllData'
import EditUser from './pages/EditPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/register-page" element={<RegisterPage />} />
      <Route path="/data-page" element={<DisplayAllData />} />
      <Route path="/data-page/:user_id" element={<EditUser />} />
      <Route path="/data-page/*" element={<NotFound />} />
    </Routes>
  )
}

