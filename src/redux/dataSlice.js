import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: true,
  currency: "Vnđ",
  overlay: false,

  selectedCategory: "All",

  baiPhanTich: [
    {
      name: "Tòa 45 - 47 Phan Đăng Lưu",
      file: "sample.pdf",
    },
    {
      name: "Nhừng tòa nhà tiềm năng 100 - 300 tỷ",
      file: "sample2.pdf",
    },
     {
      name: "Khách sạn Quận 1 ",
      file: "sample3.pdf",
    },
    {
      name: "Những toà nhà tiềm năng dưới 200 tỷ ",
      file: "sample4.pdf",
    },
  ],

  products: [
  {
  ma: "1",
  proName: "TOÀ NHÀ VĂN PHÒNG ",
  title: "28 Trần Quốc Thảo",
  address: "28 Trần Quốc Thảo, Phường Xuân Hoà (P.VTS Q3 cũ), TP HCM",
  dienTich: "Ngang 4.5m x Dài 43m Nở hậu 20m, Công nhận 553,3m², DTS 1.922m²",
  ketCau: "Hầm, 7 tầng, Sân thượng",
  giaBan: "350 tỷ",
  hopDong: "800 triệu",
  huong: "Tây Nam",
  phapLy: "CTCP bán 100% cổ phần",
  viTri: "Giữa đường Trần Quốc Thảo và Lý Chính Thắng",
  allPhoto: ["28tqt1.jpg","28tqt2.jpg","28tqt3.jpg","28tqt4.jpg"],
  categories: ["Nhà phố","Building"]
  },
   {
  ma: "2",
  proName: "TOÀ NHÀ VĂN PHÒNG ",
  title: "112 Trần Quốc Thảo",
  address: "112 Trần Quốc Thảo, Phường Xuân Hoà (P.VTS Q3 cũ), TP HCM",
  dienTich: "Ngang 14m x Dài 28m, Công nhận 412,09m², DTS 1008,8m²",
  ketCau: "Hầm, 4 tầng, Sân thượng",
  giaBan: "330 tỷ",
  hopDong: "430 triệu",
  huong: "Tây Nam",
  phapLy: "Cá nhân",
  viTri: "Giữa đường Trần Quốc Thảo và Lý Chính Thắng",
  allPhoto: ["112tqt1.jpg","112tqt2.jpg","112tqt3.jpg","112tqt4.jpg"],
  categories: ["Nhà phố","Building",]
  },
  {
  ma: "3",
  proName: "Biệt Thự Phan Kế Bính",
  title: "20 Phan Kế Bính",
  address: "20 Phan Kế Bính, Phường Sài Gòn (Đakao Q1 cũ), TP HCM",
  dienTich: "Ngang 9m x Dài 25m, Công nhận 224m², DTS 257,81m²",
  ketCau: "2 tầng",
  giaBan: "140 tỷ",
  hopDong: "145 triệu",
  huong: "Tây Bắc",
  phapLy: "Cá nhân",
  viTri: "Phan Kế Bính với Điện Biên Phủ",
  allPhoto: ["3.1.jpg","3.2.jpg","3.3.jpg","3.4.jpg"],
  categories: ["Biệt thự"]
  },
   {
  ma: "4",
  proName: "Toà Nhà Văn Phòng",
  title: "473 Lê Quang Định",
  address: "473 Lê Quang Định, Phường Hạnh Thông,(P1 Gò Vấp cũ), TP HCM",
  dienTich: "Ngang 8m x Dài 22m, Công nhận 183m², DTS 876m²",
  ketCau: "7 Tầng",
  giaBan: "72 tỷ",
  hopDong: "145 triệu",
  huong: "Tây Bắc",
  phapLy: "Cá nhân",
  viTri: "Lê Quang Định với Phan Văn Trị",
  allPhoto: ["lqd1.jpg","lqd2.jpg","lqd3.jpg","lqd4.jpg"],
  categories: ["Building"]
  },
   {
  ma: "5",
  proName: "NHÀ MẶT TIỀN NGUYỄN KHẮC NHU",
  title: "25-27 Nguyễn Khắc Như",
  address: "25-27 Nguyễn Khắc Như, Phường Cầu Ông Lãnh (Cô Giang Q1cũ), TP HCM",
  dienTich: "Ngang 11m x Dài 29m, Công nhận 290,3m², DTS 600m²",
  ketCau: "3Tầng",
  giaBan: "185 tỷ",
  hopDong: "120 triệu",
  huong: "Đông Bắc",
  phapLy: "Cá nhân",
  viTri: "Nguyễn Khắc Nhu với Nguyễn Thái Học",
  allPhoto: ["nkn1.jpg","nkn2.jpg","nkn3.jpg","nkn4.jpg"],
  categories: ["Building", "Nhà phố"]
  },
  {
  ma: "6",
  proName: "Khách sạn Quận 1",
  title: "18 Bùi Thị Xuân",
  address: "18 Bùi Thị Xuân, Phường Bến Thành (Quận 1 cũ), TP HCM",
  dienTich: "Ngang 5.3m x Dài 23m, Công nhận 113m², DTS gần 112.8m²",
  ketCau: "Hầm, 12 tầng",
  giaBan: "115",
  hopDong: "400 triệu",
  huong: "Đông Nam",
  phapLy: "cá nhân",
  viTri: "Giữa đường Bùi Thị Xuân với Cách Mạng Tháng Tám",
  allPhoto: ["btx1.jpg","btx2.jpg","btx3.jpg","btx4.jpg"],
  categories: ["Nhà phố","Building"],
  },
  {
  ma: "7",
  proName: "TOÀ NHÀ VĂN PHÒNG",
  title: "27-29 Nam Kỳ Khởi Nghĩa",
  address: "27-29 Nam Kỳ Khởi Nghĩa, Phường Sài Gòn (Nguyễn Thái Bình, Quận 1), TP HCM",
  dienTich: "Ngang 8m x Dài 26m, Công nhận 209m², DTS 893,98m²",
  ketCau: "2 Hầm, 6tầng",
  giaBan: "240 tỷ",
  hopDong: "460 triệu/tháng",
  huong: "Đông Bắc",
  phapLy: "Cá Nhân",
  viTri: "Nam Kỳ Khởi Nghĩa với Nguyễn Công Trứ",
  allPhoto: ["nkkn1.jpg","nkkn2.jpg","nkkn3.jpg","nkkn4.jpg"],
  categories: ["Nhà phố","Building",]
  },
  {
ma: "8",
proName: "NHÀ MẶT TIỀN LÝ TỰ TRỌNG",
title: "119 Lý Tự Trọng",
address: "119 Lý Tự Trọng, Phường Bến Thành (Quận 1 cũ), TP HCM",
dienTich: "Ngang 5,1m x Dài 20,15m, Công nhận 88,6m², DTS 500m²",
ketCau: "3 tầng",
giaBan: "120 tỷ",
hopDong: "200 Triệu/tháng",
huong: "Tây Bắc",
phapLy: "Cá Nhân",
viTri: "Lý Tự Trọng với Thủ Khoa Huân",
allPhoto: ["119ltt1.png","119ltt2.png","119ltt3.png","119ltt4.png"],
categories: ["Nhà phố","Building"]
},
{
ma: "9",
proName: "BIỆT THỰ NGUYỄN THÀNH Ý",
title: "2 Nguyễn Thành Ý",
address: "2 Nguyễn Thành Ý, Phường Tân Định (Dakao,Q1 cũ), TP HCM",
dienTich: "Ngang 14,5m x Dài 19m, Công nhận 239m², DTS 549m²",
ketCau: "3 tầng",
giaBan: "130 tỷ",
hopDong: "200 Triệu/tháng",
huong: "Tây Bắc",
phapLy: "Cá Nhân",
viTri: "Nguyễn Thành Ý với Đinh Tiên Hoàng",
allPhoto: ["9.1.jpg","9.2.jpg","9.3.jpg","9.4.jpg"],
categories: ["Nhà phố","Biệt thự"]
 },
 {
  ma: "10",
  proName: "TOÀN NHÀ VĂN PHÒNG",
  title: "2Bis Công Trường Quốc Tế",
  address: "2Bis Công Trường Quốc Tế, Phường Xuân Hoà (VTS, Quận 3 cũ), TP HCM",
  dienTich: "Ngang 15m x Dài 26m, công nhận 366,2m², DTS 2316m²",
  ketCau: "2 Hầm, 8 tầng",
  giaBan: "700 tỷ",
  hopDong: "2 tỷ/tháng",
  huong: "Tây Bắc",
  phapLy: "Cá nhân",
  viTri: "Giữa đường Công Trường Quốc Tế với Trần Cao Vân",
  allPhoto: ["10.1.jpg","10.2.jpg","10.3.jpg","10.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
 {
  ma: "11",
  proName: "Khách sạn Quận 1",
  title: "21 Bùi Thị Xuân",
  address: "21 Bùi Thị Xuân, Phường Bến Thành (Quận 1 cũ), TP HCM",
  dienTich: "Ngang 8m x Dài 16m, công nhận 129m², DTS 923,5m²",
  ketCau: "8 tầng",
  giaBan: "135 tỷ",
  hopDong: "300 Triệu/tháng",
  huong: "Tây Bắc",
  phapLy: "cá nhân",
  viTri: "Giữa đường Bùi Thị Xuân với Cách Mạng Tháng Tám",
  allPhoto: ["11.1.jpg","11.2.jpg","11.3.jpg","11.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
 {
  ma: "12",
  proName: "TOÀ NHÀ VĂN PHÒNG",
  title: "546-548 Cách Mạng Tháng 8",
  address: "546-548 Cách Mạng Tháng 8, Phường Nhiêu Lộc (11, Quận 3 cũ), TP HCM",
  dienTich: "Ngang 15m x Dài 36m, Nở hậu 26m , Công nhận 668m², DTS 6000m²",
  ketCau: "2 Hầm 10 tầng",
  giaBan: "450 tỷ",
  hopDong: "900 Triệu/tháng",
  huong: "Tây Nam",
  phapLy: "Cá nhân",
  viTri: "Giữa đường Cách Mạng Tháng 8, với Lê Thị Riêng",
  allPhoto: ["12.1.jpg","12.2.jpg","12.3.jpg","12.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
 {
  ma: "13",
  proName: "TOÀ NHÀ VĂN PHÒNG",
  title: "11Bis Nguyễn Gia Thiều",
  address: "11Bis Nguyễn Gia Thiều, Phường Xuân Hoà (VTS, Quận 3 cũ), TP HCM",
  dienTich: "Ngang 26m x Dài 39m , Công nhận 995m², DTS 4826m²",
  ketCau: "Hầm 10 tầng",
  giaBan: "700 tỷ",
  hopDong: "1,2 tỷ/tháng",
  huong: "Đông Bắc",
  phapLy: "Cá nhân",
  viTri: "Giữa đường Nguyễn Gia Thiều, với Nguyễn Đình Chiểu",
  allPhoto: ["13.1.jpg","13.2.jpg","13.3.jpg","13.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
  {
  ma: "14",
  proName: "NHÀ MẶT TIỀN BÙI THỊ XUÂN",
  title: "118 Bùi Thị Xuân",
  address: "118 Bùi Thị Xuân, Phường Bến Thành (Quận 1 cũ), TP HCM",
  dienTich: "Ngang 24m x Dài 14m, Công nhận 305m², DTS 493,65m²",
  ketCau: "3 tầng, GPXD Hầm 12 tầng",
  giaBan: "360 tỷ",
  hopDong: "700 Triệu/tháng",
  huong: "Bắc",
  phapLy: "Cá nhân",
  viTri: "Giữa đường Bùi Thị Xuân, với Tôn Thất Tùng",
  allPhoto: ["14.1.jpg","14.2.jpg","14.3.jpg","14.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
 {
  ma: "15",
  proName: "TOÀ NHÀ VĂN PHÒNG",
  title: "307B Nguyễn Văn Trỗi",
  address: "307B Nguyễn Văn Trỗi, Phường Tân Sơn Nhất (1 Quận TB cũ), TP HCM",
  dienTich: "Ngang 11m x Dài 15m, Công nhận 168,72m², DTS 1262,73m²",
  ketCau: "Hầm 10 tầng",
  giaBan: "155 tỷ",
  hopDong: "1 tỷ/tháng",
  huong: "Đông Bắc",
  phapLy: "Cá nhân",
  viTri: "Giữa đường Nguyễn Văn Trồi, với Hoàng Văn THụ",
  allPhoto: ["15.1.jpg","15.2.jpg","15.3.jpg","15.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
 {
  ma: "17",
  proName: "TOÀ NHÀ VĂN PHÒNG",
  title: "111 đường Lý Chính Thắng",
  address: "111 đường Lý Chính Thắng, Phường Xuân Hoà (VTS Quận 3cũ), TP HCM",
  dienTich: "Ngang 11,5m x Dài 29m Nở hậu 12m, Công nhận 336m², DTS 2329m²",
  ketCau: "Hầm 12 tầng",
  giaBan: "330 tỷ",
  hopDong: "700 Triệu/tháng",
  huong: "Tây bắc",
  phapLy: "CTCP Mua bán 100% cổ phần",
  viTri: "Giữa đường Lý Chính Thắng, với Nam Kỳ Khởi Nghĩa",
  allPhoto: ["17.1.jpg","17.2.jpg","17.3.jpg","17.4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
 },
]


};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateLogin(state, action) {
      state.login = action.payload;
    },
    updateOverlay(state, action) {
      state.overlay = action.payload;
    },
    updateSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { updateLogin, updateOverlay, updateSelectedCategory } =
  dataSlice.actions;
export default dataSlice.reducer;

