import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';

// Components
import UploadImage from '../../components/Image/UploadImage';

// Backend
import http, {baseURL} from '../../../api/http';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateInfo = () => {
  StatusBar.setBarStyle('light-content', true);
  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [image, setImage] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('user')
        .then(value => {
          let data = JSON.parse(value);
          setUser(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
          console.log(JSON.parse(value));
        })
        .catch(err => console.log('Error Message' + err));
    }
  }, [isFocused]);

  const addImage = async () => {
    let _image = await launchImageLibrary({
      mediaTypes: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      quality: 1,
    });
    if (_image) {
      setImage(_image.assets[0].uri);
    }
    console.log(_image);
    if (_image.didCancel) {
      console.log('User cancelled image picker');
    } else if (_image.error) {
      console.log('ImagePicker Error: ', _image.error);
    } else if (!_image.assets) {
      console.log('Selected image is empty');
    } else {
      console.log('Image URI: ', _image.assets[0].uri);
    }
  };

  const updatingUser = async () => {
    try {
      let fd = new FormData();
      fd.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: `profilePicture${user.firstName}${Date.now()}.jpg`,
      });
      fetch(`${baseURL}/api/users/userImage/`, {
        method: 'POST',
        body: fd,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => res.json())
        .then(async resp => {
          const res = await http.put(`/api/users/updateUser/${user._id}`, {
            firstName,
            lastName,
            email,
            phoneNumber,
            image: resp.path,
          });
          if (res.status === 200) {
            console.log('Update' + JSON.stringify(res.data));
            AsyncStorage.setItem('user', JSON.stringify(res.data));
            Alert.alert('', 'Updated Successfully');
          }
        })
        .catch(err => console.log('e', err));
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
      <View style={styles.imageContainer}>
        <UploadImage
          image={image ? {uri: image} : {uri: `${baseURL}/${user.image}`}}
          addImage={addImage}
        />
      </View>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="First Name"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Last Name"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Phone Number"
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={updatingUser}>
          <Text style={styles.button}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f394a',
  },
  textInput: {
    width: '100%',
    maxWidth: 300,
    maxHeight: Platform.OS === 'android' ? 40 : 42,
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: '#d2a8cc',
    borderRadius: 10,
    fontSize: 16,
    color: 'white',
  },
  imageContainer: {
    alignItems: 'center',
  },
  label: {
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: '400',
    color: '#d2a8cc',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 20,
    margin: 20,
  },
  button: {
    fontSize: 20,
    color: '#d2a8cc',
    fontWeight: '500',
  },
});
