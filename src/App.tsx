import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { NotFoundPage } from '@/pages/404page'
import { LoginPage } from '@/pages/LoginPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { AdminPage } from '@/pages/adminPage'
import { CategoriesPage } from '@/pages/categoriesPage'
import { ExploreEventsInYerevanPage } from '@/pages/explore-events-in-yerevan'
import { MainPage } from '@/pages/mainPage'
import { PasswordRecoveryPage } from '@/pages/passwordRecovery'
import { UserProfilePage } from '@/pages/userProfile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<MainPage />} />
          <Route path="explore-events" element={<ExploreEventsInYerevanPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
