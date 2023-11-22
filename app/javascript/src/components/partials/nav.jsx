import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { signOut } from '../../reducers/user';

export const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Webauthn Demo</Link>
        {!user && (
          <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/sign_in" className="nav-link">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link to="/sign_up" className="nav-link">Sign Up</Link>
              </li>
            </ul>
          </div>
        )}
        <div className="d-lg-flex col-lg-3 justify-content-lg-end">
          {user && <Navigate to="/" replace={true} />}
          {user && (
            <li className="nav-item">
              <Button onClick={() => dispatch(signOut())}>
                Sign out
              </Button>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}
