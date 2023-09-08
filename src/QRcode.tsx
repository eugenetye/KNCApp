import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRScanner extends React.Component {
    state = {
      hasCameraPermission: null,
      lastScannedUrl: '',
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
      // console.log(result);
      if (result.data !== this.state.lastScannedUrl) {
        this.setState({ lastScannedUrl: result.data });
      }
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

export const QRcode = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
      <QRScanner />
  )
}

