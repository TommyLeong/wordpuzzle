import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// array list with text
const SingleCharTextbox = props => {
  return (
    <View style={{padding: 5}}>
      <TouchableOpacity
        style={{
          height: 55,
          width: 55,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          props.cbAction();
        }}>
        <Text>{props.char}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleCharTextbox;
