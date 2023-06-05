import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

const UploadImage = ({addImage, image}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.uploadBtnContainer}>
        <Pressable onPress={addImage} style={styles.uploadBtn}>
          <Text style={styles.text}>Add Image</Text>
          <Icon name="camera" size={25} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 220,
    width: 220,
    backgroundColor: '#efefef',
    borderRadius: 999,
    overflow: 'hidden',
    margin: 20,
  },
  image: {
    width: 220,
    height: 220,
  },
  text: {
    fontSize: 18,
  },

  uploadBtnContainer: {
    opacity: 0.8,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadImage;
