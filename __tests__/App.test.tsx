import React from 'react';
import {create} from 'react-test-renderer';

import App from '../App';

describe('<App />', () => {
  // Test Case ID = 1
  it('correctly renders', async () => {
    const tree = create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Test Case ID = 2
  it('has 1 child', async () => {
    const tree = create(<App />).toJSON();
    if (tree && 'children' in tree) {
      expect(tree.children!.length).toBe(1);
    } else {
      expect("no field children in App JSON").toEqual(null);
    }
  });
});
