import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import styles from './Styles/PuzzleScreenStyles';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrPuzzleCount} from '../Redux/Reducers/GeneralReducer';
import SingleCharTextbox from '../Components/SingleCharTextbox';

const PuzzleScreen = ({route, navigation}) => {
  const {category} = route.params;
  const dispatch = useDispatch();

  // Get specific category info
  const reducerState = useSelector(state => state.generalReducer);
  console.log('reducerState');
  console.log(reducerState);

  const listOfWords = reducerState[category];
  const [mixedUpWords, setMixedUpWords] = useState([]);

  // Puzzle info
  // const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [userInputPuzzle, setUserInputPuzzle] = useState([]);
  const [currentMixedPuzzleWord, setCurrentMixedPuzzleWord] = useState([]);

  useEffect(() => {
    // Shuffle list of words given from reducer
    // let mixedUpWords = [];
    listOfWords.map(x => {
      setMixedUpWords[
        mixedUpWords.push([...x].sort(() => Math.random() - 0.5).join(''))
      ];
    });
    setCurrentMixedPuzzleWord(
      mixedUpWords[reducerState.currentPuzzleCount].split(''),
    );
  }, []);

  useEffect(() => {
    if (reducerState.currentPuzzleCount === mixedUpWords.length) {
      navigateUserToScoreScreen(0);
    } else {
      // (puzzleNumber < mixedUpWords.length)
      setUserInputPuzzle([]);
      setCurrentMixedPuzzleWord(
        mixedUpWords[reducerState.currentPuzzleCount].split(''),
      );
    }
  }, [reducerState.currentPuzzleCount]);

  // Render user's input char as per sequence
  const renderUserInput = () => {
    console.log('userInputPuzzle');
    console.log(userInputPuzzle);
    return userInputPuzzle.map((value, id) => {
      return (
        <SingleCharTextbox
          key={id}
          char={value}
          cbAction={() => {
            removeFromUserInput(value);
          }}
        />
      );
    });
  };

  // Render shuffled character in box
  const renderShuffledChar = () => {
    if (currentMixedPuzzleWord.length > 0) {
      return currentMixedPuzzleWord.map((value, id) => {
        return (
          <SingleCharTextbox
            key={id}
            char={value}
            cbAction={() => {
              moveCharToUserInput(value);
            }}
          />
        );
      });
    }

    return null;
  };

  const removeFromUserInput = char => {
    const charIndex = userInputPuzzle.indexOf(char);
    console.log(charIndex);

    if (charIndex >= 0) {
      userInputPuzzle.splice(charIndex, 1);
      setUserInputPuzzle([...userInputPuzzle]);

      currentMixedPuzzleWord.push(char);
      setCurrentMixedPuzzleWord([...currentMixedPuzzleWord]);
    }
  };

  const moveCharToUserInput = char => {
    const charIndex = currentMixedPuzzleWord.indexOf(char);
    console.log(charIndex);

    if (charIndex >= 0) {
      currentMixedPuzzleWord.splice(charIndex, 1);
      setCurrentMixedPuzzleWord([...currentMixedPuzzleWord]);

      userInputPuzzle.push(char);
      setUserInputPuzzle([...userInputPuzzle]);

      console.log('listOfWords');
      console.log(listOfWords);

      console.log('reducerState.currentPuzzleCount');
      console.log(reducerState.currentPuzzleCount);

      // Verify result and navigate to ScoreScreen
      if (
        [...userInputPuzzle].join('') ===
        listOfWords[reducerState.currentPuzzleCount]
      ) {
        navigateUserToScoreScreen(10);
      }
    }
  };

  const renderSkipBtn = () => {
    return (
      <View>
        <Button
          title="Skip"
          onPress={() => {
            console.log('reducerState.currentPuzzleCount');
            console.log(reducerState.currentPuzzleCount);

            if (reducerState.currentPuzzleCount + 1 === mixedUpWords.length) {
              navigateUserToScoreScreen(0);
            } else {
              dispatch(setCurrPuzzleCount(reducerState.currentPuzzleCount + 1));
            }
          }}
        />
      </View>
    );
  };

  const navigateUserToScoreScreen = score => {
    navigation.navigate('ScoreScreen', {
      score,
      mixedUpWords,
      category,
    });
  };

  return (
    <View style={styles.container}>
      <Text>
        {reducerState.currentPuzzleCount + 1}/{listOfWords.length}
      </Text>
      <View style={styles.puzzleContainer}>
        <View style={[styles.puzzleView, {backgroundColor: 'green'}]}>
          {renderUserInput()}
        </View>
        <View style={styles.puzzleHintView}>
          <Text>You picked to guess {category}. Good luck!</Text>
        </View>
        <View style={[styles.puzzleView, {backgroundColor: 'red'}]}>
          {renderShuffledChar()}
        </View>
        {renderSkipBtn()}
      </View>
    </View>
  );
};

export default PuzzleScreen;
