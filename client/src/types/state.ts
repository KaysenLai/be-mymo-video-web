import { UserInfo } from './common';

export interface State {
  userLogin: {
    isAuthenticated: boolean;
    isLoading: boolean;
    errorMessage: string;
    userInfo: UserInfo;
  };
}
