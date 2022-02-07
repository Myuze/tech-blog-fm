import ReactDom from 'react-dom';
import LoginForm from '../../components/LoginForm';

export default function BaseModal({ setShowModal }: any) {
  const portalDiv: any = document.getElementById('login');
  return ReactDom.createPortal(
    <div
      className='modal fade'
      id='loginModal'
      tabIndex={-1}
      aria-labelledby='loginModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='loginModalLabel'>
              Enter Information to Login
            </h5>
          </div>
          <div className='modal-body'>
            <LoginForm />
          </div>
          <div className='modal-footer'>
            <button
              id='loginCancel'
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
            <button id='loginSubmit' type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>,
    portalDiv
  );
}
