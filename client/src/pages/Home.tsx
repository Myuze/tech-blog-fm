import React from 'react';

import '../scss/main.scss';

import Body from '../components/Body';

export default function Home(props: any) {
  const register = (
    <a href='/register'>
      <button className='btn btn-primary'>Register</button>
    </a>
  );

  const logout = (
    <button id='ddLogoutBtn' className='btn btn-primary' type='button'>
      Logout
    </button>
  );

  const login = (
    <button
      id='ddLoginBtn'
      className='btn btn-primary'
      data-bs-toggle='modal'
      data-bs-target='#loginModal'
      type='button'
    >
      Login
    </button>
  );

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <h1 className='navbar-brand'>Tech Blog FM</h1>
          <div className='btn-group' role='group'>
            <a href='/'>
              <button className='btn btn-primary active' aria-current='page'>
                Home
              </button>
            </a>
            <a href='/dashboard'>
              <button className='btn btn-primary'>Dashboard</button>
            </a>
            {login}
          </div>
        </div>
      </nav>
      <body>
        <Body />
      </body>
    </div>
  );
}
