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
  dienTich: "ngang 4.5m x dài 43m NH 20m, Công nhận 553,3m², DTS 1.922m²",
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
  dienTich: "ngang 14m x dài 28m, Công nhận 412,09m², DTS 1008,8m²",
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
  dienTich: "ngang 9m x dài 25m, Công nhận 224m², DTS 257,81m²",
  ketCau: "2 tầng",
  giaBan: "140 tỷ",
  hopDong: "145 triệu",
  huong: "Tây Bắc",
  phapLy: "Cá nhân",
  viTri: "Phan Kế Bính với Điện Biên Phủ",
  allPhoto: ["btpkb_2.jpg","btpkb_3.jpg","btpkb_4.jpg",""],
  categories: ["Biệt thự"]
  },
   {
  ma: "4",
  proName: "Toà Nhà Văn Phòng",
  title: "473 Lê Quang Định",
  address: "473 Lê Quang Định, Phường Hạnh Thông,(P1 Gò Vấp cũ), TP HCM",
  dienTich: "ngang 8m x dài 22m, Công nhận 183m², DTS 876m²",
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
  dienTich: "ngang 11m x dài 29m, Công nhận 290,3m², DTS 600m²",
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
  address: "18 Bùi Thị Xuân, Phường Phường Bến Thành (Quận 1 cũ), TP HCM",
  dienTich: "ngang 5.3m x dài 23m, công nhận 113m², DTS gần 112.8m²",
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
  dienTich: "ngang 8m x dài 26m, Công nhận 209m², DTS 893,98m²",
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
  proName: "Khách sạn Quận 1",
  title: "18 Bùi Thị Xuân",
  address: "18 Bùi Thị Xuân, Phường Phường Bến Thành (Quận 1 cũ), TP HCM",
  dienTich: "ngang 5.3m x dài 23m, công nhận 113m², DTS gần 112.8m²",
  ketCau: "Hầm, 12 tầng",
  giaBan: "115",
  hopDong: "400 triệu",
  huong: "Đông Nam",
  phapLy: "cá nhân",
  viTri: "Giữa đường Bùi Thị Xuân với Cách Mạng Tháng Tám",
  allPhoto: ["btx1.jpg","btx2.jpg","btx3.jpg","btx4.jpg"],
  categories: ["Nhà phố","Building"],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269617709981!2d106.6988459!3d10.7906501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ca96141627%3A0x41c7fdc05beaac35!2zMjAgUGhhbiBL4bq_IELDrW5oLCDEkGEgS2FvLCBRdeG6rW4gMSwgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1753775690244!5m2!1svi!2s"
  }
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

