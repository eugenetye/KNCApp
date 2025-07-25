import React from 'react';
import { act, create, ReactTestRendererJSON } from 'react-test-renderer';

import { Past } from '../src/Past';

describe('<Past />', () => {
  // Test Case ID = 13
  it('load fonts', async () => {
    const comp = create(<Past />);
    let tree = comp.toTree()?.instance;
    await act(async () => {
      await tree?.loadFonts();
    });
    expect(tree?.state.fontsLoaded).toBeTruthy();
  });

  // Test Case ID 14
  it('renders correctly', async () => {
    const comp = new Past({});
    comp.state.fontsLoaded = true;
    const tree = comp.render();
    expect({ ...tree, children: null } as ReactTestRendererJSON)
      .toMatchSnapshot();
  });
});
