// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: (token) => {
        const decodedUser = jwtDecode(token);
        set({ token, user: decodedUser });
      },
      logout: () => {
        set({ token: null, user: null });
      },
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'auth-storage', // name of the item in storage (must be unique)
      onRehydrateStorage: () => (state) => {
        if (state && state.token) {
          const decodedUser = jwtDecode(state.token);
          state.user = decodedUser;
        }
      },
    }
  )
);

export default useAuthStore;