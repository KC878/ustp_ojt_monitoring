import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface GlobalState {
  id: string;
  setID: () => void;
}

export const useGenerateID = create<GlobalState>((set) => ({
  id: uuidv4().replace(/-/g, ''),
  setID: () =>
    set(() => ({
      id: uuidv4().replace(/-/g, ''),
    })),
}));
