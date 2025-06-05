import Container from "../../../../components/Container";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ImageSourcePropType, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import If from "../../../../components/If";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Button from "../../../../components/Button";
import BackButton from "../../../../components/BackButton";
import products, { IProduct } from "../../../../constants/products";

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const product = products.find(p => p.id === Number(productId));

    setProduct(product || null);
  }, [productId]);

  const numberFormat = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format;

  const handlePushToContact = (sellerId: number) => {
    router.push(`/(private)/chat/${sellerId}`);
  }

  const handlePushToSellerProfile = (ownerId: number) => {
    router.push(`/(private)/seller-profile/${ownerId}`)
  }

  const handleFavoriteButton = () => {
    setFavorite(!favorite);
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

            <BackButton />
          </ImageBackground>

          <View style={styles.content}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productName}>{product?.name}</Text>

              <TouchableOpacity onPress={handleFavoriteButton}>
                <MaterialIcons name={favorite ? 'favorite' : 'favorite-border'} size={29} />
              </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Descrição</Text>

              <Text style={styles.description}>{product?.description}</Text>

              <TouchableOpacity
                onPress={() => product?.ownerId && handlePushToSellerProfile(product.ownerId)}
              >
                <Text style={styles.productOwner}>{product?.owner}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
              <View style={styles.priceTextContainer}>
                <Text style={styles.totalPriceText}>Total price</Text>
                <Text style={styles.price}>{numberFormat(product?.price || 0)}</Text>
              </View>

              <Button style={styles.button} onPress={() => product?.ownerId && handlePushToContact(product?.ownerId)}>Contact seller</Button>
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
