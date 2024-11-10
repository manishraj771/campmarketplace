// client/src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Campus Marketplace</Link>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200"
        >
          Login
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;
