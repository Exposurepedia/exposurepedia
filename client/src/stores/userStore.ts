import { create } from 'zustand';
import { User } from '../types';

export interface UserSlice {
  currentUser?: User;
  setCurrentUser: (user?: User) => void;
}

export const useUserStore = create<UserSlice>((set) => ({
  currentUser: undefined,
  setCurrentUser: (currentUser) => {
    set({ currentUser });
  },
}));
