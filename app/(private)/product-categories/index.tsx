import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/Container";
import Radio from "../../../components/Radio";
import useCreatePost from "../../../hooks/useCreatePost";

const CATEGORIES = [
  'Frutas',
  'Legumes',
  'Verduras',
  'Hortifruti',
]

export default function ProductCategoriesScreen() {
  const { data, setPostData } = useCreatePost();

  const handleCategoryToggle = (category: string) => {
    setPostData({ category });
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <BackButton color="#000" />

        <Text style={styles.headerTitle}>Categorias</Text>
      </View>

      <View style={styles.categories}>
        {CATEGORIES.map(category => (
          <View key={category} style={styles.category} >
            <Radio
              value={data?.category === category}
              onChange={() => handleCategoryToggle(category)}
            />

            <TouchableOpacity onPress={() => handleCategoryToggle(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 22,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  categories: {
    gap: 16,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
