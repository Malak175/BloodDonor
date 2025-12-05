import React from 'react'
import { Link } from 'react-router-dom';


function Footer() {
return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <img src="/logo1.png" alt="BloodBridge Logo" className="h-16 mb-4" />
          <p>Saving lives, one donation at a time.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li><a href="#" className="hover:text-red-600 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Donate</a></li>
            <li><a href="#" className="hover:text-red-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>123 BloodConnect Ave, City, Country</p>
          <p className="mt-2">Phone: (123) 456-7890</p>
          <p className="mt-2">Email: info@bloodbridge.com</p>
        </div>
      </div>

      <div className="mt-8 border-t border-red-600 pt-4 text-center text-gray-700">
        <p>&copy; 2025 BloodBridge. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/Malak175/BloodDonor.git" className="hover:text-red-600 transition-colors">GitHub</a>
          <a href="www.linkedin.com/in/malak-zayed-a5674a322" className="hover:text-red-600 transition-colors">Linkedin</a>
          <a href="https://github.com/omar-khaled67/update-final-project2.git" className="hover:text-red-600 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/omar-khaled-63b2b2350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-red-600 transition-colors">Linkedin</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer