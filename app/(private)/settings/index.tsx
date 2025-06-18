import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../../components/BackButton";
import Container from "../../../components/Container";
import userOutline from '../../../assets/user (1) 2.png';
import user from '../../../assets/user 1.png';
import off from '../../../assets/log-out 1.png';
import { Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const { push } = useRouter();

  const logout = () => {
    push(`/(public)/login`);
  }

  const handlePushToEditProfile = () => {
    push(`/(private)/profile`);
  }

  return (
    <Container>
      <ScrollView style={styles.content} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BackButton color="#000" />

          <Text style={styles.headerTitle}>Configurações</Text>
        </View>

        <View style={styles.profilePicContainer}>
          <View style={styles.profilePic}>
            <Image source={user} />
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
