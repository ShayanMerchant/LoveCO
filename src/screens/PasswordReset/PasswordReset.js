import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, Platform, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//components
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import Logo from '../../components/Logo/Logo';

//backend
import http from '../../../api/http';

const PasswordReset = ({navigation}) => {
  const route = useRoute();
  const {email} = route.params; // user email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const onPasswordReset = () => {
    if (password.length < 6 && confirmPassword.length < 6) {
      Alert.alert('', 'Password should be atleast 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('', 'Password does not match');
    }
    try {
      const res = http.post(`api/users/userPasswordReset/${email}`, {
        password,
      });
      console.log(email);
      if (res) {
        Alert.alert('', 'Password Changed Successfully');
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        Alert.alert('', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('re', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>Enter New Password</Text>
      <CustomTextInput
        placeholder="New Password"
        secureTextEntry={passwordVisible}
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        value={password}
        setValue={setPassword}
      />
      <Pressable style={styles.eyeBtn2}>
        <Icon
          name={passwordVisible ? 'eye-off' : 'eye'}
          size={22}
          color="#1f394a"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </Pressable>
      <CustomTextInput
        placeholder="Confirm Password"
        secureTextEntry={confirmPasswordVisible}
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <Pressable style={styles.eyeBtn}>
        <Icon
          name={confirmPasswordVisible ? 'eye-off' : 'eye'}
          size={22}
          color="#1f394a"
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        />
      </Pressable>
      <CustomButton title="Submit" onPress={onPasswordReset} />
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
  eyeBtn: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 55 : 60,
    top: Platform.OS === 'ios' ? 372 : 315,
  },
  eyeBtn2: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 55 : 60,
    top: Platform.OS === 'ios' ? 320 : 315,
  },
});

export default PasswordReset;
