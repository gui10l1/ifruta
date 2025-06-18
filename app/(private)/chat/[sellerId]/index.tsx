import { FlatList, Image, Platform, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../../../../components/Container";
import BackButton from "../../../../components/BackButton";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../../../components/Button";
import list from '../../../../assets/list 1.png';
import { supabase } from "../../../../lib/supabase/supabase";
import { User } from "@supabase/supabase-js";
interface ISeller {
  id: string;
  profile_pic: string;
  full_name: string;
  email: string;
  phone: string;
}

interface IMessage {
  id: string;
  created_at: string;
  content: string;
  from_user_id: string;
  to_user_id: string;
}

interface IRenderMessages {
  item: IMessage;
  index: number;
}

export default function ChatScreen() {
  const { sellerId } = useLocalSearchParams();

  const [seller, setSeller] = useState<ISeller | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const loadMessages = async () => {
    console.log('Retrieved messages', Date.now());

    const { data, error } = await supabase.rpc(`get_conversation_with_user`, {
      _other_user_id: sellerId,
    });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    setMessages(data);
  }

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [sellerId]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadMessages();
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

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

  const renderMessages = ({ index, item }: IRenderMessages) => {
    return (
      <View style={[item.from_user_id === seller?.id ? styles.outsideMessageContainer : styles.myMessageContainer, styles.messageContainer]}>
        <View style={[styles.message, item.from_user_id === seller?.id ? styles.outsideMessage : styles.myMessage]}>
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      </View>
    )
  }

  const handleSendMessage = async () => {
    await supabase.rpc(`send_message`, {
      _to_user_id: sellerId,
      _content: typedMessage,
    });

    await loadMessages();

    setTypedMessage('');
  }

  return (
    <Container>
      <StatusBar barStyle={Platform.OS === 'android' ? "light-content" : 'dark-content'} />

      <View style={styles.header}>
        <BackButton color="#000" />

        <Text style={styles.headerTitle}>{seller?.full_name}</Text>
      </View>

      <FlatList
        style={styles.chatContainer}
        renderItem={renderMessages}
        data={messages}
        contentContainerStyle={{ paddingTop: 20, gap: 8 }}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={sellerId === user?.id ? '#000' : "#fff"}
          placeholder={sellerId === user?.id ? 'Você não pode conversar com si mesmo!' : "Escreva sua mensagem..."}
          value={typedMessage}
          onChangeText={setTypedMessage}
          onSubmitEditing={handleSendMessage}
          readOnly={sellerId === user?.id}
        />
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
    paddingHorizontal: 16,
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
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  message: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    maxWidth: '90%',
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#fff'
  },
  outsideMessageContainer: {
    justifyContent: 'flex-start',
    borderRadius: 16,
  },
  outsideMessage: {
    backgroundColor: 'rgba(0, 0, 0, .9)'
  },
  myMessageContainer: {
    borderRadius: 16,
    justifyContent: 'flex-end',
  },
  myMessage: {
    backgroundColor: 'rgba(217, 37, 37, .9)',
    borderRadius: 16,
  },
});
