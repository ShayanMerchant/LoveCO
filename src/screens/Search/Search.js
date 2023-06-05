import React, {useState, useEffect} from 'react';
import {View, StatusBar, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';

// Tab Navigation
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// Components
import PropertyCard from '../../components/Card/PropertyCard';

// Backend
import http, {baseURL} from '../../../api/http';

const Search = () => {
  StatusBar.setBarStyle('dark-content', true);
  const [property, setProperty] = useState([]);
  const [filteredData, setFilteredData] = useState(property);
  const [searchText, setSearchText] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const tabBarheight = useBottomTabBarHeight();

  function renderProperties(itemData) {
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

  function handleSearch(text) {
    setSearchText(text);

    // filter out the properties based on search text
    const result = property.filter(item => {
      const itemData = `${item.title.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilteredData(result);
  }

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
  return (
    <View style={[styles.container, {paddingBottom: tabBarheight}]}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchText}
        style={styles.searchBar}
        selectionColor={'#FFF'}
        iconColor={'#FFF'}
        placeholderTextColor={'#FFF'}
        theme={{colors: {text: '#FFF'}}}
      />
      <FlatList
        data={searchText ? filteredData : property}
        keyExtractor={item => item._id}
        renderItem={renderProperties}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No result Found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: '95%',
    borderRadius: 20,
    margin: 10,
    fontSize: 18,
    backgroundColor: '#1f394a',
  },
});

export default Search;
