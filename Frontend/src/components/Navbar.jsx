import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 md:px-20">
       
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img src="/logo1.png" alt="BloodBridge Logo" className="h-10 md:h-16" />
            <span className="ml-2 text-lg md:text-2xl font-bold text-red-600 hidden md:inline">BloodBridge</span>
          </Link>
        </div>

      
        <nav className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link to="/featured" className="hover:text-red-600 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-red-600 transition-colors">Donate</Link>
          <Link to="/contact2" className="hover:text-red-600 transition-colors">Contact Us</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-4 md:px-5 rounded-lg shadow">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gray-800 hover:bg-gray-900 transition-colors text-white py-2 px-4 md:px-5 rounded-lg shadow">
              Register
            </button>
          </Link>
        </div>

       
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring"
          >
            {open ? (
             
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

  
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link to="/" onClick={() => setOpen(false)} className="block py-2">Home</Link>
            <Link to="/featured" onClick={() => setOpen(false)} className="block py-2">About Us</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block py-2">Donate</Link>
            <Link to="/contact2" onClick={() => setOpen(false)} className="block py-2">Contact Us</Link>
            <div className="pt-2 flex gap-3">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1">
                <button className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-2 rounded-lg">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="flex-1">
                <button className="w-full bg-gray-800 hover:bg-gray-900 transition-colors text-white py-2 rounded-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
