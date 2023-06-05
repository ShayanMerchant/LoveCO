import React from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';

const CustomButton = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.button} onPress={onPress}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 300,
    maxHeight: Platform.OS === 'android' ? 50 : 52,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#d2a8cc',
  },
  button: {
    fontSize: 18,
    color: 'white',
  },
});

export default CustomButton;
