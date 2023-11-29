import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import { AudioPlayer } from '../components/AudioPlayer';

describe('<AudioPlayer />', () => {
  it('does not play on invalid song', async () => {
    const comp = create(<AudioPlayer file='foo.bar' />);
    let tree = comp.toTree()?.instance;
    expect(tree.state.isPlaying || tree.state.hasStarted).toBeFalsy()
  });
  it('plays valid song', async () => {
    const comp = create(<AudioPlayer file='../assets/foo.mp3' />);
    let tree = comp.toTree()?.instance;
    expect(tree.state.isPlaying || tree.state.hasStarted).toBeTruthy();
  });
});
