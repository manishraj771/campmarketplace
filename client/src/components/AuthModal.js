// client/src/components/AuthModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert('Logging in...');
    } else {
      alert('Creating an account...');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-center text-2xl font-bold mb-4">
        {isLogin ? 'Login' : 'Create an Account'}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input type="text" className="w-full p-2 border rounded" required />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full p-2 border rounded" required />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p className="text-center mt-4">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={toggleForm}
          className="text-blue-600 ml-2 underline"
        >
          {isLogin ? 'Create one' : 'Login'}
        </button>
      </p>
    </Modal>
  );
};

export default AuthModal;
