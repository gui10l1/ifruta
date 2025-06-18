import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userIcon from '../../../../assets/user 1.png';
import robotsIcon from '../../../../assets/robotics 1.png';
import Container from "../../../../components/Container";
import { useRouter } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase/supabase";
import getUserPhotoUrl from "../../../../utils/getUserPhotoUrl";

interface IChat {
  full_name: string;
  last_message: string;
  last_message_at: string;
  profile_pic: string;
  user_id: string;
}

export default function ChatTab() {
  const router = useRouter();

  const [chats, setChats] = useState<IChat[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadChats = async () => {
    const { error, data } = await supabase.rpc(`list_user_conversations`);

    if (error) {
      console.error('Error fetching chats', error);
      return;
    }

    setChats(data);
  }

  useEffect(() => {
    loadChats();
  }, []);

  const renderChat = () => {
    return chats.map(
      chat => (
        <TouchableOpacity
          key={chat.user_id}
          style={styles.chat}
          onPress={() => router.push(`/(private)/chat/${chat.user_id}`)}
        >
          <Image style={styles.chatImage} source={{ uri: getUserPhotoUrl(chat.profile_pic) }} />

          <View>
            <Text style={styles.chatTitle}>{chat.full_name}</Text>
            <Text style={styles.chatLastMessage}>{chat.last_message}</Text>
          </View>
        </TouchableOpacity>
      )
    );
  }

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadChats();

    setRefreshing(false);
  }

  return (
    <Container>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
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
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatLastMessage: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'black'
  },
})
