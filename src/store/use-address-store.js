import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAddressStore = create(
  persist(
    (set) => ({
      name: '',
      last_name: '',
      phone: '',
      departament: '',
      city: '',
      address: '',
      setAddress: (data) => set((state) => ({ ...state, ...data })),
      resetAddress: () => set({ name: '', last_name: '', phone: '', departament: '', city: '', address: '' })
    }),
    { name: 'address-storage' } // Nombre del almacenamiento en localStorage
  )
);
