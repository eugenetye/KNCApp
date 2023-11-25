import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { loadAsync } from 'expo-font';
import { FIRESTORE_DB } from '../firebaseConfig';
import { Unsubscribe, collection, onSnapshot } from 'firebase/firestore';
import { Event_item } from '../components/Event_item';

export class Past extends Component {
  state = {
    fontsLoaded: false,
    datas: [],
  };
  unsubscribe: null | Unsubscribe = null;

  async componentDidMount() {
    await this.loadFonts();

    if (this.state.fontsLoaded) {
      this.loadData();
    }
  }

  async loadFonts() {
    await loadAsync({
      'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
    });

    this.setState({ fontsLoaded: true });
  }

  loadData = () => {
    const querySnapshot = collection(FIRESTORE_DB, 'past');

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

    this.unsubscribe = subscriber;
  };

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { fontsLoaded, datas } = this.state;

    if (fontsLoaded) {
      return (
        <ScrollView>
          <View>
            <View>
              <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding: 15 }}>Past Exhibits</Text>
            </View>

            {datas.map((data, i) => (
              <Event_item key={i} item={data} />
            ))}
          </View>
        </ScrollView>
      );
    } else {
      return null; // or render a loading indicator
    }
  }
}
