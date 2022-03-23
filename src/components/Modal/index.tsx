import React, { ReactChild } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Modal = ({ children }: { children: ReactChild | ReactChild[] }) => (
  <div className="modal">
    <div className="modal-content">
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
}

export default Modal;