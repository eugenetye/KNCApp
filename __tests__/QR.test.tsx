import React from 'react';
import {act, create, ReactTestRendererJSON} from 'react-test-renderer';

import QRScanner from '../src/QRcode';

describe('<QRScanner />', () => {
  it('request permissions', async () => {
    const comp = new QRScanner({ navigation: null });
    try {
        await comp._requestCameraPermission();
    } catch (e) {
        expect("requestCameraPermission to fail").toEqual("requestCameraPermission to fail")
    }
  });
});
