import { Tabs } from "expo-router";
import { Feather } from '@expo/vector-icons';
import { View } from "react-native";

interface ITabIcon {
  name: any;
  active: boolean;
}

function TabIcon({ name, active }: ITabIcon) {
  return (
    <Feather name={name} size={32} color={active ? '#fff' : '#000'} />
  )
}

const tabDefaultOptions: any = {
  tabBarLabelStyle: { display: 'none' },
  tabBarItemStyle: {
    // backgroundColor: '#D92525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIconStyle: {
    height: '100%'
  }
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: { backgroundColor: '#D92525', height: 100 },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="home" active={focused} />,
          ...tabDefaultOptions,
        }}
      />

      <Tabs.Screen
        name="favorites/index"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => <TabIcon name="heart" active={focused} />,
          ...tabDefaultOptions,
        }}
      />

      <Tabs.Screen
        name="create-product/index"
        options={{
          title: 'Create Product',
          tabBarIcon: ({ focused }) => <TabIcon name="plus-circle" active={focused} />,
          ...tabDefaultOptions,
        }}
      />

      <Tabs.Screen
        name="notifications/index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabIcon name="bell" active={focused} />,
          ...tabDefaultOptions,
        }}
      />

      <Tabs.Screen
        name="chat/index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabIcon name="message-square" active={focused} />,
          ...tabDefaultOptions,
        }}
      />
    </Tabs>
  );
}