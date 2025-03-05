import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      productData: [],
      userInfo: null,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.productData.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              productData: state.productData.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                  : item
              ),
            };
          }

          return { productData: [...state.productData, { ...product, quantity: product.quantity || 1 }] };
        }),

      deleteFromCart: (id) =>
        set((state) => ({
          productData: state.productData.filter((item) => item.id !== id),
        })),

      resetCart: () => set({ productData: [] }),

      incrementQuantity: (id) =>
        set((state) => ({

          
          productData: state.productData.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          productData: state.productData.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          ),
        })),

      addUser: (user) => set({ userInfo: user }),

      removeUser: () => set({ userInfo: null }),
    }),
    {
      name: "bazar-storage",
      getStorage: () => localStorage, // Asegura que se usa localStorage correctamente
    }
  )
);
