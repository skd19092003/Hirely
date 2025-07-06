import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Applayout from './layouts/app-layout';
import Landingpage from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Jobpage from './pages/job';
import Joblisting from './pages/job-listing';
import Myjobs from './pages/my-jobs';
import Postjob from './pages/post-job';
import Savedjobs from './pages/saved-job';
import { ThemeProvider } from './components/theme-provider';
import Protectedroute from './components/protected-route';
import StarfieldBackground from './components/StarfieldBackground';
import RemotiveRemoteJobs from './pages/remotiveRemoteJobs';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: '/',
        element: <Landingpage />

      },
      {
        path: '/onboarding',

        element: (
          <Protectedroute>
            <Onboarding />
          </Protectedroute>
        ),
      },
      {
        path: '/job/:id',
        element: (
          <Protectedroute>
            <Jobpage />
          </Protectedroute>
        ),
      },
      {
        path: '/job-listing',
        element: (
          <Protectedroute>
            <Joblisting />
          </Protectedroute>
        ),
      },
      {
        path: '/my-jobs',
        element: (
          <Protectedroute>
            <Myjobs />
          </Protectedroute>
        ),
      },
      {
        path: '/post-job',
        element: (
          <Protectedroute>
            <Postjob />
          </Protectedroute>
        ),
      },
      {
        path: '/saved-job',
        element: (
          <Protectedroute>
            <Savedjobs />
          </Protectedroute>
        ),
      },
      {
        path: '/remotiveRemoteJobs',
        element: (
          <Protectedroute>
            <RemotiveRemoteJobs />
          </Protectedroute>
        ),
      }
    ]
  }
])

function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    //   <RouterProvider router={router} />
    // </ThemeProvider>

   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StarfieldBackground />
      <RouterProvider router={router} />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
    
    // ✅ So What Happens?
// When App.jsx renders, the <Starfield /> is mounted and renders the canvas first
// All your other content (from shadcn UI or pages) renders on top of it
// Since the canvas is fixed and behind everything, it becomes a moving background layer


  );
}
export default App
