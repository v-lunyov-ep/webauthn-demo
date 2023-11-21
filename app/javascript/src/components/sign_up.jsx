import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/user';

import * as AuthApi from '../api';

import { AppLayout } from "./app_layout";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignUp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    AuthApi.signUp({
      username,
      onSuccess: ({ user }) => {
        console.log(user);

        dispatch(setUser(user));
        // window.location.replace("/")
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  return(
    <AppLayout>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
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
