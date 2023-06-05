import React from 'react';
import {StyleSheet, Image, Platform} from 'react-native';

//assests
import logo from '../../assests/images/logo.png';

const Logo = () => {
  return <Image source={logo} style={styles.logo} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: Platform.OS === 'ios' ? 300 : 150,
  },
});

export default Logo;
