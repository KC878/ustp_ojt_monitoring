import { create } from 'zustand';

interface GlobalState {
  authAction: string;
  setAuthAction: (action: string) => void;
  
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

  authAction: 'login',
  setAuthAction: (action) => set({ authAction: action })

}));


