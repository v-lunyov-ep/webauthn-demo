import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from './store';

import { ProtectedRoutes } from './components/protected_routes';
import { Profile } from './components/profile';
import { SignIn } from './components/sign_in';
import { SignUp } from './components/sign_up';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/sign_in",
      element: <SignIn />,
    },
    {
      path: "/sign_up",
      element: <SignUp />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Profile />,
        },
      ],
    },
  ]);

  return(
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  )
};

export default App;
