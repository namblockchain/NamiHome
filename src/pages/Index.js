import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const SLIDE_DURATION = 5000;

const SLIDES = [
  { src: "/img/bannera.jpg", bgPos: "50% 50%" },
  { src: "/img/bannerb.jpg", bgPos: "50% 50%" },
  { src: "/img/bannerc.jpg", bgPos: "50% 50%" },
  { src: "/img/bannerd.jpg", bgPos: "50% 50%" },
  { src: "/img/bannere.jpg", bgPos: "50% 50%" },
];

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [hideWhileScroll, setHideWhileScroll] = useState(false);

  const heroRef = useRef(null);
  const scrollTimer = useRef(null);

  // Auto chạy 5s/slide, dừng 1 nhịp khi user chọn tay
  useEffect(() => {
    if (isManual) return;
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [isManual]);

  const pauseOneCycle = () => {
    setIsManual(true);
    setTimeout(() => setIsManual(false), SLIDE_DURATION);
  };

  // Click vào thanh 1 khối → nhảy đến ảnh tương ứng
  const handleBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const index = Math.max(0, Math.min(SLIDES.length - 1, Math.floor(ratio * SLIDES.length)));
    setCurrent(index);
    pauseOneCycle();
  };

  // Ẩn progress trong khi scroll (kéo/đẩy trang), hiện lại sau 600ms không scroll
  useEffect(() => {
    const onScroll = () => {
      setHideWhileScroll(true);
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setHideWhileScroll(false), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chỉ hiện progress khi hero nằm trong khung nhìn (>= 65%)
  useEffect(() => {
    if (!heroRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHeroInView(entry.intersectionRatio >= 0.65);
      },
      { threshold: [0, 0.25, 0.5, 0.65, 0.75, 1] }
    );
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  const barVisible = heroInView && !hideWhileScroll;

  // Style nền hero (background-image; cover nên KHÔNG bao giờ méo)
  const heroStyle = useMemo(
    () => ({
      backgroundImage: `url(${SLIDES[current].src})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: SLIDES[current].bgPos || "50% 50%",
    }),
    [current]
  );

  return (
    <div id="index">
      {/* HERO: dùng background-image -> không bóp/kéo hình */}
      <section ref={heroRef} className="hero" style={heroStyle}>
        {/* Link phủ toàn bộ hero: click ở đâu trên ảnh cũng vào /portfolio */}
        <NavLink to="/portfolio" aria-label="Xem Portfolio" className="hero-link" />

        {/* Text trung tâm – remount theo current để animate lại */}
        <div key={current} className="text-box">
          <h3><strong>WELCOME TO</strong></h3>
          <h1><strong>NAM IHOME</strong></h1>
          <NavLink to="/portfolio" className="cta">
            <span>View our work</span>
            <i className="fa-solid fa-angle-right" />
          </NavLink>
        </div>

        {/* Progress 5 đoạn LIỀN nhau (không khe hở) + fill mượt 5s */}
        <div
          className={`progress-bar one-rail ${barVisible ? "show" : "hide"}`}
          onClick={(e) => {
            e.stopPropagation();
            handleBarClick(e);
          }}
          role="slider"
          aria-valuemin={1}
          aria-valuemax={SLIDES.length}
          aria-valuenow={current + 1}
        >
          {SLIDES.map((_, i) => (
            <span key={i} className={`seg ${i === current ? "active" : ""}`}>
              {i === current && (
                <em
                  key={`fill-${current}`}
                  className="fill"
                  style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

