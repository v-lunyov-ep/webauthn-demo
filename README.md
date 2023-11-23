# Webauthn Demo App

## Webauthn & Passkeys

The Web Authentication API (also known as WebAuthn) is a specification written by the W3C and FIDO, with the participation of Google, Mozilla, Microsoft, Yubico, and others. The API allows servers to register and authenticate users using public key cryptography instead of a password.

It allows servers to integrate with the strong authenticators now built into devices, like Windows Hello or Apple’s Touch ID. Instead of a password, a private-public keypair (known as a credential) is created for a website. The private key is stored securely on the user’s device; a public key and randomly generated credential ID is sent to the server for storage. The server can then use that public key to prove the user’s identity.

The public key is not secret, because it is effectively useless without the corresponding private key. The fact that the server receives no secret has far-reaching implications for the security of users and organizations. Databases are no longer as attractive to hackers, because the public keys aren’t useful to them.

WebAuthn is part of the FIDO2 framework, which is a set of technologies that enable passwordless authentication between servers, browsers, and authenticators. As of January 2019, WebAuthn is supported on Chrome, Firefox, and Edge, and Safari.

### Useful links

https://webauthn.io/
https://webauthn.guide/

### Gems:

https://github.com/ruby-passkeys/warden-webauthn
https://github.com/cedarcode/webauthn-ruby

https://github.com/jeremyevans/rodauth

## App

This repo is a Rails 7.1.2 application that uses Grape API to communicate with React frontend.
Session state is managed on frontend side.

### System dependencies

- Ruby 3.2.2
- PostgreSQL
– Yarn

### Setup

```
bundle install

yarn install
yarn build

rake db:prepare

rails s
```

### Routes

```
/ # Profile (redirects to sign in if not authorized)
/sign_in # Sign in
/sign_up # Sign up

# API

/api/v1/sessions/sign_in
/api/v1/sessions/sign_in/callback
/api/v1/sessions/sign_up
/api/v1/sessions/sign_up/callback
```
