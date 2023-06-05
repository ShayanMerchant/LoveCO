import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';

//Icons
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton = ({onPress, icon, size, color, style}) => {
  return (
    <View>
      <Pressable
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
          styles.icon,
          style,
        ]}
        onPress={onPress}>
        <Icon name={icon} size={size} color={color} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe8f0',
    borderRadius: 20,
    width: 55,
    height: 55,
  },
});

export default IconButton;
