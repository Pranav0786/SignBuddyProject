import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-700 bg-opacity-30 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-1">
        <img src={logo} alt="SignBuddy Logo" className="h-11 w-11 rounded-full shadow-md" />
          <h1 className="text-blue-900 text-3xl font-extrabold tracking-wide drop-shadow-lg">
            Sign<span className="text-yellow-300">Buddy</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white text-lg font-semibold px-4 py-2 transition-all duration-300 rounded-lg ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-md" : "hover:bg-white hover:bg-opacity-20"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white text-lg font-semibold px-4 py-2 transition-all duration-300 rounded-lg ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-md" : "hover:bg-white hover:bg-opacity-20"
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white text-lg font-semibold px-4 py-2 transition-all duration-300 rounded-lg ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-md" : "hover:bg-white hover:bg-opacity-20"
                }`
              }
            >
              Contact Us
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/howtouse"
              className={({ isActive }) =>
                `text-white text-lg font-semibold px-4 py-2 transition-all duration-300 rounded-lg ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-md" : "hover:bg-white hover:bg-opacity-20"
                }`
              }
            >
              Guide
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/voicetosign"
              className={({ isActive }) =>
                `text-white text-lg font-semibold px-4 py-2 transition-all duration-300 rounded-lg ${
                  isActive ? "bg-yellow-400 text-gray-900 shadow-md" : "hover:bg-white hover:bg-opacity-20"
                }`
              }
            >
              VoiceToSign
            </NavLink>
          </li>


        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
