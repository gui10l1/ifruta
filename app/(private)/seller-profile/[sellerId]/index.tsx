import { ActivityIndicator, Image, Linking, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../../../../components/Container";
import BackButton from "../../../../components/BackButton";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import If from "../../../../components/If";
import { Feather } from '@expo/vector-icons';
import Button from "../../../../components/Button";
import sellers from "../../../../constants/sellers";
import RateBottomSheet from "../../../../components/RateBottomSheet";
import Constants from 'expo-constants';
import { supabase } from "../../../../lib/supabase/supabase";
import getProductPhotoUrl from "../../../../utils/getProductPhotoUrl";
import getUserPhotoUrl from "../../../../utils/getUserPhotoUrl";

interface ISeller {
  id: number;
  profile_pic: string;
  full_name: string;
  email: string;
  phone: string;
}

interface IReview {
  average_rating: number;
  total_reviews: number;
}

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

export default function SellerProfileScreen() {
  const { sellerId, productId } = useLocalSearchParams();

  const [seller, setSeller] = useState<ISeller | null>(null);
  const [showRatingBottomSheet, setShowRatingBottomSheet] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState<IReview | null>(null);

  const getReviewsInfo = async () => {
    const { error, data } = await supabase.rpc(`get_seller_rating_stats`, {
      _seller_id: sellerId
    });

    if (error) {
      console.error('Error fetching seller reviews', error);
      return;
    }

    setReview(data[0] || null);
  }

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.rpc(`get_user_by_id`, {
        _user_id: sellerId,
      });

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      setSeller(data[0]);
    }

    loadUser();
  }, [sellerId]);

  useEffect(() => {
    getReviewsInfo();
  }, [sellerId]);

  useEffect(() => {
    async function loadReview() {
      const { error, data } = await supabase.rpc(`get_user_product_review`, {
        _product_id: productId,
      });

      if (error) {
        console.error('Failed fetching review', error);
        return;
      }

      const [review] = data;

      setRating(review?.rating || 0);
    }

    loadReview();
  }, [productId]);

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

  const handleReview = async (ratingProp: number) => {
    const value = rating === ratingProp ? 0 : ratingProp;

    const { error } = await supabase.rpc(`toggle_product_review`, {
      _product_id: productId,
      _rating: value,
    });

    if (error) {
      console.error('Error trying to review product', error);
    }

    await getReviewsInfo();

    setRating(value);
  }

  return (
    <Container style={{ paddingTop: 0 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : 'dark-content'} />

        <View style={styles.header}>
          <BackButton color="#000" />

          <Text style={styles.headerTitle}>{product?.title}</Text>
        </View>

        <If
          condition={Boolean(seller)}
          otherwise={<Text>Não foi possível encontrar este vendedor!</Text>}
        >
          <View style={styles.profilePicWrapper}>
            <Image
              source={{ uri: getUserPhotoUrl(seller?.profile_pic) }}
              style={styles.sellerImage}
            />

            <Text style={styles.sellerName}>{seller?.full_name}</Text>
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
            <Text style={styles.rating}>{Math.round(review?.average_rating || 0).toFixed(1)}</Text>
            <Text style={styles.reviewsText}>{review?.total_reviews || 0} {review?.total_reviews === 1 ? 'avaliação' : 'avaliações'}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleShowBottomSheet}>
              Avaliar {product?.title}
            </Button>
          </View>
        </If>
      </ScrollView>

      <RateBottomSheet
        shown={showRatingBottomSheet}
        onClose={() => setShowRatingBottomSheet(false)}
        onRate={handleReview}
        rating={rating}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  profilePicWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 22,
    paddingTop: Constants.statusBarHeight
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
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
    marginBottom: 50,
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 63,
  }
});
