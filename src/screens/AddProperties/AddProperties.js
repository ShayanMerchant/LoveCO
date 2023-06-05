/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Platform,
  Pressable,
  Alert,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

// Backend
import http, {baseURL} from '../../../api/http';

// Icon
import {Icon} from 'react-native-elements';

const AddProperties = ({navigation}) => {
  const isFocused = useIsFocused();
  const [title, setTitle] = useState();
  const [beds, setBeds] = useState();
  const [bathroom, setBathroom] = useState();
  const [parking, setParking] = useState();
  const [details, setDetails] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const [agentName, setAgentName] = useState();
  const [agentPhoneNumber, setAgentPhoneNumber] = useState();
  const [agentEmailAddress, setAgentEmailAddress] = useState();
  const [property, setProperty] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputs = [
    title,
    beds,
    bathroom,
    parking,
    details,
    price,
    type,
    agentName,
    agentPhoneNumber,
    agentEmailAddress,
  ];

  useEffect(() => {
    if (isFocused) {
      try {
        http
          .get('api/properties/getProperties')
          .then(response => {
            JSON.stringify(response.data);
            setProperty(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          Alert.alert('', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request Error' + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error Message', error.message);
        }
      }
    }
  });

  const pickMultipleImages = async () => {
    await ImagePicker.openPicker({
      multiple: true,
      writeTempFile: true,
      maxFiles: 20,
    }).then(selectedImages => {
      setImages([...selectedImages.map(i => i.path)]);
      console.log('Selected', images);
    });
  };
  const addProperty = async () => {
    setLoading(true);
    function isEmailValid(value) {
      const regx = /^[\w.=-]+@[\w.-]+\.[\w]{2,3}$/;
      return regx.test(value);
    }
    if (inputs.includes('') || inputs.includes(undefined)) {
      Alert.alert('', 'All fields are required');
      return;
    }
    if (!isEmailValid(agentEmailAddress)) {
      Alert.alert('', 'Please enter a valid email');
      return;
    }
    if (agentPhoneNumber.length !== 10) {
      Alert.alert('', 'Please enter a valid phone number');
      return;
    }
    try {
      let imageArray = [];
      let imageResponse = await images.map((item, index) => {
        let fd = new FormData();
        fd.append('image', {
          uri: item,
          type: 'image/jpeg',
          name: `property-${title}-${index + 1}.jpg`,
        });
        return fetch(`${baseURL}/api/properties/propertyImages/`, {
          method: 'POST',
          body: fd,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => response.json());
      });
      await Promise.all(imageResponse).then(i =>
        i.map(item => imageArray.push(item.path)),
      );
      const res = await http.post('/api/properties/addProperty/', {
        title,
        beds,
        bathroom,
        parking,
        price,
        type,
        details,
        agentName,
        agentPhoneNumber,
        agentEmailAddress,
        images: imageArray,
      });
      if (res.status === 200) {
        console.log('Added' + JSON.stringify(res.data));
        Alert.alert('', 'Added Successfully');
        setLoading(false);
        navigation.navigate('Home');
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
    <ScrollView style={styles.container}>
      <View style={styles.selectImages}>
        <Icon name="add-circle-outline" size={25} color={'#d2a8cc'} />
        <Button
          title="Select Images"
          onPress={pickMultipleImages}
          color={'#d2a9cc'}
        />
      </View>
      <View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          placeholderTextColor={'grey'}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.label}>Beds:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Beds"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={beds}
          onChangeText={setBeds}
        />
        <Text style={styles.label}>Bathrooms:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Bathrooms"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={bathroom}
          onChangeText={setBathroom}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.label}>Parkings:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Parkings"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={parking}
          onChangeText={setParking}
        />
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={[styles.textInput, {width: '25%'}]}
          placeholder="Price"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={[styles.textInput, {width: '40%'}]}
          placeholder="Type"
          placeholderTextColor={'grey'}
          keyboardType={'number-pad'}
          value={type}
          onChangeText={setType}
        />
      </View>
      <View>
        <Text style={styles.label}>Details:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Details"
          placeholderTextColor={'grey'}
          multiline={true}
          value={details}
          onChangeText={setDetails}
        />
        <Text style={styles.label}>Agent Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Agent Name"
          placeholderTextColor={'grey'}
          value={agentName}
          onChangeText={setAgentName}
        />
        <Text style={styles.label}>Agent Contact No:</Text>
        <TextInput
          placeholder="Agent Contact No"
          placeholderTextColor={'grey'}
          style={styles.textInput}
          keyboardType={'number-pad'}
          value={agentPhoneNumber}
          onChangeText={setAgentPhoneNumber}
        />
        <Text style={styles.label}>Agent Email Address:</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Agent Email Address"
          placeholderTextColor={'grey'}
          style={styles.textInput}
          value={agentEmailAddress}
          onChangeText={setAgentEmailAddress}
        />
      </View>
      <View style={styles.imageStatusContainer}>
        <Icon
          name={images.length > 0 ? 'cloud-done' : 'close'}
          color={images.length > 0 ? 'green' : 'red'}
          size={25}
        />
        <Text style={styles.imageStatus}>
          {images.length > 0 ? 'Uploaded Successfully' : 'No Images Selected'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={addProperty}>
          <Text style={styles.button}>Add</Text>
        </Pressable>
        {loading ? <ActivityIndicator size={'small'} color={'#d2a8cc'} /> : ''}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1f394a',
  },
  imageStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  selectImages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStatus: {
    fontSize: 18,
    margin: 5,
    color: '#d2a8cc',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  label: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 5,
    fontSize: 18,
    fontWeight: '400',
    color: '#d2a8cc',
  },
  textInput: {
    width: '100%',
    maxWidth: 350,
    maxHeight: Platform.OS === 'android' ? 40 : 42,
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: '#d2a8cc',
    borderRadius: 10,
    fontSize: 17,
    color: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 15,
    margin: 15,
  },
  button: {
    fontSize: 20,
    color: '#d2a8cc',
    fontWeight: '500',
  },
  imageButton: {
    fontSize: 20,
    color: '#1f394a',
    fontWeight: '500',
  },
});

export default AddProperties;
