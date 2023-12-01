import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Unsubscribe, collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { Event_item } from '../components/Event_item';
import { loadAsync } from 'expo-font';

export class Current extends React.Component {
  state = {
    fontsLoaded: false,
    datas: [],
  };
  unsubscribe: null | Unsubscribe = null;

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
    this.unsubscribe = onSnapshot(querySnapshot, {
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
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { datas, fontsLoaded } = this.state;

    if (!fontsLoaded) {
      return <View><Text>Loading...</Text></View>;
    }

    return (
      <ScrollView>
        <View>
          <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Current Exhibits</Text>
        </View>
        <View>
          {datas.map((data, i) => (
            <Event_item key={i} item={data}/>
          ))}
        </View>
      </ScrollView>
    );
  }
}
