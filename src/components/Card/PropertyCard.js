import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';

const Card = ({image, title, price, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <ImageBackground source={image} style={styles.imageContainer}>
          <View style={styles.addressTextContainer}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.priceTextContainer}>
            <Text style={styles.text}>${price} PW</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 345,
    height: 200,
    paddingBottom: 25,
    margin: 5,
  },
  addressTextContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#1f394a',
  },
  priceTextContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#1f394a',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 14,
    padding: 15,
    color: 'white',
    fontWeight: '600',
  },
  favoriateContainer: {
    backgroundColor: '#1f394a',
    padding: 10,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default Card;
