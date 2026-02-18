
import { CANS, CHIS, ELEMENTS, HOUSES_ORDER, MAIN_STARS, SUB_STARS } from '../constants';
import { CanChi, HoroscopeData, UserInfo, HouseInfo } from '../types';

export const CURRENT_YEAR = 2026;

export const calculateCanChiYear = (year: number): CanChi => {
  const can = CANS[year % 10];
  const chi = CHIS[year % 12];
  return { can, chi, full: `${can} ${chi}` };
};

/**
 * Tra cứu Nạp Âm chi tiết dựa trên năm sinh (60 Hoa Giáp)
 */
export const getNapAm = (year: number): string => {
  const canChi = calculateCanChiYear(year).full;
  
  const napAmMap: Record<string, string> = {
    "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim",
    "Bính Dần": "Lư Trung Hỏa", "Đinh Mão": "Lư Trung Hỏa",
    "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tỵ": "Đại Lâm Mộc",
    "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
    "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim",
    "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
    "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy",
    "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
    "Canh Thìn": "Bạch Lạp Kim", "Tân Tỵ": "Bạch Lạp Kim",
    "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
    "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy",
    "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
    "Mậu Tý": "Thích Lịch Hỏa", "Kỷ Sửu": "Thích Lịch Hỏa",
    "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
    "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tỵ": "Trường Lưu Thủy",
    "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
    "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa",
    "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
    "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ",
    "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
    "Giáp Thìn": "Phú Đăng Hỏa", "Ất Tỵ": "Phú Đăng Hỏa",
    "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
    "Mậu Thân": "Đại Trạch Thổ", "Kỷ Dậu": "Đại Trạch Thổ",
    "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
    "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc",
    "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
    "Bính Thìn": "Sa Trung Thổ", "Đinh Tỵ": "Sa Trung Thổ",
    "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
    "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc",
    "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy"
  };

  return napAmMap[canChi] || "Thiên Hà Thủy";
};

export const generateLaso = (userInfo: UserInfo): HoroscopeData => {
  const birthDate = new Date(userInfo.birthDate);
  const birthYear = birthDate.getFullYear();
  const canChi = calculateCanChiYear(birthYear);
  const element = getNapAm(birthYear);

  const houses: HouseInfo[] = HOUSES_ORDER.map((name, index) => {
    const seed = userInfo.fullName.length + birthYear + index;
    const random = (s: number) => Math.sin(s) * 10000 - Math.floor(Math.sin(s) * 10000);

    const mainStarCount = Math.floor(random(seed) * 2) + 1;
    const subStarCount = Math.floor(random(seed + 1) * 4) + 3;
    
    const selectedMain = [...MAIN_STARS].sort(() => 0.5 - random(seed + 2)).slice(0, mainStarCount);
    const selectedSub = [...SUB_STARS].sort(() => 0.5 - random(seed + 3)).slice(0, subStarCount);

    return {
      id: index,
      name,
      stars: {
        main: selectedMain,
        sub: selectedSub
      },
      element: ELEMENTS[index % 5]
    };
  });

  return {
    userInfo,
    canChiYear: canChi,
    element,
    houses
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};
