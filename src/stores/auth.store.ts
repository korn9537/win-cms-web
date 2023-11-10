import { KEY_SESSION } from '@/configs/app.config';
import { loadProfile, login, logout } from '@/services/auth-service';
import { create } from 'zustand';

interface IProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  mobile?: string;
  thumbnail?: string;
}

interface AuthStore {
  is_authenticated: boolean;
  is_loading: boolean;
  is_loaded: boolean;
  profile: IProfile | null;
  role: string;
  permissions: string[];
  error: string | null;
  login: (data: { username: string; password: string }, onSuccess?: () => void) => Promise<void>;
  loadProfile: (token?: string, onSuccess?: (result: any) => void) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  is_authenticated: false,
  is_loading: false,
  is_loaded: false,
  profile: null,
  role: '',
  permissions: [],
  error: null,

  login: async ({ username, password }: { username: string; password: string }, onSuccess?: () => void) => {
    try {
      set({ is_loading: true, error: null });

      const {
        data: { token },
      } = await login(username, password);

      // set localstorage
      localStorage.setItem(KEY_SESSION, token);

      // load user
      const {
        data: { profile, permissions, role },
      } = await loadProfile(token);

      set({
        is_loading: false,
        is_loaded: true,
        profile: profile,
        permissions: permissions,
        role: role,
        is_authenticated: true,
      });

      if (onSuccess) {
        onSuccess();
      }

      // const redirect_url = Cookies.get(KEY_COOKIE_AUTH_POSTBACK);
      // if (redirect_url) {
      //   // remove cookie
      //   Cookies.remove(KEY_COOKIE_AUTH_POSTBACK);
      //   //
      //   location.href = redirect_url;
      // }
    } catch (error: any) {
      set({
        is_loading: false,
        error: error?.response?.data?.error_message || 'เกิดข้อผิดพลาดไม่สามารถเข้าสู่ระบบได้',
      });
    }
  },
  loadProfile: async (token?: string, onSuccess?: (result: any) => void) => {
    try {
      set({ is_loading: true });

      // load user
      const { data } = await loadProfile(token);
      const { profile } = data;

      set({ is_loading: false, is_loaded: true, profile: profile, is_authenticated: true });

      onSuccess && onSuccess(data);
    } catch (error) {
      set({ is_loading: false, is_loaded: true });
      //
      localStorage.removeItem(KEY_SESSION);
      window.location.replace('/auth/login');
    }
  },
  logout: async () => {
    try {
      await logout();
      // set localstorage
      localStorage.removeItem(KEY_SESSION);
      //
      set({
        is_authenticated: false,
        is_loading: false,
        is_loaded: false,
        profile: null,
        role: '',
        permissions: [],
      });
    } catch (error) {
      console.log(error);
    } finally {
      // redirect
      window.location.replace('/auth/login');
    }
  },
}));
