// hooks/useFavorites.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "@/types";

const FAVORITES_KEY = "@favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (json) {
      setFavorites(JSON.parse(json));
    }
  }

  async function toggleFavorite(product: Product) {
    let updated;
    if (favorites.some((p) => p.id === product.id)) {
      updated = favorites.filter((p) => p.id !== product.id);
    } else {
      updated = [...favorites, product];
    }

    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  return { favorites, toggleFavorite };
}
