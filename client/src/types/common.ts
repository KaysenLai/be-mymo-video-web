export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface GoogleLogin {
  avatar: string;
  token: string;
  GoogleLoginInfo: GoogleLoginInfo;
}

export interface GoogleLoginInfo {
  email: string;
  name: string;
}

export interface UserInfo {
  _id?: string;
  name: string;
  email: string;
  token: string;
  avatar: string;
}
