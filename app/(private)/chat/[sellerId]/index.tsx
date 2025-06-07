import { FlatList, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../../../../components/Container";
import BackButton from "../../../../components/BackButton";
import { useEffect, useState } from "react";
import sellers, { ISeller } from "../../../../constants/sellers";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../../../components/Button";
import list from '../../../../assets/list 1.png';

const FlatListHeader = () => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  }

  return (
    <View style={styles.chatHeader}>
      <Button style={styles.chatHeaderButton} onPress={handlePress}>
        <View style={styles.chatHeaderButtonTextWrapper}>
          <Image source={list} />

          <Text style={styles.chatHeaderButtonText}>Listing</Text>
        </View>
      </Button>
    </View>
  );
}

export default function ChatScreen() {
  const { sellerId } = useLocalSearchParams();

  const [seller, setSeller] = useState<ISeller | null>(null);

  useEffect(() => {
    const seller = sellers.find(s => s.id === Number(sellerId))

    setSeller(seller || null);
  }, [sellerId]);

  const renderMessages = () => null;

  return (
    <Container>
      <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : 'dark-content'} />

      <View style={styles.header}>
        <BackButton color="#000" />

        <Text style={styles.headerTitle}>{seller?.name}</Text>
      </View>

      <FlatList
        style={styles.chatContainer}
        ListHeaderComponent={<FlatListHeader />}
        renderItem={renderMessages}
        data={[]}
      />

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholderTextColor="#fff" placeholder="Type your message..." />
      </View>
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
    gap: 8,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    marginTop: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chatHeaderButton: {
    paddingHorizontal: 40,
  },
  chatHeaderButtonTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  chatHeaderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#CDCDCD',
    borderRadius: 40,
    height: 42,
    color: '#000',
    paddingHorizontal: 22,
  },
});
