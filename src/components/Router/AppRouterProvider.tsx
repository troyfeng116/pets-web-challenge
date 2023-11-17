import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from 'components/Routes/About'
import Home from 'components/Routes/Home'
import LayoutWrapper from 'components/Wrappers/LayoutWrapper'

const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
        ],
    },
])

export const AppRouterProvider: React.FC = () => <RouterProvider router={router} />
