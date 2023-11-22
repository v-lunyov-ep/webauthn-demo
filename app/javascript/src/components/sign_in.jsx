import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/user';
import { Navigate } from 'react-router-dom';

import * as AuthApi from '../api';

import { AppLayout } from "./app_layout";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

export const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    AuthApi.signIn({
      username,
      onSuccess: ({ user }) => {
        dispatch(setUser(user));

        setToastMessage(`Successful login: ${user.username}`);
        setShowToast(true);

        <Navigate to="/" />

        // window.location.replace("/")
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  return(
    <AppLayout>
      <h1>Sign in</h1>
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            className="mb-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </AppLayout>
  );
}
