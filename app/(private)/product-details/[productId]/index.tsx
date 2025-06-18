// app/(private)/product/[productId]/ProductDetailsScreen.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

import Container from "../../../../components/Container";
import If from "../../../../components/If";
import Button from "../../../../components/Button";
import BackButton from "../../../../components/BackButton";
import { supabase } from "../../../../lib/supabase/supabase";
import getProductPhotoUrl from "../../../../utils/getProductPhotoUrl";

interface IProduct {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  price: number;
  photos: string[];
  user_id: string;
  full_name: string;
  favorite: boolean;
}

export default function ProductDetailsScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase.rpc(`get_product_by_id`, {
        _product_id: productId,
      });

      if (error) {
        console.error("Error fetching product:", error);
        return;
      }

      setProduct(data[0] || null);
    }

    loadProduct();
  }, [productId]);

  const numberFormat = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format;

  const handlePushToContact = (sellerId: string) => {
    router.push(`/(private)/chat/${sellerId}`);
  };

  const handlePushToSellerProfile = (ownerId: string) => {
    router.push(`/(private)/seller-profile/${ownerId}?productId=${productId}`);
  };

  const handleFavoriteButton = async () => {
    if (!product) return;

    const { data, error } = await supabase.rpc('toggle_favorite_product', {
      _prod_id: product.id,
    });

    if (error) {
      console.error("Error toggling favorite product:", error);
      return;
    }

    setProduct({ ...product, favorite: data });
  };

  return (
    <Container style={[product ? { paddingTop: 0 } : {}]}>
      <StatusBar barStyle="light-content" />
      <If
        condition={Boolean(product)}
        otherwise={<Text>Não foi possível encontrar este produto!</Text>}
      >
        <ScrollView style={styles.container}>
          <ImageBackground source={{ uri: getProductPhotoUrl(product?.photos[0]) }} style={styles.header}>
            <View style={styles.backdrop} />
            <BackButton />
          </ImageBackground>

          <View style={styles.content}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productName}>{product?.title}</Text>
              <TouchableOpacity onPress={handleFavoriteButton}>
                <MaterialIcons
                  name={product?.favorite ? 'favorite' : "favorite-border"}
                  size={29}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Descrição</Text>
              <Text style={styles.description}>{product?.description}</Text>
              <TouchableOpacity
                onPress={() =>
                  product?.user_id && handlePushToSellerProfile(product.user_id)
                }
              >
                <Text style={styles.productOwner}>{product?.full_name}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceContainer}>
              <View style={styles.priceTextContainer}>
                <Text style={styles.totalPriceText}>Preço</Text>
                <Text style={styles.price}>{numberFormat(product?.price || 0)}</Text>
              </View>

              <Button
                style={styles.button}
                onPress={() => product?.user_id && handlePushToContact(product.user_id)}
              >
                Falar com vendedor
              </Button>
            </View>
          </View>
        </ScrollView>
      </If>
    </Container>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, .4)",
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("screen").height * 0.35,
    width: Dimensions.get("screen").width,
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
    height: Dimensions.get("screen").height * 0.35,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  productNameContainer: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  descriptionContainer: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: "#A9A9A9",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
  },
  productOwner: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  priceTextContainer: {
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
  },
});
