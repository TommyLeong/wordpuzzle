import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const PuzzleCatBtn = props => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 70,
          margin: 15,
          backgroundColor: 'pink',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          props.navigation.navigate('PuzzleScreen', {category: props.catName});
        }}>
        <Text>{props.catName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PuzzleCatBtn;
