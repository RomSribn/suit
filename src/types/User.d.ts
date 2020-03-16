interface User {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  isConfirmed?: boolean;
}

type Profile = {
  createDate?: string;
  token: string;
  user: string;
} | null;

interface IUserStore {
  isAuth: boolean;
  profile: Profile | null;
  isFetching: boolean;
  error: Error | null

  fetchLogin: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any> | void

  removeAuth: () => void
}