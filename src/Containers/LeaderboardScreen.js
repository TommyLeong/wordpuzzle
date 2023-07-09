import React, {useState} from 'react';
import {View, Text, Alert, Button} from 'react-native';
import styles from './Styles/LeaderboardScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import fakeData from '../Contants/fakeData';
import Share from 'react-native-share';

const LeaderboardScreen = ({navigation}) => {
  const [leaderData, setLeaderData] = useState(fakeData);
  let [totalScore, setTotalScore] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      console.log(fakeData);
      getScore();
    }, []),
  );

  const getScore = async () => {
    try {
      const existingScore = await AsyncStorage.getItem('puzzleScore');
      totalScore = existingScore === null ? 0 : parseInt(existingScore);

      let myRecord = leaderData.find(data => data.name === 'Myself');
      if (myRecord === undefined) {
        leaderData.push({
          name: 'Myself',
          score: totalScore,
        });
      } else {
        myRecord.score = totalScore;
      }

      // Sort by score
      leaderData.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      });

      setTotalScore(totalScore);
      setLeaderData([...leaderData]);
    } catch (e) {
      console.log(e);
    }
  };

  const renderLeaderboard = () => {
    return (
      <View style={{flex: 1}}>
        {leaderData.map((leader, index) => {
          return (
            <View key={index} style={styles.leaderboardWrapper}>
              <View style={[styles.leaderboardCell, {flex: 4}]}>
                <Text>{leader.name}</Text>
              </View>
              <View style={[styles.leaderboardCell, {flex: 1}]}>
                <Text>{leader.score}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const shareContent = () => {
    const options = {
      title: 'PuzzleGame',
      message: `My score at puzzle game is ${totalScore}`,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const renderShareFBbutton = () => {
    return (
      <View>
        <Button title="Share my score!" onPress={() => shareContent()} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leaderboardSpace}>
        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
      </View>
      {renderLeaderboard()}
      {renderShareFBbutton()}
    </View>
  );
};

export default LeaderboardScreen;
