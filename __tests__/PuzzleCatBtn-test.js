import React from 'react';
import renderer from 'react-test-renderer';
import PuzzleCatBtn from '../src/Components/PuzzleCatBtn';

test('renders correctly', () => {
  const tree = renderer.create(<PuzzleCatBtn />).toJSON();
  expect(tree).toMatchSnapshot();
});
