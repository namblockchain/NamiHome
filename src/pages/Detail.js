import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import { useSelector } from "react-redux";
import ProductDetailInline from "../components/ProductDetailInline"; // <— THÊM

const Detail = () => {
  const { ten } = useParams();
  const { products, selectedCategory } = useSelector((state) => state.dataSlice);

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const find = products.find((item) => item.ma === ten);
    setDetail(find || null);
  }, [ten, products]);

  // ===== Debug xem dữ liệu ảnh đã đúng chưa =====
  useEffect(() => {
    console.log("ITEM", detail);
    console.log("ALL PHOTOS", detail?.allPhoto);
  }, [detail]);

  const tinhDonGiaTheoM2 = (data) => {
    try {
      const giaBanStr = data.giaBan
        .toLowerCase()
        .replace(",", ".")
        .replace(/[^0-9.]/g, "");
      const giaBan = parseFloat(giaBanStr) * 1_000_000_000;
      if (isNaN(giaBan) || giaBan === 0) {
        throw new Error("Không xác định được giá bán hợp lệ.");
      }

      const dienTichMatch = data.dienTich.match(/công nhận\s+([\d.]+)/i);
      const dienTich = dienTichMatch ? parseFloat(dienTichMatch[1]) : null;
      if (!dienTich) throw new Error("Không tìm thấy diện tích công nhận.");

      const donGia = giaBan / dienTich;
      return { donGia };
    } catch (error) {
      console.error("Lỗi khi tính đơn giá:", error.message);
      return null;
    }
  };

  const formatDonGiaToShortText = (value) => {
    if (!value || isNaN(value)) return "Không hợp lệ";
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + " tỷ";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + " triệu";
    if (value >= 1_000) return (value / 1_000).toFixed(2) + " nghìn";
    return value.toString();
  };

  if (!detail) {
    return (
      <>
        <TopMenu data={true} />
        <div className="navMenu">
          <ul>
            <li><NavLink to={"/"}>Home \</NavLink></li>
            <li><NavLink to={"/portfolio"}>Nhà Đất \</NavLink></li>
            <li><NavLink to={"/portfolio"}>{selectedCategory}</NavLink></li>
          </ul>
        </div>
        <div id="detail"><div className="content">Không tìm thấy sản phẩm.</div></div>
      </>
    );
  }

  return (
    <>
      <TopMenu data={true} />

      <div className="navMenu">
        <ul>
          <li><NavLink to={"/"}>Home \</NavLink></li>
          <li><NavLink to={"/portfolio"}>Nhà Đất \</NavLink></li>
          <li><NavLink to={"/portfolio"}>{selectedCategory}</NavLink></li>
        </ul>
      </div>

      <div id="detail">
        <div className="content">
          <h1>{detail.proName}</h1>
          <ul>
            <li>Địa chỉ: {detail.address}</li>
            <li>Diện tích: {detail.dienTich}</li>
            <li>Kết cấu: {detail.ketCau}</li>
            <li>Giá bán: {detail.giaBan}</li>
            <li>
              Đơn giá:{" "}
              {tinhDonGiaTheoM2(detail)
                ? `${formatDonGiaToShortText(tinhDonGiaTheoM2(detail).donGia)}/m²`
                : "Không xác định"}
            </li>
            <li>Hợp đồng thuê: {detail.hopDong}</li>
            <li>Hướng: {detail.huong}</li>
            <li>Pháp lý: {detail.phapLy}</li>
            <li>Vị trí: {detail.viTri}</li>
          </ul>

          {/* ==== GALLERY có Lightbox mũi tên + nút đóng ==== */}
          <div className="photo">
            <ProductDetailInline item={detail} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;

