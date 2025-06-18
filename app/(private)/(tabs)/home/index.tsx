import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../../../../components/Container";
import userIcon from '../../../../assets/user 1.png';
import logo from '../../../../assets/Logo.png';
import filterIcon from '../../../../assets/filter 1.png';
import Product from "../../../../components/Product";

import BottomSheetFilters from "../../../../components/Filters";
import { ReactNode, useEffect, useState } from "react";
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import { supabase } from "../../../../lib/supabase/supabase";
import If from "../../../../components/If";
import { IFilters } from "../../../../components/Filters/interfaces";
import getProductPhotoUrl from "../../../../utils/getProductPhotoUrl";

interface IProduct {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description?: string;
  price: number;
  photos: string[];
}

export default function HomeScreen() {
  const router = useRouter();

  const [bottomSheetShown, setBottomSheetShown] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async () => {
    const { data, error } = await supabase.rpc('get_all_products');

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    setProducts(data || []);
  }

  const handleRefreshPage = () => {
    setRefreshing(true);
    loadProducts().finally(() => {
      setRefreshing(false);
    });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const handleShowBottomSheet = () => setBottomSheetShown(true);

  const onBottomSheetClose = () => setBottomSheetShown(false);

  const handleProductPress = (productId: string) => {
    router.push(`/(private)/product-details/${productId}`);
  }

  const handlePushToSettingsScreen = () => {
    router.push(`/(private)/settings`);
  }

  const renderProducts = () => {
    const elements: ReactNode[] = [];
    const productsToRender = [...products];

    productsToRender.splice(0, 1);

    let productsCount = productsToRender.length;

    while (productsCount > 0) {
      const products = productsToRender.splice(0, 2);

      if (!products.length) continue;

      elements.push(
        <View key={products[0].id} style={styles.contentRow}>
          {products.map((product) => (
            <Product
              key={product.id}
              price={product.price}
              onPress={() => handleProductPress(product.id)}
              image={{ uri: getProductPhotoUrl(product.photos[0]) }}
            />
          ))}
        </View>
      );

      productsCount -= 2;
    }

    return elements
  }

  const handleApplyFilters = async (filters: IFilters) => {
    const params = {
      category_list: filters.categories.length ? filters.categories : null,
      min_price: filters.priceRange.min ? Number(filters.priceRange.min) : null,
      max_price: filters.priceRange.max ? Number(filters.priceRange.max) : null,
      sort_keyword: filters.searchFor || null,
      min_rating_list: filters.ratings.length ? filters.ratings : null,
    };

    const { data, error } = await supabase.rpc('filter_products', params);

    if (error) {
      console.error('Error applying filters:', error);
      return;
    }

    setProducts(data || []);
  }

  return (
    <Container style={{ paddingTop: 0 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshPage}
            colors={['#000']}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handlePushToSettingsScreen}>
            <Image source={userIcon} />
          </TouchableOpacity>

          <Image source={logo} />

          <TouchableOpacity style={styles.headerButton} disabled>
            {/* <Image source={robotsIcon} /> */}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleShowBottomSheet}
        >
          <Image source={filterIcon} />
        </TouchableOpacity>

        <View style={styles.content}>
          <If condition={!products.length}>
            <TouchableOpacity
              onPress={() => router.push(`/(private)/create-product`)}
              style={styles.emptyButton}
            >
              <Text style={styles.emptyButtonText}>Não há produtos no momento. Inicie a lista criando um!</Text>
            </TouchableOpacity>
          </If>

          <If condition={products.length > 0}>
            <Product
              price={products[0]?.price}
              onPress={() => handleProductPress(products[0]?.id)}
              image={{ uri: getProductPhotoUrl(products[0]?.photos[0]) }}
            />
          </If>

          {renderProducts()}
        </View>
      </ScrollView>

      <Text style={styles.instructions}>Puxe a lista para baixo para atualizar!</Text>

      <BottomSheetFilters
        shown={bottomSheetShown}
        onClose={onBottomSheetClose}
        onConfirm={handleApplyFilters}
        onReset={() => {
          loadProducts();
          setBottomSheetShown(false);
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerButton: {
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterButton: {
    borderRadius: 40,
    backgroundColor: '#CDCDCD',
    height: 38,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  content: {
    marginTop: 50,
    gap: 16,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 16,
  },
  emptyButton: {
    backgroundColor: '#CDCDCD',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  instructions: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.5,
  }
});
