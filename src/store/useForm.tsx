import { create } from 'zustand';
import { FormInstance } from 'antd/es/form'; // Import the FormInstance type from Ant Design

interface FormStore {
  form: FormInstance<any> | undefined; // Correctly type the form instance
  setForm: (form: FormInstance<any>) => void; // Correctly type the setter
}

export const useForm = create<FormStore>((set) => ({
  form: undefined, // Start with undefined instead of null
  setForm: (form) => set({ form }), // Store the form instance in the store
}));
