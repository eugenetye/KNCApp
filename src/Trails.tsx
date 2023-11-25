import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { loadAsync } from 'expo-font';
import { FIRESTORE_DB } from '../firebaseConfig';
import { Unsubscribe, collection, onSnapshot } from 'firebase/firestore';
import { IndividualItem } from '../components/IndividualItem';

export class Trails extends Component {
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
    const querySnapshot = collection(FIRESTORE_DB, 'trails');

    const subscriber = onSnapshot(querySnapshot, {
      next: (snapshot) => {
        const d: any[] = [];
        snapshot.docs.forEach((doc) => {
          d.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.setState({ datas: d });
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
              <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding: 15 }}>Trails</Text>
            </View>

            {datas.map((data, i) => (
              <IndividualItem key={i} item={data} />
            ))}
          </View>
        </ScrollView>
      );
    } else {
      return null; // or render a loading indicator
    }
  }
}
