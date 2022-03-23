import React from 'react';
import './styles.css';

const Modal = ({ children }) => (
  <div className="modal">
    <div className="modal-content">
      {children}
    </div>
  </div>
);


export default Modal;