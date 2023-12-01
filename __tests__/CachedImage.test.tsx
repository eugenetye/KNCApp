import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import { CachedImage } from '../components/CachedImage';

describe('<CachedImage />', () => {
  // Test Case ID = 5
  it('does not play on invalid song', async () => {
    const comp = create(<CachedImage url='/trails/arboretum_loop.jpeg' />);
    let tree = comp.toTree();
    expect(tree?.props.url).toEqual("/trails/arboretum_loop.jpeg")
  });

  // Test Case ID = 6
  it('renders correctly', async () => {
    const comp = create(<CachedImage url='/trails/arboretum_loop.jpeg' />);
    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot()
  });
});
