import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';

// Backend
import http from '../../../api/http';

//components
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import Logo from '../../components/Logo/Logo';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState();

  const onForgetPasswordPressed = () => {
    if (!email.trim()) {
      Alert.alert('', 'Please Enter Email');
      return;
    }
    console.log('email', email);
    try {
      const res = http.post('/api/users/userPasswordResetLink', {
        email: email.trim(),
      });
      if (res) {
        navigation.navigate('OTPVerify', {email: email.trim()});
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        Alert.alert('', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error' + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>
        Enter your Email Address and we will send you a code
      </Text>
      <CustomTextInput
        placeholder="Email"
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        value={email}
        setValue={setEmail}
      />
      <CustomButton title="Send Reset Code" onPress={onForgetPasswordPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#1f394a',
    height: '100%',
  },
  text: {
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
    color: '#d2a8cc',
  },
});

export default ForgetPassword;
