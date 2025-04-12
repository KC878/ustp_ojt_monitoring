import { create } from 'zustand';

// Define the global state type
type GlobalState = {
  userToken: string | null; // The token can either be a string or null
  setUserToken: (newToken: string) => void; // Method to set the token
};

// Create the Zustand store with types
export const useToken = create<GlobalState>((set) => ({
  
  userToken: localStorage.getItem('user-token') || null,

  setUserToken: (newToken: string) => {
    set({ userToken: newToken });  
    localStorage.setItem('user-token', newToken); 
  },
}));
