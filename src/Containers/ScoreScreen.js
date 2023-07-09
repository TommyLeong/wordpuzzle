import React, {useEffect} from 'react';
import {View, Text, Button, Alert, BackHandler} from 'react-native';
import styles from './Styles/ScoreScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrPuzzleCount} from '../Redux/Reducers/GeneralReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScoreScreen = ({route, navigation}) => {
  const {score, mixedUpWords, category} = route.params;
  const dispatch = useDispatch();
  const reducerState = useSelector(state => state.generalReducer);

  useEffect(() => {
    if (score > 0) {
      updateScore(score);
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  });

  const updateScore = async addingScore => {
    let totalScore = 0;
    try {
      let existingScore = await AsyncStorage.getItem('puzzleScore');
      totalScore = existingScore === null ? 0 : parseInt(existingScore);
      totalScore = totalScore + addingScore;

      await AsyncStorage.setItem('puzzleScore', totalScore.toString());
    } catch (e) {
      console.log(e);
    }
  };

  const renderNextBtn = () => {
    return (
      <View>
        <Button
          title="Next"
          onPress={() => {
            console.log('reducerState.currentPuzzleCount');
            console.log(reducerState.currentPuzzleCount);

            console.log('mixedUpWords');
            console.log(mixedUpWords);

            console.log('mixedUpWords.length');
            console.log(mixedUpWords.length);

            if (reducerState.currentPuzzleCount + 1 === mixedUpWords.length) {
              Alert.alert(
                'Well done!',
                "Congratulations, you're now graduated! Subscribe for more!",
                [
                  {
                    text: 'Bring it on!',
                    onPress: () => {
                      navigation.navigate('HomeScreen');
                    },
                  },
                ],
              );
            } else {
              dispatch(setCurrPuzzleCount(reducerState.currentPuzzleCount + 1));
              navigation.navigate('PuzzleScreen', {category});
            }
          }}
        />
      </View>
    );
  };

  const renderResultMsg = () => {
    let defaultMsg = 'Time to brush up, try next!';
    if (score > 0) {
      defaultMsg = `Correct! Congratulations \n\n You earned ${score} points`;
    }
    return (
      <View style={styles.resultMsgContainer}>
        <Text style={styles.resultMsgContainer_txt}>{defaultMsg}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.resultMsgContainer}>
        <Text>
          {reducerState.currentPuzzleCount + 1}/{mixedUpWords.length}
        </Text>
        {renderResultMsg()}
        {renderNextBtn()}
      </View>
    </SafeAreaView>
  );
};

export default ScoreScreen;
