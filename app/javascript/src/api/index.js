import * as Credential from '../util/credential';

const signUp = ({ username, onSuccess, onError }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  };

  fetch('/api/session/v1/sign_up', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data['user_attributes']) {
        Credential.create({ data, onSuccess, onError });
      }
    });
}

const signIn = ({ username, onSuccess, onError }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  };

  fetch('/api/session/v1/sign_in', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data['user_attributes']) {
        Credential.get({ data, onSuccess, onError });
      }
    });
}

export { signIn, signUp };
