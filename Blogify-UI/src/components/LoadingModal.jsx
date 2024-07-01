import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const LoadingModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className={`w-full max-w-md p-4 transition-transform duration-300 transform ${isModalOpen ? 'translate-y-0' : '-translate-y-20'
            }`}
        >
          <div>
            <Loading />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;
