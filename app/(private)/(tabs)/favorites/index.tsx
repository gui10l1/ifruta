import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Container from "../../../../components/Container";
import { useFavorites } from "../../../../contexts/FavoriteContext";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const categories = ["All", "Clothes", "Fridge", "Oven"];

export default function FavoritesTab() {
  const { favorites } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigation = useNavigation();

  const filteredFavorites =
    selectedCategory === "All"
      ? favorites
      : favorites.filter((item) => item.category === selectedCategory);

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>My Wishlist</Text>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
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
            <View key={product.id} style={styles.card}>
              <Image source={product.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>5</Text>
                </View>
                <Text style={styles.price}>R${product.price.toFixed(2)}/kg</Text>
              </View>
            </View>
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
