import React from 'react';
import {ScrollView, Linking, StatusBar} from 'react-native';

// Components
import CustomBoxButton from '../../components/Buttons/CustomBoxButton';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({navigation}) => {
  StatusBar.setBarStyle('dark-content', false);
  return (
    <ScrollView>
      <CustomBoxButton
        title={'Facebook'}
        iconName={'logo-facebook'}
        iconColor={'#4267B2'}
        size={28}
        onPress={() => {
          Linking.openURL('https://www.facebook.com/loveandcorealestate/');
        }}
      />
      <CustomBoxButton
        title={'Twitter'}
        iconName={'logo-twitter'}
        iconColor={'#00acee'}
        size={28}
        onPress={() => {
          Linking.openURL('https://twitter.com/loveandco_re');
        }}
      />
      <CustomBoxButton
        title={'Youtube'}
        iconName={'logo-youtube'}
        iconColor={'#FF0000'}
        size={28}
        onPress={() => {
          Linking.openURL(
            'https://www.youtube.com/channel/UC-WcVFWgAFKnR00B2-VhvrQ',
          );
        }}
      />
      <CustomBoxButton
        title={'Instagram'}
        iconName={'logo-instagram'}
        iconColor={'#8a3ab9'}
        size={28}
        onPress={() => {
          Linking.openURL('https://www.instagram.com/loveandco_re/');
        }}
      />
      <CustomBoxButton
        title={'Linkedin'}
        iconName={'logo-linkedin'}
        iconColor={'#0072b1'}
        size={28}
        onPress={() => {
          Linking.openURL('https://www.linkedin.com/company/love-real-estate/');
        }}
      />
      <CustomBoxButton
        title={'Pinterest'}
        iconName={'logo-pinterest'}
        iconColor={'#E60023'}
        size={28}
        onPress={() => {
          Linking.openURL('https://www.pinterest.com.au/loverevic/');
        }}
      />
      <CustomBoxButton
        title={'About Us'}
        iconName={'information-circle'}
        iconColor={'#2da2e1'}
        size={28}
        onPress={() => {
          navigation.navigate('About');
        }}
      />
      <CustomBoxButton
        title={'Contact Us'}
        iconName={'mail'}
        iconColor={'#fccc63'}
        size={28}
        onPress={() => {
          navigation.navigate('Contact');
        }}
      />
      <CustomBoxButton
        title={'Setting'}
        iconName={'settings'}
        iconColor={'grey'}
        size={28}
        onPress={() => {
          Linking.openSettings();
        }}
      />
      <CustomBoxButton
        title={'Logout'}
        iconName={'log-out'}
        iconColor={'grey'}
        size={28}
        onPress={() => {
          AsyncStorage.removeItem('token');
          navigation.replace('Login');
        }}
      />
    </ScrollView>
  );
};

export default Menu;
