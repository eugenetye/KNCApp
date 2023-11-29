import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import { Past } from '../src/Past';

describe('<Past />', () => {
  it('load fonts', async () => {
    const comp = create(<Past />);
    let tree = comp.toTree()?.instance;

    await act(async () => {
        await tree?.loadFonts();
    });

    expect(tree?.state.fontsLoaded).toBeTruthy();
  });

  it('renders correctly', async () => {
    const comp = create(<Past />);
    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot()
  });
});
