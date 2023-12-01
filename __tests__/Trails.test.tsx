import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import { Trails } from '../src/Trails';

describe('<Trails />', () => {
    // Test Case ID = 11
    it('loads data', async () => {
      const comp = create(<Trails />);
      let tree = comp.toTree()?.instance;
      expect(tree?.state.datas.length).toEqual(0);
    });
  
    // Test Case ID = 12
    it('renders correctly', async () => {
        const comp = new Trails({});
        comp.state.fontsLoaded = true;
        const tree = comp.render();
        expect({ ...tree, children: null} as ReactTestRendererJSON)
          .toMatchSnapshot();
      });
  });
  