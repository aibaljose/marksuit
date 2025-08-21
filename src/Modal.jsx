import React from 'react';
import './Modal.css';

function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="modal-overlay" id="shortcutsModal" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
