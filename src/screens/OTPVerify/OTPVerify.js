import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

// Backend
import http from '../../../api/http';

//components
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextButton from '../../components/Buttons/CustomTextButton';
import Logo from '../../components/Logo/Logo';

const OTPVerify = ({navigation}) => {
  const route = useRoute();
  const {email} = route.params; // user email
  const [OTP, setOTP] = useState();

  const verifyOTP = () => {
    const res = http.post(`/api/users/verifyOTP/${email}`, {
      OTP,
    });
    if (res) {
      navigation.navigate('PasswordReset', {email: email});
    }
  };
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>Enter Verification Code (OTP)</Text>
      <CustomTextInput
        placeholder="Verify OTP"
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        keyboard={'number-pad'}
        value={OTP}
        setValue={setOTP}
      />
      <CustomButton title="Continue" onPress={verifyOTP} />
      <CustomTextButton
        title="Resend OTP"
        onPress={() => {
          navigation.navigate('ForgetPassword');
        }}
      />
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

export default OTPVerify;
