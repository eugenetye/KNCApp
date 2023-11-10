import { View, Text } from 'react-native'
import React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSys from 'expo-file-system';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { DocumentSnapshot, doc, getDoc } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';

type QRProps = {
  navigation: any
};
type QRState = {
  hasCameraPermission: Boolean,
  key: number,
  audioFile: string,
};

export const SAVE_DIR = FileSys.cacheDirectory + 'kncapp/';
const AUDIO = 'audio/';

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
    key: 0
  };

  async componentDidMount() {
    await this._requestCameraPermission();
    this.setState({key: -1})
  }

  _requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = async (result: any) => {
    var path: string[] = result.data.split('/');
    console.log(path);

    var data_doc: DocumentSnapshot;
    try {
      data_doc = await getDoc(doc(
        FIRESTORE_DB,
        path.splice(0, 1)[0],
        ...path
      ));
    } catch (e) {
      console.log(`Fetch doc err: ${e}`);
      return;
    }

    console.log(data_doc.data());
    if (data_doc.get('audio')) {
      try {
        if (!(await saveDirExists())) {
          await ensureDirExists();
        }
        for (let i = 0; i < data_doc.get('files').length; i++) {
          const file = data_doc.get('files')[i];
          if (!(await saveFileExists(SAVE_DIR + file + '.mp3'))) {
            const reference = ref(FIREBASE_STORAGE, AUDIO + file + '.mp3');
            const url = await getDownloadURL(reference);
            await FileSys.downloadAsync(url, SAVE_DIR + file + '.mp3');
          }
        }
        alert("All audio has downloaded");
        this.setState((prev, props) => { return {key: prev.key + 1}; });
        return;
      } catch (e) {
        console.log(`We got an error: ${e}`);
      }
    }

    this.setState((prev, props) => { return {key: prev.key + 1}; });

    // This happens for both audio and picture pages
    this.props.navigation.navigate('Info_Template', { param: data_doc.data() });
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
              key={this.state.key}
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

