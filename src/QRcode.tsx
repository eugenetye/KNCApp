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
  last_scanned_page: string,
  isPlaying: Boolean,
  progress: number,
  duration: number,
};

const SAVE_DIR = FileSys.cacheDirectory + 'kncapp/';

async function ensureDirExists() {
  const dirInfo = await FileSys.getInfoAsync(SAVE_DIR);
  if (!dirInfo.exists) {
    console.log("KNC directory doesn't exist, creating…");
    await FileSys.makeDirectoryAsync(SAVE_DIR, { intermediates: true });
  }
}

async function saveDirExists(): Promise<Boolean> {
  return (await FileSys.getInfoAsync(SAVE_DIR)).exists;
}

export default class QRScanner extends React.Component<QRProps, QRState> {
  state: QRState = {
    hasCameraPermission: false,
    last_scanned_page: '',
    isPlaying: false,
    progress: 0,
    duration: 0,

  };

  componentDidMount() {
    this._requestCameraPermission();
    this._handleBarCodeRead({data: '{}'})
  }

  _onPlaybackUpdate = (status: AVPlaybackStatus) => {
    console.log(status);

    if (status.isLoaded) {
      const dur = status.durationMillis
        ? status.durationMillis
        : 0;

      this.setState({
        isPlaying: status.isPlaying,
        progress: status.positionMillis,
        duration: dur
      });
    } else {
      // There was an error...
    }
  };

  _requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = async (result: any) => {
    // if (this.state.isPlaying) return;

    const new_param = JSON.parse(result.data);

    try {
      if (!(await saveDirExists())) {
        await ensureDirExists();
        const reference = ref(FIREBASE_STORAGE, '/ff-16b-2c-44100hz.mp3');
        const url = await getDownloadURL(reference);
        await FileSys.downloadAsync(url, SAVE_DIR + 'audio.mp3');
      }
    } catch (e) {
      console.log(`We got an error: ${e}`);
    }

    console.log('Make audio crap');
    this.setState({ isPlaying: true });

    // this.props.navigation.navigate('Trail_Info', { param: new_param });
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
        {(this.state.isPlaying
          ? <AudioPlayer file={SAVE_DIR + 'audio.mp3'} />
          : <Text disabled={true} />)}
      </View>
    );
  }
}

export const QRcode = (props: any) => {
  return (
    <QRScanner {...props} />
  )
}

