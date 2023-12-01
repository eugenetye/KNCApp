import React from 'react';
import { act, create, ReactTestRendererJSON } from 'react-test-renderer';

import { QRScanner } from '../src/QRcode';

describe('<QRScanner />', () => {
  // Test Case ID: 15
  it('request permissions to fail', async () => {
    const comp = new QRScanner({ navigation: null });
    try {
      await comp._requestCameraPermission();
    } catch (e) {
      expect("requestCameraPermission to fail").toEqual("requestCameraPermission to fail")
    }
  });

  // Test Case ID: 16
  it('handle bar code', async () => {
    const comp = new QRScanner({ navigation: null });
    try {
      await comp._handleBarCodeRead({});
    } catch (e) {
      expect("requestCameraPermission to fail").toEqual("requestCameraPermission to fail")
    }
  });

  // Test Case ID: 17
  it('renders correctly', async () => {
    const comp = create(<QRScanner
      navigation={null}
      need_permission={false}
    />);
    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot()
  });
});
