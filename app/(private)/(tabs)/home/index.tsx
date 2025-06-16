import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Container from "../../../../components/Container";
import userIcon from '../../../../assets/user 1.png';
import robotsIcon from '../../../../assets/robotics 1.png';
import logo from '../../../../assets/Logo.png';
import filterIcon from '../../../../assets/filter 1.png';
import Product from "../../../../components/Product";

import oranges from '../../../../assets/pCjw_ygKCv0.png';
import tomatoes from '../../../../assets/idealbookshelfcp524-wgbhamericanexperience-bannedbooks-2000web 1.png';
import leafs from '../../../../assets/vegetable-salad-spinach-leaf-hd-png-11653148602v7y8oymh2y 3.png';
import cuke from '../../../../assets/Za9HGBK5ALA.png';
import carrot from '../../../../assets/ZgDHMMd72I8.png';
import BottomSheetFilters from "../../../../components/Filters";
import { useState } from "react";
import Constants from 'expo-constants';
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [bottomSheetShown, setBottomSheetShown] = useState(false);

  const handleShowBottomSheet = () => setBottomSheetShown(true);

  const onBottomSheetClose = () => setBottomSheetShown(false);

  const handleProductPress = (productId: number) => {
    router.push(`/(private)/product-details/${productId}`);
  }

  return (
    <Container style={{ paddingTop: 0 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
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
          <Product
            price={10}
            onPress={() => handleProductPress(1)}
            image={oranges}
          />

          <View style={styles.contentRow}>
            <Product
              price={6}
              onPress={() => handleProductPress(2)}
              image={carrot}
            />

            <Product
              price={5}
              onPress={() => handleProductPress(3)}
              image={cuke}
            />
          </View>

          <View style={styles.contentRow}>
            <Product
              price={7}
              onPress={() => handleProductPress(4)}
              image={tomatoes}
            />

            <Product
              price={3.5}
              onPress={() => handleProductPress(5)}
              image={leafs}
            />
          </View>
        </View>
      </ScrollView>

      <BottomSheetFilters
        shown={bottomSheetShown}
        onClose={onBottomSheetClose}
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
  }
});
