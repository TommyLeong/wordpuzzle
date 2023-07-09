import React, {useState} from 'react';
import {View, Text, Alert, Button} from 'react-native';
import styles from './Styles/LeaderboardScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import fakeData from '../Contants/fakeData';

const LeaderboardScreen = ({navigation}) => {
  const [leaderData, setLeaderData] = useState(fakeData);

  useFocusEffect(
    React.useCallback(() => {
      console.log(fakeData);
      getScore();
    }, []),
  );

  const getScore = async () => {
    let totalScore = 0;
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

  const renderShareFBbutton = () => {
    return (
      <View>
        <Button
          title="Share to Facebook"
          onPress={() => Alert.alert('Pending development')}
        />
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
