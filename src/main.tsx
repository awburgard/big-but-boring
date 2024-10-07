import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import WeekViewContainer from './containers/WeekViewContainer.tsx'
import DayViewContainer from './containers/DayViewContainer.tsx'
import SignupContainer from './containers/SignUpContainer.tsx'
import LoginContainer from './containers/LoginContainer.tsx'
import SetupProgramContainer from './containers/SetUpProgramContainer.tsx'
import ProgramsContainer from './containers/ProgramsContainer.tsx'

import CssBaseline from '@mui/material/CssBaseline'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    children: [
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
      {
        path: '/programs',
        element: <ProgramsContainer />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </StrictMode>
)
