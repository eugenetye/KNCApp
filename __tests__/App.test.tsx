import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import App from '../App';

describe('<App />', () => {
  it('has 1 child', async () => {
    const tree = create(<App />).toJSON();
    if (tree && 'children' in tree) {
      expect(tree.children!.length).toBe(1);
    } else {
      fail();
    }
  });
});
