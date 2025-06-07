import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from "react-native";
import Container from "../../../../components/Container";
import BackButton from "../../../../components/BackButton";
import userIcon from '../../../../assets/user 1.png';

interface INotification {
  id: number;
  title: string;
  description: string;
  icon: ImageSourcePropType;
}

const notifications: INotification[] = [
  {
    id: 1,
    description: 'Your account has been created',
    icon: userIcon,
    title: 'Account Setup Successful '
  }
]

export default function NotificationsTab() {
  const renderNotifications = () => {
    return notifications.map(notification => (
      <View style={styles.notification} key={notification.id}>
        <Image source={notification.icon} />

        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>{notification.description}</Text>
        </View>
      </View>
    ))
  }

  return (
    <Container>
      <View style={styles.header}>
        {/* <BackButton color="#000" /> */}

        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.period}>Today</Text>
        
        {renderNotifications()}
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
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderStyle: 'solid',
    borderColor: '#D92525',
    borderWidth: 1,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  notificationDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B7A7A'
  },
});
