import { Tabs } from 'expo-router';
import { TabBar } from '@/components';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="invite" options={{ title: 'Invite' }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}
