import React from 'react';
import {View, Button, Image} from 'react-native';
import styles from './Styles/HomeScreenStyles';
import PuzzleCatBtn from '../Components/PuzzleCatBtn';
import * as images from '../Contants/images';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {resetEverything} from '../Redux/Reducers/GeneralReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetEverything());
      getScore();
    }, []),
  );

  const getScore = async () => {
    try {
      const totalScore = await AsyncStorage.getItem('puzzleScore');
      console.log('totalScore at homeScreen');
      console.log(totalScore);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{resizeMode: 'center', height: 100}}
          source={images.puzzleLogo}
        />
      </View>
      <View
        style={{padding: 20, margin: 20, flex: 1, backgroundColor: 'orange'}}>
        <View style={{flex: 1}}>
          <PuzzleCatBtn catName="Cities" navigation={navigation} />
          <PuzzleCatBtn catName="Foods" navigation={navigation} />
          <PuzzleCatBtn catName="Animals" navigation={navigation} />
        </View>
        <View>
          <Button
            title="Leaders Board"
            onPress={() => navigation.navigate('LeaderboardScreen')}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
