import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import { AudioPlayer } from '../components/AudioPlayer';

describe('<AudioPlayer />', () => {
  // Test Case ID = 3
  it('does not play on invalid song', async () => {
    const comp = create(<AudioPlayer file='foo.bar' />);
    let tree = comp.toTree()?.instance;
    expect(tree.state.isPlaying || tree.state.hasStarted).toBeFalsy()
  });

  // Test Case ID = 4
  it('renders correctly', async () => {
    const comp = create(<AudioPlayer file='foo.bar' />);
    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot()
  });
});
