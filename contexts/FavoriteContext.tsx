// src/contexts/FavoritesContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { IProduct } from "../constants/products";

type FavoritesContextType = {
  favorites: IProduct[];
  toggleFavorite: (product: IProduct) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<IProduct[]>([]);

  const toggleFavorite = (product: IProduct) => {
    setFavorites((prev) => {
      const isFav = prev.find((p) => p.id === product.id);
      if (isFav) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (id: number) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
