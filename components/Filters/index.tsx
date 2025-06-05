import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { IBottomSheetFilters, IThumb, Rating } from './interfaces';
import { Feather } from '@expo/vector-icons';
import OutlineButton from '../OutlineButton';
import Button from '../Button';
import Slider from 'rn-range-slider';

const POINTS = [Dimensions.get('screen').height * .7];

export function Backdrop({ style }: { style: StyleProp<ViewStyle> }) {
  return <View style={[style, styles.backdrop]} />
}

const categories = [
  'Verduras',
  'Frutas',
  'Horti',
  'Legumes',
]

const searchFor = [
  'Popular',
  'Most Recent',
  'Rate High',
  'Price High',
]

const ratings: Rating[] = [
  0,
  5,
  4,
  3
]

const Rail = () => {
  return <View style={{ flex: 1, backgroundColor: '#A9A9A9', height: 2 }} />
}

const Thumb = ({ value }: IThumb) => {
  const numberFormat = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format;

  return (
    <View style={styles.thumbContainer}>
      <View style={styles.thumb} />
      <Text style={styles.thumbValue}>{numberFormat(value)}/kg</Text>
    </View>
  )
}

const RailSelected = () => {
  return <View style={{ flex: 1, backgroundColor: '#f00', height: 2 }} />
}

export default function BottomSheetFilters({ shown, onClose, onConfirm }: IBottomSheetFilters) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSearchFor, setSelectedSearchFor] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<Rating[]>([]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  useEffect(() => {
    if (shown) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [shown]);

  const handleCategoryToggle = (category: string) => {
    const shouldExclude = selectedCategories.some(c => category === c);

    if (shouldExclude) {
      setSelectedCategories(
        selectedCategories.filter(c => c !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const handleSearchForToggle = (searchFor: string) => {
    const shouldExclude = selectedSearchFor.some(s => searchFor === s);

    if (shouldExclude) {
      setSelectedSearchFor(
        selectedSearchFor.filter(s => s !== searchFor)
      );
    } else {
      setSelectedSearchFor([...selectedSearchFor, searchFor]);
    }
  }

  const handleRatingToggle = (rating: Rating) => {
    const shouldExclude = selectedRating.some(r => rating === r);

    if (shouldExclude) {
      setSelectedRating(
        selectedRating.filter(r => r !== rating)
      );
    } else {
      setSelectedRating([...selectedRating, rating]);
    }
  }

  const handleRangeValuesChange = (low: number, high: number) => {
    setHigh(high);
    setLow(low);
  }

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedRating([]);
    setSelectedSearchFor([]);
    setHigh(100);
    setLow(0);

    if (onConfirm) {
      onConfirm({
        categories: [],
        priceRange: { max: 100, min: 0 },
        ratings: [],
        searchFor: [],
      });
    }
  }

  const handleConfirmFilters = () => {
    if (onConfirm) {
      onConfirm({
        categories: selectedCategories,
        priceRange: { max: high, min: low },
        ratings: selectedRating,
        searchFor: selectedSearchFor,
      });
    }

    bottomSheetRef.current?.close();
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={POINTS}
      onClose={onClose}
      backdropComponent={({ style }) => shown ? <Backdrop style={style} /> : null}
      handleStyle={{ borderRadius: 100 }}
      style={{ borderRadius: 100 }}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Classificar & Filtrar</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>

          <ScrollView
            horizontal
            contentContainerStyle={styles.sectionList}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map(category => {
              const selected = selectedCategories.some(
                c => c === category,
              );

              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.categoryButton, selected ? { backgroundColor: 'red' } : {}]}
                  onPress={() => handleCategoryToggle(category)}
                >
                  <Text
                    style={[styles.categoryButtonText, selected ? { color: 'white' } : {}]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preço</Text>

          <View style={styles.sliderContainer}>
            <Slider
              min={0}
              max={100}
              step={0.5}
              high={high}
              low={low}
              renderRail={Rail}
              renderThumb={(name) => <Thumb value={name === 'low' ? low : high} />}
              renderRailSelected={RailSelected}
              onValueChanged={handleRangeValuesChange}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perquisar por</Text>

          <ScrollView
            horizontal
            contentContainerStyle={styles.sectionList}
            showsHorizontalScrollIndicator={false}
          >
            {searchFor.map(searchFor => {
              const selected = selectedSearchFor.some(
                s => s === searchFor,
              );

              return (
                <TouchableOpacity
                  key={searchFor}
                  style={[styles.categoryButton, selected ? { backgroundColor: 'red' } : {}]}
                  onPress={() => handleSearchForToggle(searchFor)}
                >
                  <Text
                    style={[styles.categoryButtonText, selected ? { color: 'white' } : {}]}
                  >
                    {searchFor}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rating</Text>

          <ScrollView
            horizontal
            contentContainerStyle={styles.sectionList}
            showsHorizontalScrollIndicator={false}
          >
            {ratings.map(rating => {
              const selected = selectedRating.some(
                r => r === rating,
              );

              return (
                <TouchableOpacity
                  key={rating}
                  style={[styles.starButton, selected ? { backgroundColor: 'red' } : {}]}
                  onPress={() => handleRatingToggle(rating)}
                >
                  <Feather name="star" color={selected ? '#fff' : "#f00"} />

                  <Text
                    style={[styles.starButtonText, selected ? { color: 'white' } : {}]}
                  >
                    {rating === Rating.ALL ? 'All' : rating}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.buttonsContainer}>
          <OutlineButton style={styles.button} onPress={handleResetFilters}>Resetar</OutlineButton>

          <Button style={styles.button} onPress={handleConfirmFilters}>Classificar por</Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginTop: 28,
    borderBottomColor: '#A9A9A9',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingBottom: 25,
  },
  section: {
    paddingTop: 19,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  sliderContainer: {
    paddingHorizontal: 20,
  },
  sectionList: {
    gap: 16,
  },
  categoryButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 40,
  },
  categoryButtonText: {
    color: 'red',
    fontSize: 16,
  },
  starButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  starButtonText: {
    color: 'red',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  button: {
    flex: 1,
  },
  thumbContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#f00',
    borderRadius: 10,
  },
  thumbValue: {
    position: 'absolute',
    top: 20 + 2,
    fontSize: 10,
    color: 'black',
    width: 70,
    textAlign: 'center',
    backgroundColor: 'white'
  },
});
