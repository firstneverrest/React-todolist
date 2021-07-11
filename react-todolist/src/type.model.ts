export interface AuthContext {
  token: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}
