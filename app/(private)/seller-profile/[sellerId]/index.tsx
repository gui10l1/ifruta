import { Image, ImageSourcePropType, StatusBar, StyleSheet, Text, View } from "react-native";
import Container from "../../../../components/Container";
import BackButton from "../../../../components/BackButton";

import sellerOne from '../../../../assets/diadia.png';
import sellerTwo from '../../../../assets/assai.png';
import sellerThree from '../../../../assets/super-adega.png';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import If from "../../../../components/If";
import { Feather } from '@expo/vector-icons';
import Button from "../../../../components/Button";

interface ISeller {
  id: number;
  image: ImageSourcePropType;
  name: string;
  email: string;
  phone: string;
}

const sellers: ISeller[] = [
  {
    id: 1,
    name: 'Atacadão Dia a Dia',
    image: sellerOne,
    email: 'contato@diaadia.com.br',
    phone: '(61) 98888-4444',
  },
  {
    id: 2,
    name: 'Assaí Atacadista',
    image: sellerTwo,
    email: 'contato@assai.com.br',
    phone: '(61) 98888-3333',
  },
  {
    id: 3,
    name: 'Atacadista Super Adega',
    image: sellerThree,
    email: 'contato@superadega.com.br',
    phone: '(61) 98888-1111',
  },
]

export default function SellerProfileScreen() {
  const { sellerId } = useLocalSearchParams();

  const [seller, setSeller] = useState<ISeller | null>(null);

  useEffect(() => {
    const seller = sellers.find(s => s.id === Number(sellerId));

    setSeller(seller || null);
  }, [sellerId]);

  return (
    <Container style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <BackButton color="#000" />

      <If
        condition={Boolean(seller)}
        otherwise={<Text>Não foi possível encontrar este vendedor!</Text>}
      >
        <View style={styles.header}>
          <Image
            source={seller?.image}
            style={styles.sellerImage}
          />

          <Text style={styles.sellerName}>{seller?.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
            <Feather name="phone" size={22} />
            <Text style={styles.info}>{seller?.phone}</Text>
          </View>

          <View style={styles.infoSection}>
            <Feather name="mail" size={22} />
            <Text style={styles.info}>{seller?.email}</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.6</Text>
          <Text style={styles.reviewsText}>Reviews</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.button}>
            Rate
          </Button>
        </View>
      </If>
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
    gap: 21,
    marginTop: 22,
  },
  sellerName: {
    fontSize: 32,
    fontWeight: 'bold',
    maxWidth: 158,
    textAlign: 'left',
  },
  sellerImage: {
    width: 158,
    height: 158,
    borderRadius: 79,
  },
  infoContainer: {
    gap: 16,
    marginTop: 22,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
  },
  info: {
    fontSize: 20,
  },
  ratingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    marginTop: 32,
  },
  rating: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  reviewsText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 63,
  }
});
