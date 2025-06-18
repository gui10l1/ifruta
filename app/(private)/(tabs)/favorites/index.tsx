import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Container from "../../../../components/Container";
import { useFavorites } from "../../../../contexts/FavoriteContext";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { supabase } from "../../../../lib/supabase/supabase";
import getProductPhotoUrl from "../../../../utils/getProductPhotoUrl";

interface IFavorite {
  product_id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  full_name: string;
  title: string;
  price: number;
  description: string;
  category: string;
  type: string;
  photos: string[];
  state: string;
  avg_rating: number;
}

export default function FavoritesTab() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();

  const [favorites, setFavorites] = useState<IFavorite[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      const { data, error } = await supabase.rpc(`get_user_favorites`);

      if (error) {
        console.error("Error fetching favorites:", error);
        return;
      }

      setFavorites(data);
    }

    fetchFavorites();
  }, []);

  const filteredFavorites =
    selectedCategory === "All"
      ? favorites
      : favorites.filter((item) => item.category === selectedCategory);

  const handleNavigateToProductsScreen = (productId: string) => {
    router.push(`/(private)/product-details/${productId}`);
  }

  const categories = (() => {
    if (!favorites.length) return [];

    return favorites.reduce<string[]>(
      (acc, cur) => {
        const alreadyExists = acc.includes(cur.category);

        if (!alreadyExists) {
          acc.push(cur.category);
        }

        return acc;
      },
      []
    );
  })();

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Minha lista</Text>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category === selectedCategory ? 'All' : category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredFavorites.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum produto favorito ainda.</Text>
        ) : (
          filteredFavorites.map((product) => (
            <TouchableOpacity key={product.product_id} style={styles.card} onPress={() => handleNavigateToProductsScreen(product.product_id)}>
              <Image source={{ uri: getProductPhotoUrl(product?.photos[0]) }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{product.title}</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>{product.avg_rating}</Text>
                </View>
                <Text style={styles.price}>R${product.price.toFixed(2)}/kg</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d00",
  },
  categoryButtonSelected: {
    backgroundColor: "#d00",
  },
  categoryText: {
    color: "#d00",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  star: {
    color: "#d00",
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    color: "#000",
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#d00",
  },
});
