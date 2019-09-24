import { RegisterPage } from './pages/register'
import { LoginPage } from './pages/login'
import { AccountPage } from './pages/account'

export const accountRoutes = () => [
  {
    path: '/account',
    exact: true,
    component: AccountPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
]
