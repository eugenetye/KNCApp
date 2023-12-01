import React from 'react';
import { act, create, ReactTestRendererJSON } from 'react-test-renderer';

import { Current } from '../src/Current';

describe('<Current />', () => {
  // Test Case ID = 7
  it('loads data', async () => {
    const comp = create(<Current />);
    let tree = comp.toTree()?.instance;
    expect(tree?.state.datas.length).toEqual(0);
  });

  // Test Case ID = 8
  it('renders correctly', async () => {
    const comp = new Current({});
    comp.state.fontsLoaded = true;
    const tree = comp.render();
    expect({ ...tree, children: null } as ReactTestRendererJSON)
      .toMatchSnapshot();
  });
});
