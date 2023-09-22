import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { BarCodeScanner } from 'expo-barcode-scanner';

type QRProps = {
  navigation: any
};
type QRState = {
  hasCameraPermission: Boolean,
  last_scanned_page: string,
};


export default class QRScanner extends React.Component<QRProps, QRState> {
    state: QRState = {
      hasCameraPermission: false,
      last_scanned_page: '',
    };

    componentDidMount() {
      this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      this.setState({
        hasCameraPermission: status === 'granted',
      });
    };
  
    _handleBarCodeRead = (result: any) => {
      const new_param = JSON.parse(result.data);

      console.log(result);

      this.props.navigation.navigate('Trail_Info', { param: new_param });
    };
  
    render() {
      return (
        <View>
          {this.state.hasCameraPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : this.state.hasCameraPermission === false ? (
            <Text style={{ color: '#fff' }}>
              Camera permission is not granted
            </Text>
          ) : (
            <View
              style={{
                height: '100%',
                width: '100%'
              }}>
              <BarCodeScanner
                onBarCodeScanned={this._handleBarCodeRead}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          )}
          </View>
      );
    }
}

export const QRcode = (props: any) => {
  return (
      <QRScanner {...props} />
  )
}

