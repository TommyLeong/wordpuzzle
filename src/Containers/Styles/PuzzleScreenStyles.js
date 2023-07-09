import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  puzzleContainer: {
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
  puzzleHintView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  puzzleView: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
