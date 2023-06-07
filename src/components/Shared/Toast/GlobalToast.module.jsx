import React, { useContext } from 'react';
import { Toast } from 'react-bootstrap';
import { ToastContext } from '../../../store/Toast-Context';
import classes from './GlobalToast.module.css';

function GlobalToast() {
  const { isShowToast, closeToast, toastData } = useContext(ToastContext);

  return (
    <Toast 
      show={isShowToast} 
      onClose={closeToast}
      delay={3000} 
      autohide 
      bg={toastData.variant} 
      className={classes['toast-wrapper']}
      style={{ position: isShowToast && "absolute"}} 
    >
      <Toast.Header>
        <strong className="me-auto">{toastData.status}</strong>
        <small>Now</small>
      </Toast.Header>
      <Toast.Body>{toastData.message}</Toast.Body>
    </Toast>
  );
}

export default GlobalToast;
