import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { LuBookImage } from "react-icons/lu";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Transportation", path: "/transportation" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Always show white navbar on these pages (About, Hotels, Contact, Room Details)
  const lightPages = ["/hotels", "/about", "/contact", "/rooms" , "/transportation" , "/my-bookings" ,"/dashboard" , "/booking"];
  const isLightPage = lightPages.some((page) =>
    location.pathname.startsWith(page)
  );

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarScrolled = isLightPage ? true : isScrolled;

  return (
    <nav
      className={`bg-transparent fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        navbarScrolled
          ? "bg-white shadow-md text-gray-700 py-3 md:py-4"
          : "bg-indigo-500 py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo || "/placeholder.svg"}
          alt="logo"
          className={`cursor-pointer h-9 ${
            navbarScrolled ? "invert brightness-200" : "opacity-100"
          }`}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              navbarScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                navbarScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        {/* Dashboard */}
        {isSignedIn && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              navbarScrolled ? "text-black" : "text-white"
            } transition-all`}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        {/* Search Icon */}
        <svg
          className={`h-6 w-6 transition-all duration-500 ${
            navbarScrolled ? "text-gray-700" : "text-white"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Profile/Login */}
        {isSignedIn ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<LuBookImage />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="cursor-pointer px-8 py-2.5 rounded-full ml-4 bg-black text-white"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Right */}
      <div className="flex items-center gap-3 md:hidden">
        {isSignedIn ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<LuBookImage />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-4 py-1 rounded-full text-sm"
          >
            Login
          </button>
        )}

        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer ${navbarScrolled ? "invert" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </Link>
        ))}

        {isSignedIn && (
          <button
            onClick={() => {
              navigate("/dashboard");
              setTimeout(() => setIsMenuOpen(false), 100);
            }}
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
          >
            Dashboard
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
