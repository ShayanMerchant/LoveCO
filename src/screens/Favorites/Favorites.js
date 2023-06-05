import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Components
import PropertyCard from '../../components/Card/PropertyCard';

// Backend
import http, {baseURL} from '../../../api/http';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favouriate = () => {
  const isFocused = useIsFocused();
  const [user, setUser] = useState('');
  const [property, setProperty] = useState();
  const navigation = useNavigation();

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
    if (user) {
      try {
        http
          .get('api/properties/getProperties')
          .then(response => {
            JSON.stringify(response.data);
            let favoritesProperties = response.data.filter(item =>
              user?.favorites.includes(item._id),
            );
            setProperty(favoritesProperties);
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
  }, [user]);
  function favProperties(itemData) {
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
  return (
    <View style={styles.container}>
      <FlatList
        data={property}
        keyExtractor={item => item._id}
        renderItem={favProperties}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text>No Favorites Found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Favouriate;
