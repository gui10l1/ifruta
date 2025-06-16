import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/Container";
import Radio from "../../../components/Radio";
import { useState } from "react";
import useCreatePost from "../../../hooks/useCreatePost";

const STATES = [
  'Bom',
  'Aceitavel',
  'Ruim',
]

export default function ProductStateScreen() {
  const { data, setPostData } = useCreatePost();

  const handleStateToggle = (state: string) => {
    setPostData({ state });
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <BackButton color="#000" />

        <Text style={styles.headerTitle}>Condições</Text>
      </View>

      <View style={styles.categories}>
        {STATES.map(state => (
          <View key={state} style={styles.category} >
            <Radio
              value={data?.state === state}
              onChange={() => handleStateToggle(state)}
            />

            <TouchableOpacity onPress={() => handleStateToggle(state)}>
              <Text style={styles.categoryText}>{state}</Text>
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
