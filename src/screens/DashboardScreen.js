import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './DashboardTabs/HomeTab';
import ProfileTab from './DashboardTabs/ProfileTab';
import SettingsTab from './DashboardTabs/SettingsTab';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
  return (
<>
<View></View>

    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6200EE' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#888',
        
      }}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator>
</>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
