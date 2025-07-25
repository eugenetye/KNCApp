import { View, Text } from 'react-native'
import React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSys from 'expo-file-system';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { DocumentSnapshot, doc, getDoc } from 'firebase/firestore';

type QRProps = {
  navigation: any,
  test_permission?: boolean,
};
type QRState = {
  hasCameraPermission: Boolean,
  audioFile: string,
  all_downloaded: Boolean,
};

export const SAVE_DIR = FileSys.cacheDirectory + 'kncapp/';
const AUDIO = 'audio/';

async function ensureDirExists() {
  await FileSys.makeDirectoryAsync(SAVE_DIR, { intermediates: true });
}

async function saveDirExists(): Promise<Boolean> {
  return (await FileSys.getInfoAsync(SAVE_DIR)).exists;
}

export async function saveFileExists(file: string): Promise<Boolean> {
  return (await FileSys.getInfoAsync(file)).exists;
}

export class QRScanner extends React.Component<QRProps, QRState> {
  state: QRState = {
    hasCameraPermission: false,
    audioFile: '',
    all_downloaded: false,
  };
  needs_permission = true;

  constructor(props: QRProps) {
    super(props);
    if (props.test_permission === true) {
      this.needs_permission = false;
    }
  }

  async componentDidMount() {
    if (this.needs_permission) {
      await this._requestCameraPermission();
    }
  }

  _requestCameraPermission = async () => {
    const obj = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasCameraPermission: obj.status === 'granted',
    });
  }

  _navigateToTrails = () => {
    this.setState({ all_downloaded: true });
    this.props.navigation.navigate('Trails');
  }

  _navigateWithData = (data: any) => {
    this.props.navigation.navigate('Info_Template', { param: data });
  }

  _handleBarCodeRead = async (result: any) => {
    var path: string[] = result.data.split('/');
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
        this.setState({ all_downloaded: true });
        return;
      } catch (e) {
        console.log(`While downloading all files: ${e}`);
      }
    }
    this._navigateWithData(data_doc.data());
  }

  render() {
    return (
      <View>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{
            textAlign: 'center',
            fontSize: 25,
            color: 'red'
          }}>
            Camera permission is not granted
          </Text>
        ) : (
          <View
            style={{
              height: '75%',
              width: '100%'
            }}>
            {this.state.all_downloaded
              ? <Text style={{
                fontSize: 30,
                textAlign: 'center',
                padding: 20,
                fontFamily: 'Questrial-Regular',
              }}>All Files Downloaded!</Text>
              : null}
            <BarCodeScanner
              onBarCodeScanned={this._handleBarCodeRead}
              style={{
                height: '100%',
                width: '100%',
                borderWidth: 10,
                borderRadius: 10,
              }}
            />
            <Text style={{
                marginTop: 100,
                fontSize: 30,
                textAlign: 'center',
                fontFamily: 'Questrial-Regular',
              }}>Scan your QR code here!</Text>
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

