import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

// Public routes
const SignIn = lazy(() => import('../public/signin'));
const SignUp = lazy(() => import('../public/signup'));

// Private routes
const Dashboard = lazy(() => import('../private/dashboard'));
const Profile = lazy(() => import('../private/profile'));

const router = createBrowserRouter([
    {
        path: '/signin',
        element: (
            <PublicRouter>
                <SignIn />
            </PublicRouter>
        ),
    },
    {
        path: '/signup',
        element: (
            <PublicRouter>
                <SignUp />
            </PublicRouter>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRouter>
                <Dashboard />
            </PrivateRouter>
        ),
    },
    {
        path: '/profile',
        element: (
            <PrivateRouter>
                <Profile />
            </PrivateRouter>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
    },
]);

export default router;

// // Add a fixed delay so you can see the loading state
// async function delayForDemo(promise: any) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, 2000);
//     }).then(() => promise);
// }
