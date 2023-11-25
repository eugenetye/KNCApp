import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { Event_item } from '../components/Event_item';
import { loadAsync } from 'expo-font';

interface CurrentState {
  datas: any[];
  fontsLoaded: boolean;
}

export class Current extends React.Component<{}, CurrentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      datas: [],
      fontsLoaded: false,
    };
  }

  async componentDidMount() {
    await loadAsync({
      'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
    });

    this.setState({ fontsLoaded: true });

    const querySnapshot = collection(FIRESTORE_DB, "current");
    const subscriber = onSnapshot(querySnapshot, {
      next: (snapshot) => {
        const datas: any[] = [];
        snapshot.docs.forEach((doc) => {
          datas.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.setState({ datas });
      },
    });

    // Remember to unsubscribe from your firestore snapshot
    return () => {
      subscriber();
    };
  }

  render() {
    const { datas, fontsLoaded } = this.state;

    if (!fontsLoaded) {
      return <View><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>
        <View>
          <View>
            <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding: 15 }}>Current</Text>
          </View>

          {datas.map((data, i) => (
            <Event_item key={i} item={data}/>
          ))}
        </View>
      </ScrollView>
    );
  }
}
