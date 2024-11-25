import React, { useEffect, useRef } from 'react';
import './modal.css'

const Modal = ({ showModal, handleCloseModal, children }) => {
  const modalRef = useRef(null);

  const handleClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    // Add event listener to listen for mousedown events on the document
    document.addEventListener('mousedown', handleClickOutsideModal);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);
  return (
    <>
      {showModal && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
