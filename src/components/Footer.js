import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const handleToTop = (e) => {
    // Cuộn lên trên cùng trang
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Chờ một chút trước khi thực hiện điều hướng đến trang mới
    setTimeout(() => {
      // Điều hướng đến trang mục tiêu
      e.preventDefault(); // Ngừng điều hướng mặc định của NavLink
      window.location.href = e.target.href; // Điều hướng sau khi cuộn xong
    }, 500); // Đợi 500ms để đảm bảo cuộn đã hoàn tất
  };

  return (
    <footer>
      <ul>
        <li>
          <NavLink to={"/portfolio"} onClick={handleToTop}>
            Nhà Đất
          </NavLink>
        </li>
        <li>
          <NavLink to={"/blog"} onClick={handleToTop}>
            Phân Tích
          </NavLink>
        </li>
        <li>
          <NavLink to={"/contact"} onClick={handleToTop}>
            Liên Hệ
          </NavLink>
        </li>
      </ul>
      <p>Copyright 2025 © NAM IHOME</p>
    </footer>
  );
};

export default Footer;

