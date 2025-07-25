import React from 'react';
import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import { Unsubscribe, collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebaseConfig';
import { CachedImage } from '../components/CachedImage';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContext } from '@react-navigation/native';
import { loadAsync } from 'expo-font';

export type RootStackParamList = {
  Info_Template: { param: any } | undefined;
};

const styles = StyleSheet.create({
  image: {
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#046339',
    borderRadius: 15,
    padding: 10,
    height: 50,
    width: "80%",
    marginBottom: 10,
  }
});

export class Discover extends React.Component {
  state = {
    fontsLoaded: false,
    datas: [],
  };
  static contextType = NavigationContext;
  // context!: React.ContextType<typeof NavigationContext>;
  unsubscribe: null | Unsubscribe = null;

  async componentDidMount() {
    await loadAsync({
      'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
    });

    this.setState({ fontsLoaded: true });

    const querySnapshot = collection(FIRESTORE_DB, "discover");
    const unsubscriber = onSnapshot(querySnapshot, {
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

    this.unsubscribe = unsubscriber;
  }

  componentWillUnmount(): void {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
  }

  render() {
    const { fontsLoaded, datas } = this.state;
    const navigation = this.context as StackNavigationProp<RootStackParamList>;

    if (!fontsLoaded) {
      return null;
    }

    return (
      <ScrollView>
        <View>
          <View>
            <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding: 15 }}>Discover</Text>
          </View>
        </View>
        <View style={{
          paddingVertical: 12, backgroundColor: "#F8F8F8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          margin: 14,
        }}>

          <CachedImage className='w-full h-40 object-cover rounded-2xl mt-3 mb-4' url={'/discover/discover.jpeg'}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          {datas.map((data: { title: string, }, i) => (
            <Pressable style={styles.button} key={i} onPress={() => navigation.navigate('Info_Template', { param: data })}>
              <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Questrial-Regular' }}>{data.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  }
}

