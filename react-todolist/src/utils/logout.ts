import { deleteCookie } from './cookie';

export const logout = () => {
  deleteCookie('token');
};
