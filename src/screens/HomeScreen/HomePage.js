import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar, FlatList, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

// Tab Navigation
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// Data
import {TYPES} from '../../assests/Data/PropertyTypeData';

// Header Image
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';

// Components
import PropertyCard from '../../components/Card/PropertyCard';
import PropertyTypeCard from '../../components/Card/PropertyTypeCard';
import IconButton from '../../components/Buttons/IconButton';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend
import http, {baseURL} from '../../../api/http';

const HomePage = ({navigation}) => {
  function renderPropertyType(itemData) {
    return (
      <PropertyTypeCard
        title={itemData.item.title}
        image={itemData.item.image}
        onPress={() => {
          if (itemData.item.title === 'Apartment') {
            navigation.navigate('Apartments');
          } else if (itemData.item.title === 'House') {
            navigation.navigate('Houses');
          } else if (itemData.item.title === 'Townhouse') {
            navigation.navigate('Townhouses');
          } else if (itemData.item.title === 'Unit') {
            navigation.navigate('Units');
          }
        }}
      />
    );
  }

  function renderRecentProperties(itemData) {
    return (
      <PropertyCard
        title={itemData.item.title}
        price={itemData.item.price}
        image={{uri: `${baseURL}/${itemData.item.images[0]}`}}
        onPress={() =>
          navigation.navigate('PropertiesDetail', {id: itemData.item._id})
        }
      />
    );
  }
  useEffect(() => {
    if (isFocused) {
      AsyncStorage.getItem('user')
        .then(value => {
          setUser(JSON.parse(value));
        })
        .catch(err => console.log('Error Message' + err));
    }
  }, [isFocused]);

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

  const isFocused = useIsFocused();
  const [user, setUser] = useState('');
  const [property, setProperty] = useState([]);
  const tabBarheight = useBottomTabBarHeight();
  StatusBar.setBarStyle('light-content', true);
  const headerImage = require('../../assests/images/homepage.jpeg');
  var myDate = new Date();
  var hrs = myDate.getHours();
  var greetings;

  if (hrs < 12) {
    greetings = 'Good Morning! ';
  } else if (hrs >= 12 && hrs <= 17) {
    greetings = 'Good Afternoon! ';
  } else if (hrs >= 17 && hrs <= 24) {
    greetings = 'Good Evening! ';
  }

  return (
    <ImageHeaderScrollView
      maxHeight={250}
      headerImage={headerImage}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, {paddingBottom: tabBarheight}]}>
        <Text style={styles.greetings}>{greetings + user.firstName}</Text>
        <View style={styles.iconContainer}>
          <IconButton
            onPress={() => navigation.navigate('Search')}
            icon="search"
            size={25}
            color={'#4b8ab4'}
          />
          <IconButton
            onPress={() => navigation.navigate('Profile')}
            icon="person"
            size={25}
            color={'#4b8ab4'}
          />
          {user.isAdmin === true ? (
            <IconButton
              onPress={() => navigation.navigate('AddProperties')}
              icon={'add-circle'}
              size={25}
              color={'#4b8ab4'}
            />
          ) : (
            ''
          )}
          <IconButton
            onPress={() => navigation.navigate('Favorites')}
            icon="heart"
            size={25}
            color={'#4b8ab4'}
          />
          <IconButton
            onPress={() => navigation.navigate('Contact')}
            icon="mail"
            size={25}
            color={'#4b8ab4'}
          />
        </View>
        <Text style={styles.text}>Categories</Text>
        <FlatList
          data={TYPES}
          keyExtractor={item => item.id}
          renderItem={renderPropertyType}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.text}>Most Recent</Text>
        <FlatList
          data={property.reverse().slice(0, 8)}
          keyExtractor={item => item._id}
          renderItem={renderRecentProperties}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ImageHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetings: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 15,
    letterSpacing: 1,
    color: '#1f394a',
  },
  iconContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 15,
  },
  cardContainer: {
    marginHorizontal: 10,
  },
});

export default HomePage;
