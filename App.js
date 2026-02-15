import React from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BettingProvider } from './src/context/BettingContext';
import { COLORS } from './src/utils/theme';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import StandingsScreen from './src/screens/StandingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Accueil: '🏠',
  Matchs: '⚽',
  Classement: '🏆',
  Profil: '👤',
};

function TabBarIcon({ routeName }) {
  return <Text style={{ fontSize: 22 }}>{TAB_ICONS[routeName]}</Text>;
}

export default function App() {
  return (
    <BettingProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: COLORS.card,
              borderTopColor: COLORS.border,
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
            },
            tabBarIcon: () => <TabBarIcon routeName={route.name} />,
          })}
        >
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Matchs" component={MatchesScreen} />
          <Tab.Screen name="Classement" component={StandingsScreen} />
          <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BettingProvider>
  );
}
