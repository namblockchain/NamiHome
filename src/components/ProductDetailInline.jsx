// src/components/ProductDetailInline.jsx
import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export default function ProductDetailInline({
  item,
  thumbSize = 510, // kích thước ô vuông desktop
  gap = 16,
}) {
  // Gom ảnh từ nhiều trường để không bị thiếu
  const images = useMemo(() => {
    const pools = [
      item?.allPhoto,
      item?.photos,
      item?.detailPhoto,
      item?.gallery,
      item?.images,
      item?.imgs,
      item?.pictures,
      item?.galleryImages,
      item?.imageList,
      item?.media,
    ];
    const singles = [
      item?.thumbnail,
      item?.thumb,
      item?.cover,
      item?.image,
      item?.mainImage,
    ].filter(Boolean);

    const flat = [];
    for (const pool of pools) {
      if (Array.isArray(pool)) flat.push(...pool);
      else if (typeof pool === "string") flat.push(pool);
    }
    flat.push(...singles);

    const seen = new Set();
    return flat
      .filter(Boolean)
      .map((p) => String(p).trim())
      .filter((p) => !p.toLowerCase().endsWith(".mp4"))
      .map((p) => {
        if (/^https?:\/\//i.test(p)) return p;
        if (p.startsWith("/")) return p;
        return `/img/${p}`;
      })
      .filter((p) => (seen.has(p) ? false : seen.add(p)));
  }, [item]);

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showShare, setShowShare] = useState(false);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
    setZoom(1);
    setRotate(0);
  };
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length]
  );

  // Khóa body khi mở
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prevOverflow);
  }, [open]);

  // Phím tắt
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+") setZoom((z) => Math.min(5, +(z + 0.2).toFixed(2)));
      if (e.key === "-") setZoom((z) => Math.max(0.2, +(z - 0.2).toFixed(2)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  // Swipe mobile
  const stageRef = useRef(null);
  const touchStartX = useRef(0);
  useEffect(() => {
    if (!open || !stageRef.current) return;
    const el = stageRef.current;
    const onStart = (e) => (touchStartX.current = e.touches[0].clientX);
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [open, prev, next]);

  // Download
  const downloadCurrent = useCallback(() => {
    const url = images[idx];
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "image";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [images, idx]);

  // Share submenu
  const shareTo = useCallback(
    (type) => {
      const pageUrl =
        typeof window !== "undefined" ? window.location.href : "";
      const img = images[idx];
      let shareUrl = "";
      switch (type) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            pageUrl
          )}&picture=${encodeURIComponent(img)}`;
          break;
        case "zalo":
          shareUrl = `https://zalo.me/share?url=${encodeURIComponent(
            pageUrl
          )}`;
          break;
        case "youtube":
          shareUrl = `https://www.youtube.com/`;
          break;
        default:
          break;
      }
      if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
      setShowShare(false);
    },
    [images, idx]
  );

  // Không có ảnh
  if (!images.length) {
    return (
      <div style={{ padding: 12, color: "#999" }}>
        Không có ảnh để hiển thị.
      </div>
    );
  }

  return (
    <div>
      {/* ====== CSS CHỈ CHO BỐ CỤC (FLEXBOX) ====== */}
      <style>{`
        /* Bọc ngoài căn giữa block */
        #pd-wrap { display: flex; justify-content: center; }

        /* FLEX GRID: KHÔNG so le, các ô vuông cố định, luôn cân đối */
        #pd-flex {
          display: flex;
          flex-wrap: wrap;
          gap: ${gap}px;
          justify-content: center;   /* căn giữa hàng */
          align-items: flex-start;   /* hàng thẳng mép trên */
          max-width: calc(${thumbSize * 3 + gap * 2}px); /* 3 cột desktop */
        }

        /* Mỗi item là một ô vuông CỐ ĐỊNH kích thước (không giãn) */
        .pd-item {
          width: ${thumbSize}px;
          height: ${thumbSize}px;
          flex: 0 0 ${thumbSize}px; /* không co, không giãn, đúng kích thước */
        }

        /* Tablet: 2 cột */
        @media (max-width: 1023.98px) {
          #pd-flex { max-width: calc(${Math.min(450, thumbSize)} * 2px + ${gap}px); }
          .pd-item {
            width: ${Math.min(450, thumbSize)}px;
            height: ${Math.min(450, thumbSize)}px;
            flex: 0 0 ${Math.min(450, thumbSize)}px;
          }
        }

        /* Mobile: 1 cột — vẫn là ô vuông */
        @media (max-width: 599.98px) {
          #pd-flex { max-width: min(100%, ${thumbSize}px); }
          .pd-item {
            width: min(100%, ${thumbSize}px);
            height: min(100vw, ${thumbSize}px);
            flex: 0 0 auto;
          }
        }

        /* Hover "lắc" + zoom nhẹ */
        .pd-thumb {
          transform: translateZ(0);
          transition: transform .25s ease, filter .25s ease;
          will-change: transform;
        }
        .pd-thumb:hover {
          transform: scale(1.05) rotate(0.2deg);
          filter: brightness(1.03);
        }
      `}</style>

      {/* ====== FLEX GRID (đã cân đối, không so le, đúng thứ tự) ====== */}
      <div id="pd-wrap">
        <div id="pd-flex" aria-label="image grid">
          {images.map((src, i) => (
            <button
              key={`${i}-${src}`}
              onClick={() => openAt(i)}
              className="pd-item"
              style={thumbButton}
              aria-label={`Open image ${i + 1}`}
            >
              <div style={squareBox}>
                <img
                  src={src}
                  alt={`thumb ${i + 1}`}
                  className="pd-thumb"
                  style={squareImg}
                  draggable={false}
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ====== LIGHTBOX (giữ nguyên như trước) ====== */}
      {open &&
        createPortal(
          <div style={overlay} onClick={close}>
            <div
              ref={stageRef}
              style={stage}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Toolbar nhỏ + mờ */}
              <div style={toolbar}>
                <small style={counterBadge}>
                  {idx + 1}/{images.length}
                </small>

                <button
                  title="Zoom In"
                  onClick={() =>
                    setZoom((z) => Math.min(5, +(z + 0.2).toFixed(2)))
                  }
                  style={toolBtn}
                >
                  +
                </button>
                <button
                  title="Zoom Out"
                  onClick={() =>
                    setZoom((z) => Math.max(0.2, +(z - 0.2).toFixed(2)))
                  }
                  style={toolBtn}
                >
                  −
                </button>
                <button
                  title="Rotate"
                  onClick={() => setRotate((r) => (r + 90) % 360)}
                  style={toolBtn}
                >
                  ⟲
                </button>
                <button
                  title="Download"
                  onClick={downloadCurrent}
                  style={toolBtn}
                >
                  ⤓
                </button>

                {/* Share = mũi tên cong */}
                <div style={{ position: "relative" }}>
                  <button
                    title="Share"
                    onClick={() => setShowShare((s) => !s)}
                    style={toolBtn}
                    aria-haspopup="menu"
                    aria-expanded={showShare}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ display: "block" }}
                    >
                      <path d="M4 12v-2a4 4 0 0 1 4-4h6" />
                      <polyline points="10 6 14 2 18 6" />
                      <path d="M20 12v2a4 4 0 0 1-4 4h-6" />
                    </svg>
                  </button>
                  {showShare && (
                    <div style={shareMenu} role="menu">
                      <button
                        style={shareItem}
                        onClick={() => shareTo("facebook")}
                        role="menuitem"
                      >
                        Facebook
                      </button>
                      <button
                        style={shareItem}
                        onClick={() => shareTo("zalo")}
                        role="menuitem"
                      >
                        Zalo
                      </button>
                      <button
                        style={shareItem}
                        onClick={() => shareTo("youtube")}
                        role="menuitem"
                      >
                        YouTube
                      </button>
                    </div>
                  )}
                </div>

                <button title="Close" onClick={close} style={toolBtn}>
                  ✕
                </button>
              </div>

              {/* Mũi tên sát mép */}
              {images.length > 1 && (
                <>
                  <button
                    aria-label="Previous"
                    onClick={prev}
                    style={arrowLeft}
                  >
                    &lt;
                  </button>
                  <button
                    aria-label="Next"
                    onClick={next}
                    style={arrowRight}
                  >
                    &gt;
                  </button>
                </>
              )}

              {/* Ảnh lớn — sát mép & mũi tên */}
              <img
                src={images[idx]}
                alt={`Image ${idx + 1}`}
                draggable={false}
                onDoubleClick={() => setZoom(1)}
                style={{
                  ...bigImg,
                  transform: `scale(${zoom}) rotate(${rotate}deg)`,
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/* ===== Styles dùng chung ===== */

const thumbButton = {
  border: "none",
  padding: 0,
  background: "transparent",
  cursor: "pointer",
  display: "block",
};

/* Ô vuông tuyệt đối (không lệch) */
const squareBox = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: 0,
};
const squareImg = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/* Lightbox */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.94)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2147483647,
  padding: 0,
};
const stage = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "max(6px, env(safe-area-inset-left))",
  paddingRight: "max(6px, env(safe-area-inset-right))",
  paddingTop: "max(6px, env(safe-area-inset-top))",
  paddingBottom: "max(6px, env(safe-area-inset-bottom))",
};
const bigImg = {
  maxWidth: "calc(100vw - 56px)",
  maxHeight: "calc(100vh - 56px)",
  objectFit: "contain",
  userSelect: "none",
  transition: "transform .15s ease",
};
/* Arrow sát mép */
const arrowBase = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 44,
  height: 44,
  borderRadius: 999,
  border: "none",
  background: "rgba(0,0,0,.45)",
  color: "#fff",
  fontSize: 22,
  lineHeight: "44px",
  textAlign: "center",
  cursor: "pointer",
};
const arrowLeft = { ...arrowBase, left: 8 };
const arrowRight = { ...arrowBase, right: 8 };
/* Toolbar nhỏ + mờ */
const toolbar = {
  position: "absolute",
  top: 10,
  right: 10,
  display: "flex",
  alignItems: "center",
  gap: 6,
  opacity: 0.8,
};
const toolBtn = {
  width: 28,
  height: 28,
  borderRadius: 6,
  fontSize: 14,
  border: "none",
  background: "rgba(0,0,0,.45)",
  color: "#fff",
  cursor: "pointer",
};
/* Share dropdown */
const shareMenu = {
  position: "absolute",
  top: "110%",
  right: 0,
  background: "rgba(0,0,0,.7)",
  backdropFilter: "blur(4px)",
  borderRadius: 8,
  padding: 6,
  display: "grid",
  gap: 4,
  minWidth: 130,
  zIndex: 2,
};
const shareItem = {
  border: "none",
  background: "transparent",
  color: "#fff",
  textAlign: "left",
  padding: "6px 8px",
  borderRadius: 6,
  fontSize: 13,
  cursor: "pointer",
};
/* Counter nhỏ */
const counterBadge = {
  background: "rgba(0,0,0,.5)",
  color: "#fff",
  padding: "2px 6px",
  borderRadius: 6,
  fontSize: 12,
  marginRight: 6,
};