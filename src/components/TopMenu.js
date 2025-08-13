import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateOverlay } from "../redux/dataSlice";
import { NavLink } from "react-router-dom";

const TopMenu = ({ data }) => {
  const dispatch = useDispatch();
  const handleClickOpenMenu = () => {
    dispatch(updateOverlay(true));
  };

  const [showMenu, setShowMenu] = useState(data);

  useEffect(() => {
    if (!data) {
      const handleScroll = () => {
        setShowMenu(window.scrollY > 60); // Adjust the height based on scroll position
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [data]);

  return (
    <div
      id="topMenu"
      style={{ height: showMenu ? "80px" : "0px" }} // Show/hide menu based on scroll position
      className="transition-all ease-in-out bg-gray-800 text-white"
    >
      <div className="bar p-4" onClick={handleClickOpenMenu}>
        <i className="fa-solid fa-bars text-xl"></i>
        Menu
      </div>
      <div className="brandName p-4 flex items-center">
        <NavLink to={"/"}>
          <img
            src="../img/iconMenuB.png" // Path to your logo image
            alt="Brand Logo"
            className="w-12 h-12"
          />
          <p className="ml-2">invest - realty</p>
        </NavLink>
      </div>
      <div className="iconContact p-4 flex">
        <a
          href="https://www.facebook.com/NamiHome.Official/"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          <i className="fa-brands fa-facebook-f text-xl"></i>
        </a>
        <a href="https://www.youtube.com/@namihomesaigon" target="_blank" className="mr-4">
          <i className="fa-brands fa-youtube text-xl"></i>
        </a>
        <a href="mailto:namihome.saigon@gmail.com" className="mr-4">
          <i className="fa-solid fa-envelope text-xl"></i>
        </a>
        <a href="tel:+84903052135" className="mr-4">
          <i className="fa-solid fa-phone text-xl"></i>
        </a>
      </div>
    </div>
  );
};

export default TopMenu;
