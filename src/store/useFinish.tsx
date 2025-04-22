
import { create } from 'zustand';

interface GlobalState {
  finishSubmit: boolean;
  setFinishSubmit: (state: boolean) => void;

  reload: boolean;
  setReload: (state: boolean) => void;

  finishDuty: boolean;
  setFinishDuty: (state: boolean) => void;
}

export const useFinish = create<GlobalState>((set) => ({
  finishSubmit: false,
  setFinishSubmit: (state) => set({ finishSubmit: state}),

  reload: false,
  setReload: (state) => set({ reload: state }),

  finishDuty: false,
  setFinishDuty: (state) => set({ finishDuty: state }),
}))