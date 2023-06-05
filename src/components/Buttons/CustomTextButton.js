import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const CustomTextButton = ({title, style, onPress}) => {
  return (
    <View style={styles.container}>
      <Text onPress={onPress} style={[styles.button, {...style}]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 300,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    color: '#d2a8cc',
  },
});

export default CustomTextButton;
