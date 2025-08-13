// components/BackToTop.jsx
import React, { useEffect, useRef, useState } from "react";

function getScrollTopOf(target) {
  if (target === window) {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
  return target.scrollTop || 0;
}

function scrollToTopOf(target) {
  const opts = { top: 0, behavior: "smooth" };
  if (target === window) {
    try {
      window.scrollTo(opts);
    } catch {
      window.scrollTo(0, 0);
    }
  } else {
    try {
      target.scrollTo(opts);
    } catch {
      target.scrollTop = 0;
    }
  }
}

/**
 * BackToTop
 * - targetId: id của container cuộn (vd: "scrollRoot"). Nếu bỏ trống → dùng window
 * - threshold: sau khi cuộn quá bao nhiêu px thì hiện nút (mặc định 300)
 */
const BackToTop = ({ targetId, threshold = 300 }) => {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    // Xác định target scroll: element theo id hoặc window
    const el =
      (targetId && document.getElementById(targetId)) ||
      (typeof window !== "undefined" ? window : null);

    targetRef.current = el;

    if (!el) return;

    const onScroll = () => {
      setVisible(getScrollTopOf(el) > threshold);
    };

    // Khởi tạo trạng thái
    onScroll();

    // Lắng nghe scroll trên đúng đối tượng
    el.addEventListener("scroll", onScroll, { passive: true });

    // Nếu target là window, một số layout vẫn nên nghe trên window
    // (đã add rồi ở trên), nên không cần add gì thêm.
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [targetId, threshold]);

  const handleClick = () => {
    if (!targetRef.current) return;
    scrollToTopOf(targetRef.current);
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="backToTop"
      onClick={handleClick}
      aria-label="Back to top"
      title="Lên đầu"
    >
      ↑
    </button>
  );
};

export default BackToTop;