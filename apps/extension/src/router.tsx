import { createHashRouter } from 'react-router-dom';
import DashboardScreen from 'screens/Dashboard';
import Explore from 'screens/Dashboard/Explore';
import Profile from 'screens/Dashboard/Profile';
import LoginScreen from 'screens/Login';
import PasscodeScreen from 'screens/Passcode';
import { ConnectionRequest } from 'screens/ConnectionRequest';

export const router = createHashRouter([
  {
    path: '/',
    element: <DashboardScreen />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
    ],
  },
  {
    path: '/connection-request',
    element: <ConnectionRequest />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/passcode',
    element: <PasscodeScreen />,
  },
]);
