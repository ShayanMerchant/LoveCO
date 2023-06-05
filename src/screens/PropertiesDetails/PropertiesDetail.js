import {
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {Linking} from 'react-native';
import Carousel from 'react-native-snap-carousel';

//components
import IconButton from '../../components/Buttons/IconButton';

// backend
import http, {baseURL} from '../../../api/http';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const PropertiesDetail = ({navigation}) => {
  StatusBar.setBarStyle('dark-content', true);
  const route = useRoute();
  const {id} = route.params; // property Id
  const isFocused = useIsFocused();
  const [property, setProperty] = useState([]);
  const [user, setUser] = useState('');
  const [isFavoriate, setIsFavoriate] = useState();

  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('user')
        .then(value => {
          let userData = JSON.parse(value);
          setUser(userData);
          let fav = userData.favorites.includes(id);
          setIsFavoriate(fav);
          console.log(JSON.parse(value).favorites, id);
        })
        .catch(err => console.log('Error Message' + err));
    }
  }, [isFocused, id]);

  useEffect(() => {
    if (isFocused) {
      try {
        http
          .get(`api/properties/getPropertyById/${id}`)
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
  }, [isFocused, id]);

  const toggleFavorite = async () => {
    try {
      const res = await http.post(`/api/users/favorites/${user._id}`, {
        id,
      });
      AsyncStorage.setItem('user', JSON.stringify(res.data));
      console.log('r', res.data);
      setIsFavoriate(!isFavoriate);
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

  const deleteProperty = async () => {
    try {
      const res = await http.delete(`/api/properties/deleteProperty/${id}`);
      if (res.status === 200) {
        Alert.alert('', 'Property Deleted Successfully');
        navigation.navigate('Home');
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
    <ScrollView>
      <View style={styles.container}>
        <Carousel
          data={property?.images}
          sliderWidth={390}
          itemWidth={300}
          renderItem={({item}) => {
            return (
              <View key={property._id}>
                <Image
                  source={{
                    uri: `${baseURL}/${item}`,
                  }}
                  resizeMode="contain"
                  style={styles.images}
                />
              </View>
            );
          }}
        />
        <Text style={styles.titleText}>{property.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceHeading}>Price</Text>
          <Text style={styles.priceText}>$ {property.price} Per Week</Text>

          <Pressable
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.favIconContainer,
            ]}>
            <Icon
              key={property._id}
              style={styles.favIcon}
              name="heart"
              size={25}
              color={isFavoriate ? 'red' : 'white'}
              onPress={toggleFavorite}
            />
          </Pressable>

          <View style={styles.line} />
        </View>
        <View style={styles.bedContainer}>
          <Icon name="bed" size={35} color={'#d2a8cc'} />
          <Icons name="toilet" size={35} color={'#d2a8cc'} />
          <Icon name="car" size={35} color={'#d2a8cc'} />
        </View>
        <View style={styles.bedContainer}>
          <Text style={styles.text}>{property.beds} Bedrooms</Text>
          <Text style={styles.text}>{property.bathroom} Bathrooms</Text>
          <Text style={styles.text}>{property.parking} Parkings</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.line} />
          <Text style={styles.detailHeading}>Property Details</Text>
          <Text style={styles.detailText}>{property.details}</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactHeading}>Contact</Text>
          <Text style={styles.contactText}>{property.agentName}</Text>
          <View style={styles.iconContainer}>
            <IconButton
              onPress={() =>
                Linking.openURL(`tel: ${property.agentPhoneNumber}`)
              }
              icon="call"
              size={20}
              color={'#d2a8cc'}
              style={styles.icon}
            />
            <IconButton
              onPress={() =>
                Linking.openURL(`mailto: ${property.agentEmailAddress}`)
              }
              icon="mail"
              size={20}
              color={'#d2a8cc'}
              style={styles.icon}
            />
            <View style={styles.line} />
          </View>
        </View>
      </View>
      {user.isAdmin === true ? (
        <View style={styles.deleteContainer}>
          <TouchableOpacity onPress={deleteProperty}>
            <Icon name="trash-outline" size={30} color={'red'} />
          </TouchableOpacity>
        </View>
      ) : (
        ''
      )}
    </ScrollView>
  );
};

export default PropertiesDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  image: {
    width: '100%',
    height: 200,
  },
  priceContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 15,
    paddingHorizontal: 10,
    margin: 5,
  },
  priceHeading: {
    fontSize: 18,
    color: '#1f394a',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
    paddingHorizontal: 10,
    margin: 5,
    paddingTop: 5,
  },
  line: {
    borderBottomColor: '#d2a8cc',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  bedContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
  },
  detailText: {
    fontSize: 16,
    fontWeight: '400',
  },
  detailContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 15,
    paddingHorizontal: 15,
    margin: 5,
  },
  detailHeading: {
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  contactContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingBottom: 50,
    margin: 5,
  },
  contactHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
  contactText: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  iconContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 10,
    left: 20,
    paddingVertical: 10,
    paddingBottom: 50,
  },
  icon: {
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 50,
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  images: {
    width: '100%',
    height: 200,
  },
  favIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edcae8',
    borderRadius: 50,
    width: 45,
    height: 45,
    position: 'absolute',
    right: 30,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  favIcon: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  deleteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    backgroundColor: '#ffcccb',
    width: '100%',
    height: 50,
  },
});
