import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import WeekViewContainer from './containers/WeekViewContainer.tsx'
import DayViewContainer from './containers/DayViewContainer.tsx'
import SignupContainer from './containers/SignUpContainer.tsx'
import LoginContainer from './containers/LoginContainer.tsx'
import SetupProgramContainer from './containers/SetUpProgramContainer.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'sign-up',
    element: <SignupContainer />,
  },
  {
    path: 'login',
    element: <LoginContainer />,
  },

  {
    path: 'training-week',
    element: <WeekViewContainer />,
  },
  {
    path: 'day/:dayId',
    element: <DayViewContainer />,
  },
  {
    path: '/setup',
    element: <SetupProgramContainer />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
