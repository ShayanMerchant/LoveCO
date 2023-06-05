import {StatusBar, StyleSheet, View, FlatList, Alert, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// Components
import PropertyCard from '../../components/Card/PropertyCard';

// Backend
import http, {baseURL} from '../../../api/http';

const Townhouses = () => {
  StatusBar.setBarStyle('dark-content', true);
  const navigation = useNavigation();
  const [property, setProperty] = useState([]);
  const isFocused = useIsFocused();
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

  function renderTownhouses(itemData) {
    if (itemData.item.type === 'Townhouse') {
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
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={property}
        keyExtractor={item => item._id}
        renderItem={renderTownhouses}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text>No Properties Found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Townhouses;
