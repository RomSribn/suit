interface User {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  isConfirmed?: boolean;
}

type Role = 'STYLIST' | 'CUSTOMER';

type Profile = {
  createDate?: string;
  token: string;
  user: string;
  role: Role;
} | null;

interface IUserStore {
  isAuth: boolean;
  profile: Profile | null;
  isFetching: boolean;
  error: Error | null;
  fetchLogin: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any> | void;
  removeAuth: () => void;
}