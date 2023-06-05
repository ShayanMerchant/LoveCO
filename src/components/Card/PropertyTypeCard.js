import {Pressable, StyleSheet, Text, View, Platform, Image} from 'react-native';
import React from 'react';

const PropertyTypeCard = ({title, image, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    margin: 16,
    width: 150,
    height: 150,
    borderRadius: 12,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center',
    position: 'relative',
    bottom: 85,
  },
  image: {
    width: '100%',
    height: 150,
    opacity: 0.65,
    borderRadius: 12,
  },
});

export default PropertyTypeCard;
