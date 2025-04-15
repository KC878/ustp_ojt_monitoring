import { create } from 'zustand';

interface GlobalState {
  loading: boolean;
  setLoading: (start: boolean) => void;

  refreshWindow: boolean;
  setRefreshWindow: (start: boolean) => void;

}

export const useLoading = create<GlobalState>((set) => ({
  loading: true,
  setLoading: (start) => set({ loading: start }),

  refreshWindow: false,
  setRefreshWindow: (start) => set({ refreshWindow: start }),

}));
