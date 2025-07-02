import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary  w-full flex flex-col justify-evenly border- shadow-inner mt-10">
      <div className=" w-full mx-auto px-6 py-8 flex justify-evenly text-gray-700">

        {/* Logo y Descripción */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-orange-500">Fruty</h2>
          <p className="text-sm mt-2 text-gray-500">
            Fresh, fast and healthy. <br /> We deliver fruits with love 
          </p>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <NavLink to="/" className="hover:text-orange-500 text-sm">Home</NavLink>
          <NavLink to="/menu" className="hover:text-orange-500 text-sm">Menu</NavLink>
          <NavLink to="/about" className="hover:text-orange-500 text-sm">About Us</NavLink>
          <NavLink to="/services" className="hover:text-orange-500 text-sm">Services</NavLink>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex gap-4 mt-2 text-orange-500 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              <FaInstagram />
            </a>
            <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-100">
        © {new Date().getFullYear()} Fruty. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
