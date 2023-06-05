import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//backend
import http from '../../../api/http';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//components
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextButton from '../../components/Buttons/CustomTextButton';
import Logo from '../../components/Logo/Logo';

const LoginScreen = ({navigation}) => {
  StatusBar.setBarStyle('light-content', true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const inputs = [email, password];

  const onLoginPressed = async () => {
    if (inputs.includes('') || inputs.includes(undefined)) {
      Alert.alert('', 'Please Enter Correct Email and Password');
      return;
    }
    try {
      const res = await http.post('/api/users/signIn', {
        email,
        password,
      });
      console.log('Login' + JSON.stringify(res.data));
      AsyncStorage.setItem('token', res.data.token);
      AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      navigation.navigate('Tab');
      setEmail('');
      setPassword('');
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
      <Text style={styles.welcome}>Welcome!</Text>
      <CustomTextInput
        placeholder="Email"
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        value={email}
        setValue={setEmail}
      />
      <CustomTextInput
        placeholder="Password"
        secureTextEntry={passwordVisible}
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        value={password}
        setValue={setPassword}
      />
      <Pressable style={styles.eyeBtn}>
        <Icon
          name={passwordVisible ? 'eye-off' : 'eye'}
          size={22}
          color="#1f394a"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </Pressable>
      <CustomButton title="Login" onPress={onLoginPressed} />
      <CustomTextButton
        title="Forgot password?"
        onPress={() => {
          navigation.navigate('ForgetPassword');
        }}
      />
      <Text style={styles.text}>Don't have an account?</Text>
      <CustomTextButton
        title="Sign Up"
        onPress={() => {
          navigation.navigate('SignUp');
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
  welcome: {
    fontSize: 25,
    padding: 10,
    marginBottom: 10,
    color: '#d2a8cc',
    fontWeight: '500',
  },
  text: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 55 : 60,
    top: Platform.OS === 'ios' ? 376 : 315,
  },
});

export default LoginScreen;
