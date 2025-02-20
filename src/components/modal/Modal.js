import React, { useEffect, useRef } from 'react';

const Modal = ({ showModal, handleCloseModal, children }) => {
  const modalRef = useRef(null);

  const handleClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto flex flex-col items-center relative"
          >
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-700 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
