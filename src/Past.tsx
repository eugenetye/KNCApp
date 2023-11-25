import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFonts } from 'expo-font';
import { FIRESTORE_DB } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { Event_item } from '../components/Event_item';

export const Past = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });


  const [datas, setDatas] = useState<any[]>([]); // Initialize with an empty array


  useEffect(() => {
    const querySnapshot = collection(FIRESTORE_DB, "past");

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
  
  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Past Exhibits</Text>
        </View>

        {datas.map((data, i) => (
            <Event_item key={i} item={data}/> 
          ))}

      </View>
    </ScrollView>
  )
}