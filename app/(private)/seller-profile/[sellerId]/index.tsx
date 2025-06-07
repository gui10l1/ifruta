import { ActivityIndicator, Image, Linking, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../../../../components/Container";
import BackButton from "../../../../components/BackButton";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import If from "../../../../components/If";
import { Feather } from '@expo/vector-icons';
import Button from "../../../../components/Button";
import sellers, { ISeller } from "../../../../constants/sellers";
import RateBottomSheet from "../../../../components/RateBottomSheet";
import Constants from 'expo-constants';

export default function SellerProfileScreen() {
  const { sellerId } = useLocalSearchParams();

  const [seller, setSeller] = useState<ISeller | null>(null);
  const [showRatingBottomSheet, setShowRatingBottomSheet] = useState(false);

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);

  useEffect(() => {
    const seller = sellers.find(s => s.id === Number(sellerId));

    setSeller(seller || null);
  }, [sellerId]);

  const handleShowBottomSheet = () => {
    setShowRatingBottomSheet(true);
  }

  const openLink = async (link: string) => {
    await Linking.openURL(link);
  }

  const handleEmailPress = async () => {
    setLoadingEmail(true);

    await openLink(`mailto:${seller?.email}`)

    setLoadingEmail(false);
  }

  const handlePhonePress = async () => {
    setLoadingPhone(true);

    await openLink(`tel:${seller?.phone}`)

    setLoadingPhone(false);
  }

  return (
    <Container style={{ paddingTop: 0 }}>
      <View style={styles.container}>
        <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : 'dark-content'} />

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
            <TouchableOpacity
              onPress={handlePhonePress}
              style={styles.infoSection}
            >
              <If condition={!loadingPhone} otherwise={<ActivityIndicator size="small" color="#000" />}>
                <Feather name="phone" size={22} />
                <Text style={styles.info}>{seller?.phone}</Text>
              </If>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEmailPress}
              style={styles.infoSection}
            >
              <If condition={!loadingEmail} otherwise={<ActivityIndicator size="small" color="#000" />}>
                <Feather name="mail" size={22} />
                <Text style={styles.info}>{seller?.email}</Text>
              </If>
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>4.6</Text>
            <Text style={styles.reviewsText}>Reviews</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleShowBottomSheet}>
              Rate
            </Button>
          </View>
        </If>
      </View>

      <RateBottomSheet
        shown={showRatingBottomSheet}
        onClose={() => setShowRatingBottomSheet(false)}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight
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
