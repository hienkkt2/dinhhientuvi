
export type Gender = 'Nam' | 'Nữ';

export interface UserInfo {
  fullName: string;
  birthDate: string;
  gender: Gender;
  isLunar: boolean;
}

export interface CanChi {
  can: string;
  chi: string;
  full: string;
}

export interface HouseInfo {
  id: number;
  name: string;
  stars: {
    main: string[];
    sub: string[];
  };
  element: string;
  description?: string;
}

export interface HoroscopeData {
  userInfo: UserInfo;
  canChiYear: CanChi;
  element: string;
  houses: HouseInfo[];
}

export interface Interpretation {
  title: string;
  content: string;
  isPremium: boolean;
}
