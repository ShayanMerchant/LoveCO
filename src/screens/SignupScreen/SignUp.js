import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Alert,
  Pressable,
  Platform,
} from 'react-native';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

//backend
import http from '../../../api/http';

//components
import CustomTextInput from '../../components/TextInputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomTextButton from '../../components/Buttons/CustomTextButton';
import Logo from '../../components/Logo/Logo';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const inputs = [firstName, lastName, email, password, phoneNumber];

  const onRegisterPressed = async () => {
    function isEmailValid(value) {
      const regx = /^\S+@\S+$/;
      return regx.test(value);
    }
    if (inputs.includes('') || inputs.includes(undefined)) {
      Alert.alert('', 'All fields are required');
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert('', 'Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('', 'Password should be atleast 6 characters long');
      return;
    }
    if (phoneNumber.length !== 10) {
      Alert.alert('', 'Please enter a valid phone number');
      return;
    }
    try {
      const res = await http.post('/api/users/signUp', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      console.log(res.data);
      Alert.alert('', 'Successfully Registered');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      navigation.navigate('Login');
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        Alert.alert('', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Logo />
      <Text style={styles.welcome}>Register!</Text>
      <CustomTextInput
        placeholder="First Name"
        placeholderTextColor={'#1f394a'}
        value={firstName}
        setValue={setFirstName}
      />
      <CustomTextInput
        placeholder="Last Name"
        placeholderTextColor={'#1f394a'}
        value={lastName}
        setValue={setLastName}
      />
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
      <CustomTextInput
        placeholder="Phone Number"
        placeholderTextColor={'#1f394a'}
        autoCapitalize="none"
        keyboard="numeric"
        value={phoneNumber}
        setValue={setPhoneNumber}
      />
      <CustomButton title="Register" onPress={onRegisterPressed} />
      <Text style={styles.text}>Already have an account</Text>
      <CustomTextButton
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </KeyboardAvoidingView>
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
    right: Platform.OS === 'ios' ? 55 : 62,
    top: Platform.OS === 'ios' ? 480 : 415,
  },
});

export default SignUp;
