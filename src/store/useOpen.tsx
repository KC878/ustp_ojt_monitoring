import { create } from 'zustand';

interface GlobalState {
  isStatModal: boolean;
  setStatModal: (state: boolean) => void;
}

export const useOpen = create<GlobalState>((set) => ({
  isStatModal: false,
  setStatModal: (state) => set({ isStatModal: state })
}))