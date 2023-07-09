import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  leaderboardSpace: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  leaderboardWrapper: {
    flexDirection: 'row',
    display: 'flex',
    height: 50,
    marginTop: 10,
  },
  leaderboardCell: {
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'thistle',
  },
});
