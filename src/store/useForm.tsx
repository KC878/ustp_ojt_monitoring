import { create } from 'zustand';
import { FormInstance } from 'antd/es/form'; // Import the FormInstance type from Ant Design


interface FormStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any> | undefined; // Correctly type the form instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setForm: (form: FormInstance<any>) => void; // Correctly type the setter
}

export const useForm = create<FormStore>((set) => ({
  form: undefined, // Start with undefined instead of null
  setForm: (form) => set({ form }), // Store the form instance in the store
}));
