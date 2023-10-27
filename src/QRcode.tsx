import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSys from 'expo-file-system';
import { AVPlaybackStatus, Audio } from 'expo-av';
import AudioPlayer from '../components/AudioPlayer';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

type QRProps = {
  navigation: any
};
type QRState = {
  hasCameraPermission: Boolean,
  audioFile: string,
};

const SAVE_DIR = FileSys.cacheDirectory + 'kncapp/';

async function ensureDirExists() {
  await FileSys.makeDirectoryAsync(SAVE_DIR, { intermediates: true });
}

async function saveDirExists(): Promise<Boolean> {
  return (await FileSys.getInfoAsync(SAVE_DIR)).exists;
}

async function saveFileExists(file: string): Promise<Boolean> {
  return (await FileSys.getInfoAsync(file)).exists;
}

export default class QRScanner extends React.Component<QRProps, QRState> {
  state: QRState = {
    hasCameraPermission: false,
    audioFile: '',
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

  _handleBarCodeRead = async (result: any) => {
    var new_param = JSON.parse(result.data);

    // We only cache audio so far
    //
    // TODO: this will actually need to be a loop, the
    // first QR code we scan at the KNC building will start
    // downloading all the audio files and pictures if there are
    // any.
    if (new_param.audio) {
      try {
        if (!(await saveDirExists())) {
          await ensureDirExists();
        }
        for (let i = 0; i < new_param.files.length; i++) {
          const file = new_param.files[i];
          if (!(await saveFileExists(SAVE_DIR + file + '.mp3'))) {
            const reference = ref(FIREBASE_STORAGE, file + '.mp3');
            const url = await getDownloadURL(reference);
            await FileSys.downloadAsync(url, SAVE_DIR + file + '.mp3');
          }
          new_param.files[i] = SAVE_DIR + file + '.mp3';
        }
      } catch (e) {
        console.log(`We got an error: ${e}`);
      }
    }

    // This happens for both audio and picture pages
    this.props.navigation.navigate('Info_Template', { param: new_param });
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
              height: '75%',
              width: '100%'
            }}>
            <BarCodeScanner
              onBarCodeScanned={this._handleBarCodeRead}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>)}
      </View>
    );
  }
}

export const QRcode = (props: any) => {
  return (
    <QRScanner {...props} />
  )
}

