import React, { useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { ToastContext } from '../../../store/Toast-Context';

function GlobalToast() {
  const { isShowToast, closeToast, toastData } = useContext(ToastContext);

  return (
    <ToastContainer
      className="p-3"
      position='top-end'
      style={{ zIndex: 10000 }}
    >
      <Toast
        show={isShowToast}
        onClose={closeToast}
        bg={toastData.variant}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastData.status}</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body>{toastData.message}</Toast.Body>
      </Toast>

    </ToastContainer>
  );
}

export default GlobalToast;
