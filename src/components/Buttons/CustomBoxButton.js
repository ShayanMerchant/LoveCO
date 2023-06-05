import React from 'react';
import {View, StyleSheet, Text, Platform, Pressable} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBoxButton = ({title, onPress, size, iconName, iconColor}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.buttomContainer,
      ]}
      onPress={onPress}>
      <View style={styles.container}>
        <Icon name={iconName} size={size} color={iconColor} />
        <Text style={styles.text}>{title}</Text>
        <Icon
          name="chevron-forward-outline"
          size={25}
          color={iconColor}
          style={styles.arrow}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttomContainer: {
    width: '95%',
    height: Platform.OS === 'ios' ? 55 : 50,
    marginHorizontal: 10,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontSize: 18,
    fontWeight: '500',
  },
  arrow: {
    position: 'absolute',
    left: 285,
  },
});

export default CustomBoxButton;
