import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';

const CustomTextInput = ({
  placeholder,
  secureTextEntry,
  placeholderTextColor,
  autoCapitalize,
  keyboard,
  value,
  setValue,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboard}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    maxWidth: 300,
    maxHeight: Platform.OS === 'android' ? 40 : 42,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#d2a8cc',
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#1f394a',
  },
});

export default CustomTextInput;
