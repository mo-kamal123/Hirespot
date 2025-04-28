import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { toggleDarkMode } from "../../store/themeSlice/theme-slice";

const NavBar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.theme);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full shadow-xl bg-white transition-colors duration-300 dark:bg-black dark:text-white">
      {/* Desktop Navbar */}
      <div className="container mx-auto px-4 py-3 hidden md:flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link to="/">Hirespot</Link>
        </h1>

        <ul className="flex gap-8">
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:text-blue-400 transition-colors ${
                  isActive ? "text-blue-500" : ""
                }`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:text-blue-400 transition-colors ${
                  isActive ? "text-blue-500" : ""
                }`
              }
              to="/jobs"
            >
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:text-blue-400 transition-colors ${
                  isActive ? "text-blue-500" : ""
                }`
              }
              to="/favourites"
            >
              Favourites
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`flex items-center justify-center rounded-full w-10 h-10 ${
              mode ? "bg-neutral-300" : "bg-blue-300"
            }`}
            onClick={() => dispatch(toggleDarkMode())}
            aria-label={mode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="text-lg">{mode ? "☀️" : "🌙"}</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">
          <Link to="/">Hirespot</Link>
        </h1>

        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`flex items-center justify-center rounded-full w-10 h-10 ${
              mode ? "bg-neutral-300" : "bg-blue-300"
            }`}
            onClick={() => dispatch(toggleDarkMode())}
            aria-label={mode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="text-lg">{mode ? "☀️" : "🌙"}</span>
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `block py-2 hover:text-blue-400 transition-colors ${
                    isActive ? "text-blue-500" : ""
                  }`
                }
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `block py-2 hover:text-blue-400 transition-colors ${
                    isActive ? "text-blue-500" : ""
                  }`
                }
                to="/jobs"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `block py-2 hover:text-blue-400 transition-colors ${
                    isActive ? "text-blue-500" : ""
                  }`
                }
                to="/favourites"
                onClick={() => setMobileMenuOpen(false)}
              >
                Favourites
              </NavLink>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
