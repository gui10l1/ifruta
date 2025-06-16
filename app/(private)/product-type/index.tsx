import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/Container";
import Radio from "../../../components/Radio";
import { useState } from "react";
import useCreatePost from "../../../hooks/useCreatePost";

const TYPES = [
  'Comprar',
  'Vender',
]

export default function ProductTypesScreen() {
  const { data, setPostData } = useCreatePost();

  const handleTypeToggle = (type: string) => {
    setPostData({ type });
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <BackButton color="#000" />

        <Text style={styles.headerTitle}>Tipo de postagem</Text>
      </View>

      <View style={styles.categories}>
        {TYPES.map(type => (
          <View key={type} style={styles.category} >
            <Radio
              value={data?.type === type}
              onChange={() => handleTypeToggle(type)}
            />

            <TouchableOpacity onPress={() => handleTypeToggle(type)}>
              <Text style={styles.categoryText}>{type}</Text>
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
