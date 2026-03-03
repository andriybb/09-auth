import { create } from 'zustand';

import { type User } from '@/types/user';

interface IsLogin {
  isAuthenticated: boolean;
  user: User;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
const initUser: User = {
  username: '',
  email: '',
  avatar: '',
};
const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
export const useLogin = create<IsLogin>()(set => ({
  isAuthenticated: false,
  user: initUser,
  setUser: data => set(() => ({ user: data, isAuthenticated: true })),
  clearIsAuthenticated: () =>
    set(() => ({ user: initUser, isAuthenticated: false })),
}));

export default useAuthStore;