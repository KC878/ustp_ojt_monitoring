import { create } from 'zustand';

interface GlobalState {
  loading: boolean;
  setLoading: (start: boolean) => void;

}

export const useLoading = create<GlobalState>((set) => ({
  loading: true,
  setLoading: (start) => set({ loading: start }),

}));
