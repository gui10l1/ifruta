import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IProduct } from "./interfaces";

export default function Product({ image, name, price, onPress }: IProduct) {
  const numberFormat = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={image} resizeMode="cover" />

      <View style={styles.productTitleContainer}>
        <Text style={styles.productTitle}>{numberFormat(price)}/kg</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  image: {
    width: '100%',
  },
  productTitleContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  productTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
});
