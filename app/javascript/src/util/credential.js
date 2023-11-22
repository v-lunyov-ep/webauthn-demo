import * as WebAuthnJSON from "@github/webauthn-json"

const getCSRFToken = () => {
  var CSRFSelector = document.querySelector('meta[name="csrf-token"]')
  if (CSRFSelector) {
    return CSRFSelector.getAttribute("content")
  } else {
    return null
  }
}

const callback = async ({ callbackUrl, body, onSuccess, onError }) => {
  const response = await fetch(callbackUrl,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": getCSRFToken()
      },
      credentials: 'same-origin'
    });

  const user = await response.json()

  if (response.ok) {
    onSuccess({ user });
  } else if (response.status < 500) {
    response.text().then(onError);
  } else {
    onError("Sorry, something wrong happened.");
  }
}

const create = async ({ data, onSuccess, onError }) => {
  const credential = await WebAuthnJSON.create({ "publicKey": data['create_options'] })

  callback({
    callbackUrl: '/api/session/v1/sign_up/callback',
    body: { data, credential },
    onSuccess,
    onError,
  });

  console.log("Creating new public key credential...");
}

const get = async ({ data, onSuccess, onError }) => {
  const credential = await WebAuthnJSON.get({ "publicKey": data['get_options'] });

  callback({
    callbackUrl: '/api/session/v1/sign_in/callback',
    body: { data, credential },
    onSuccess,
    onError,
  });

  console.log("Getting public key credential...");
}

export { create, get }
