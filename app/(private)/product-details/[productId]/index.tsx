import Container from "../../../../components/Container";
import { useLocalSearchParams, useRouter } from "expo-router";

import oranges from '../../../../assets/pCjw_ygKCv0.png';
import carrot from '../../../../assets/ZgDHMMd72I8.png';
import cuke from '../../../../assets/Za9HGBK5ALA.png';
import tomatoes from '../../../../assets/idealbookshelfcp524-wgbhamericanexperience-bannedbooks-2000web 1.png';
import leafs from '../../../../assets/vegetable-salad-spinach-leaf-hd-png-11653148602v7y8oymh2y 3.png';
import { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ImageSourcePropType, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import If from "../../../../components/If";
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Button from "../../../../components/Button";

interface IProduct {
  id: number;
  name: string;
  description: string;
  owner: string;
  price: number;
  image: ImageSourcePropType;
}

const products: IProduct[] = [
  {
    id: 1,
    name: 'Oranges',
    description: 'Juicy, sweet citrus fruits with a bright orange peel. High in vitamin C and commonly eaten fresh or as juice.',
    owner: 'Atacadão Dia a Dia',
    price: 10,
    image: oranges,
  },
  {
    id: 2,
    name: 'Carrots',
    description: 'Crunchy, orange root vegetables with a mildly sweet flavor. Rich in beta-carotene, which the body converts to vitamin A.',
    owner: 'Tatico',
    price: 6,
    image: carrot,
  },
  {
    id: 3,
    name: 'Cuke',
    description: 'Short for "cucumber." A green-skinned vegetable with a mild taste and high water content. Often eaten raw in salads or pickled.',
    owner: 'Primor',
    price: 5,
    image: cuke,
  },
  {
    id: 4,
    name: 'Tomatoes',
    description: 'Red (sometimes yellow or green) fruits with a juicy texture and slightly tangy flavor. Widely used fresh or cooked in many dishes.',
    owner: 'Comper',
    price: 7,
    image: tomatoes,
  },
  {
    id: 5,
    name: 'Leafs',
    description: 'A general term for vegetables like lettuce, spinach, or kale. Packed with fiber, vitamins, and minerals; often eaten raw in salads.',
    owner: 'Soberano',
    price: 3.5,
    image: leafs,
  },
]

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const product = products.find(p => p.id === Number(productId));

    setProduct(product || null);
  }, [productId]);

  const numberFormat = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format;

  const handlePushBack = () => {
    router.back();
  }

  return (
    <Container style={[product ? { paddingTop: 0 } : {}]}>
      <StatusBar barStyle="light-content" />

      <If
        condition={Boolean(product)}
        otherwise={<Text>Não foi possível encontrar este produto!</Text>}
      >
        <ScrollView style={styles.container}>
          <ImageBackground
            source={product?.image}
            style={styles.header}
          >
            <View style={styles.backdrop} />

            <TouchableOpacity onPress={handlePushBack}>
              <Feather name="chevron-left" size={32} color="#fff" />
            </TouchableOpacity>
          </ImageBackground>

          <View style={styles.content}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productName}>{product?.name}</Text>

              <TouchableOpacity>
                <Feather name="heart" size={29} />
              </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Descrição</Text>

              <Text style={styles.description}>{product?.description}</Text>

              <Text style={styles.productOwner}>{product?.owner}</Text>
            </View>

            <View style={styles.priceContainer}>
              <View style={styles.priceTextContainer}>
                <Text style={styles.totalPriceText}>Total price</Text>
                <Text style={styles.price}>{numberFormat(product?.price || 0)}</Text>
              </View>

              <Button style={styles.button}>Contact seller</Button>
            </View>
          </View>
        </ScrollView>
      </If>
    </Container>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, .4)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('screen').height * .35,
    width: Dimensions.get('screen').width,
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
    height: Dimensions.get('screen').height * .35,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  productNameContainer: {
    paddingVertical: 24,
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionContainer: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#A9A9A9'
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
  },
  productOwner: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  priceTextContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
  }
});
