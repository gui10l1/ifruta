import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/Container";
import userOutline from '../../../assets/user (1) 2.png';
import userPic from '../../../assets/user 1.png';
import off from '../../../assets/log-out 1.png';
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase/supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import getUserPhotoUrl from "../../../utils/getUserPhotoUrl";

export default function SettingsScreen() {
  const { push } = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();

    push(`/(public)/login`);
  }

  const handlePushToEditProfile = () => {
    push(`/(private)/profile`);
  }

  const handleRefresh = async () => {
    setRefreshing(true);

    await getUser();

    setRefreshing(false);
  }

  return (
    <Container>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.header}>
          <BackButton color="#000" />

          <Text style={styles.headerTitle}>Configurações</Text>
        </View>

        <View style={styles.profilePicContainer}>
          <View style={styles.profilePic}>
            <Image  
              defaultSource={userPic}
              source={{ uri: getUserPhotoUrl(user?.user_metadata.profile_pic) }}
              borderRadius={styles.profilePic.borderRadius}
              width={styles.profilePic.width}
              height={styles.profilePic.height}
            />
          </View>
        </View>

        <View style={styles.menuGroup}>
          <TouchableOpacity style={styles.menuButton} onPress={handlePushToEditProfile}>
            <View style={styles.menuButtonContent}>
              <Image source={userOutline} />

              <Text style={styles.menuButtonText}>Editar perfil</Text>
            </View>

            <Feather name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuGroup}>
          <TouchableOpacity style={[styles.menuButton, styles.logoutButton]} onPress={logout}>
            <View style={styles.menuButtonContent}>
              <Image source={off} />

              <Text style={[styles.menuButtonText, styles.logoutButtonText]}>Sair</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 22,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  menuButton: {
    backgroundColor: '#CDCDCD',
    borderRadius: 40,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  menuGroup: {
    marginTop: 50,
  },
  menuButtonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  menuButtonText: {
    fontSize: 18,
    color: '#000'
  },
  logoutButton: {
    backgroundColor: '#D92525',
  },
  logoutButtonText: {
    color: '#fff',
  },
  menus: {
    flex: 1,
    marginBottom: 56,
    marginTop: 50,
  },
  profilePicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
  },
  profilePic: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CDCDCD',
  }
});
