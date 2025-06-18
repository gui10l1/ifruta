import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IRateBottomSheet } from "./interfaces";
import { Backdrop } from "../Filters";
import { MaterialIcons } from '@expo/vector-icons';

const POINTS = [Dimensions.get('screen').height * .45];

export default function RateBottomSheet({ shown, onClose, onRate, rating }: IRateBottomSheet) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (shown) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [shown]);

  const handleRate = (count: number) => {
    if (onRate) onRate(count);
  }

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={POINTS}
      onClose={onClose}
      enablePanDownToClose
      backdropComponent={({ style }) => shown ? <Backdrop style={style} /> : null}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Avalie</Text>

        <View style={styles.starsContainer}>
          {Array.from(Array(5).keys()).map(item => {
            const rate = item + 1;
            const selected = rating >= rate;

            return (
              <TouchableOpacity
                onPress={() => handleRate(rate)}
                key={item}
              >
                <MaterialIcons key={item} name="star" color={selected ? '#D92525' : '#D9D9D9'} size={46} />
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -40,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  }
});
