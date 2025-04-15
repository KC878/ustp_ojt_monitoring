import { create } from 'zustand';
import { persist } from 'zustand/middleware'



interface GlobalState {
  // set wheter to use Login or Signup
  userID: string;
  setUserID: (id: string) => void;

  name: string,
  setName: (userName: string) => void;

  email: string,
  setEmail: (userEmail: string) => void;

  password: string,
  setPassword: (pass: string) => void;
  
  roleID: number;
  setRoleID: (role: number) => void;

  created_at: string;
  setCreated_At: (dateTime: string) => void;

  emailExist: boolean;
  setEmailExist: (result: boolean) => void; 

  logout: boolean;
  setLogout: (action: boolean) => void;

  showLogoutPage: boolean;
  setShowLogoutPage: (action: boolean) => void;

}

export const useAuth = create<GlobalState>((set) => ({
  userID: '',
  setUserID: (id) => set({ userID: id }),

  name: '',
  setName: (userName) => set({ name: userName }),

  email: '',
  setEmail: (userEmail) => set({ email: userEmail }),

  password: '',
  setPassword: (pass) => set({ password: pass }),

  roleID: 1, // set Default 1 == Student
  setRoleID: (role) => set({ roleID: role }),

  created_at: '',
  setCreated_At: (dateTime) => set({ created_at: dateTime }),

  emailExist: false,
  setEmailExist: (result) => set({ emailExist: result}),

  logout: false,
  setLogout: (action) => set({ logout: action }),

  showLogoutPage: false,
  setShowLogoutPage: (action) => set({ showLogoutPage: action }),
}));


interface AuthMiddleWare{
  authAction: 'login' | 'signup';
  setAuthAction: (action: 'login' | 'signup') => void;
}

export const useAuthMiddleware = create<AuthMiddleWare>()(
  persist(
    (set) => ({
      authAction: 'signup',
      setAuthAction: (action) => set({ authAction: action }),
    }),
    {
      name: 'auth-component', // localStorage key
      partialize: (state) => ({ authAction: state.authAction }),
    }
  )
);



