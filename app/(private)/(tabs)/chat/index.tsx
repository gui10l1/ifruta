import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userIcon from '../../../../assets/user 1.png';
import robotsIcon from '../../../../assets/robotics 1.png';
import Container from "../../../../components/Container";
import sellers from "../../../../constants/sellers";
import { useRouter } from "expo-router/build/hooks";

export default function ChatTab() {
  const router = useRouter();

  const renderChat = () => {
    return sellers.map(
      seller => (
        <TouchableOpacity
          key={seller.id}
          style={styles.chat}
          onPress={() => router.push(`/(private)/chat/${seller.id}`)}
        >
          <Image style={styles.chatImage} source={seller.image} />

          <Text style={styles.chatTitle}>{seller.name}</Text>
        </TouchableOpacity>
      )
    );
  }

  return (
    <Container>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push(`/(private)/settings`)}>
            <Image source={userIcon} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Chats</Text>

          <TouchableOpacity style={styles.headerButton} disabled>
            {/* <Image source={robotsIcon} /> */}
          </TouchableOpacity>
        </View>
        
        {renderChat()}
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#A9A9A9',
    marginTop: 14,
  },
  chatImage: {

  },
  chatTitle: {

  },
})
