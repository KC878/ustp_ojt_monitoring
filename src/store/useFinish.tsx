
import { create } from 'zustand';

interface GlobalState {
  finishSubmit: boolean;
  setFinishSubmit: (state: boolean) => void;
}

export const useFinish = create<GlobalState>((set) => ({
  finishSubmit: false,
  setFinishSubmit: (state) => set({ finishSubmit: state}),
}))