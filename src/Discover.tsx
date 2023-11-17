import { ScrollView, Text, View, Pressable, Image, StyleSheet } from 'react-native'
import React, { useState, useLayoutEffect, useEffect, Component } from 'react'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import CachedImage from '../components/CachedImage';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Info_Template: { param: any } | undefined;
}

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
    borderRadius: 15  ,
    padding: 10,
    height: 50,
    width: "80%",
    marginBottom: 10,
  }
});

export const Discover = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });

  const [datas, setDatas] = useState<any[]>([]); // Initialize with an empty array
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const querySnapshot = collection(FIRESTORE_DB, "discover");

    const subscriber = onSnapshot(querySnapshot, {
      next: (snapshot) => {
        
        const datas: any[] = [];
        snapshot.docs.forEach((doc) => {
          datas.push({
            id: doc.id,
            ...doc.data(),
          })
        });
        setDatas(datas);
      },
    });

    return () => subscriber();
  }, []);

  if (fontsLoaded) {
    return (
      <ScrollView>
        <View>
        <View>
            <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Discover</Text>
          </View>
          <View style={{ 
            paddingVertical: 12, backgroundColor: "#F8F8F8",
            borderRadius: 8,
            padding: 10,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            margin: 14, }}>

            <CachedImage className='w-full h-40 object-cover rounded-2xl mt-3 mb-4' url = {'/discover/discover.jpeg'}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            {datas.map((data, i) => (
                <Pressable style={styles.button} key={i} onPress={() => navigation.navigate('Info_Template', { param: data })}>
                <Text style={{color: 'white', fontSize: 20, fontFamily: 'Questrial-Regular'}}>{data.title}</Text>
                </Pressable>
              ))}       
          </View>

        </View>
      </ScrollView>
    )
  } else {
    return null;
  }

}
