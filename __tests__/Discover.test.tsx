import React from 'react';
import { act, create, ReactTestRendererJSON } from 'react-test-renderer';

import { Discover } from '../src/Discover';

describe('<Discover />', () => {
    // Test Case ID = 9
    it('loads data', async () => {
        const comp = create(<Discover />);
        let tree = comp.toTree()?.instance;
        expect(tree?.state.datas.length).toEqual(0);
    });

    // Test Case ID = 10
    it('renders correctly', async () => {
        const comp = new Discover({});
        comp.state.fontsLoaded = true;
        const tree = comp.render();
        expect({ ...tree, children: null } as ReactTestRendererJSON)
            .toMatchSnapshot();
    });
});
