import React, { ReactChild } from 'react';
import './styles.css';

const Modal = ({ children }: { children: ReactChild | ReactChild[] }) => (
  <div className="modal">
    <div className="modal-content">
      {children}
    </div>
  </div>
);


export default Modal;