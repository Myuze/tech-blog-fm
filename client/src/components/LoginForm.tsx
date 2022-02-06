import React from 'react';

export default function LoginForm() {
  return (
    <form>
      <div className='mb-3'>
        <label htmlFor='loginEmail' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          autoComplete='email'
          className='form-control'
          id='loginEmail'
          aria-describedby='emailHelp'
        />
        <div id='emailHelp' className='form-text'>
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='inputPass' className='form-label'>
          Password
        </label>
        <input
          type='password'
          autoComplete='current-password'
          className='form-control'
          id='inputPass'
        />
      </div>
      <div>
        <button id='signUpBtn' className='btn btn-primary'>
          Don't have a login? Sign up Here!
        </button>
      </div>
      <div>
        <p id='modalResult'></p>
      </div>
    </form>
  );
}
