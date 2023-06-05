import React from 'react';

//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUp from '../screens/SignupScreen/SignUp';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import TabNavigation from './TabNavigation';
import Contact from '../screens/Contact/Contact';
import About from '../screens/About/About';
import Favorites from '../screens/Favorites/Favorites';
import UpdateInfo from '../screens/UpdateInfo/UpdateInfo';
import AddProperties from '../screens/AddProperties/AddProperties';
import PropertiesDetail from '../screens/PropertiesDetails/PropertiesDetail';
import Apartments from '../screens/Types/Apartments';
import Houses from '../screens/Types/Houses';
import Townhouses from '../screens/Types/Townhouses';
import Units from '../screens/Types/Units';
import OTPVerify from '../screens/OTPVerify/OTPVerify';
import PasswordReset from '../screens/PasswordReset/PasswordReset';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitle: '',
            headerTintColor: '#d2a8cc',
          }}
        />
        <Stack.Screen
          name="OTPVerify"
          component={OTPVerify}
          options={{
            headerTransparent: true,
            headerBackTitle: '',
            headerTintColor: '#1f394a',
          }}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{
            headerTransparent: true,
            headerBackTitle: '',
            headerTintColor: '#1f394a',
          }}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigation}
          options={{
            headerShown: false,
            headerTitle: '',
            headerBackTitle: '',
            headerTintColor: '#d2a8cc',
          }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitle: '',
            headerTintColor: '#1f394a',
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerBackTitle: '',
            headerTintColor: '#d2a8cc',
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{
            headerTintColor: '#1f394a',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="AddProperties"
          component={AddProperties}
          options={{
            headerStyle: {backgroundColor: '#1f394a'},
            headerTitle: 'Add Property',
            headerBackTitle: '',
            headerTintColor: '#d2a8cc',
          }}
        />
        <Stack.Screen
          name="UpdateInfo"
          component={UpdateInfo}
          options={{
            headerStyle: {backgroundColor: '#1f394a'},
            headerTitle: 'Edit',
            headerBackTitle: '',
            headerTintColor: '#d2a8cc',
          }}
        />
        <Stack.Screen
          name="PropertiesDetail"
          component={PropertiesDetail}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: '#1f394a',
            headerBlurEffect: 'systemMaterialLight',
          }}
        />
        <Stack.Screen
          name="Apartments"
          component={Apartments}
          options={{
            headerTransparent: true,
            headerBackTitle: '',
            headerTintColor: '#1f394a',
          }}
        />
        <Stack.Screen
          name="Houses"
          component={Houses}
          options={{
            headerTransparent: true,
            headerBackTitle: '',
            headerTintColor: '#1f394a',
          }}
        />
        <Stack.Screen
          name="Townhouses"
          component={Townhouses}
          options={{
            headerTransparent: true,
            headerBackTitle: '',
            headerBackTitleVisible: false,
            headerTintColor: '#1f394a',
          }}
        />
        <Stack.Screen
          name="Units"
          component={Units}
          options={{
            headerTransparent: true,
            headerBackTitle: '',
            headerTintColor: '#1f394a',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
