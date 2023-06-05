import React from 'react';
import {View, StyleSheet} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomePage from '../screens/HomeScreen/HomePage';
import Search from '../screens/Search/Search';
import Profile from '../screens/Profile/Profile';
import Menu from '../screens/Menu/Menu';

// Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'white'},
        tabBarLabelStyle: {fontSize: 12},
        headerTintColor: '#1f394a',
        tabBarActiveTintColor: '#d2a8cc',
        tabBarStyle: {
          elevation: 0,
          paddingBottom: 20,
          height: 80,
          borderRadius: 20,
          backgroundColor: '#1f394a',
          position: 'absolute',
          bottom: 25,
          right: 20,
          left: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={styles.icon}>
              <Icon name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={styles.icon}>
              <Icon name="search" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={styles.icon}>
              <Icon name="person" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={styles.icon}>
              <Icon name="menu" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
});

export default TabNavigation;
