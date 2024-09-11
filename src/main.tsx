import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { SignUp } from './components/SignUp.tsx'
import { Login } from './components/Login.tsx'
import { SetupProgram } from './components/SetupProgram.tsx'
import { TrainingWeek } from './components/TrainingWeek.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'setup',
    element: <SetupProgram />,
  },
  {
    path: 'training-week',
    element: <TrainingWeek />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
