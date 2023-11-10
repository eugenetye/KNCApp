import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFonts } from 'expo-font';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { IndividualItem } from '../components/IndividualItem';

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
  
    console.log(datas)
  
  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Past</Text>
        </View>

        {datas.map((data, i) => (
            <IndividualItem key={i} item={data}/> 
          ))}

      </View>
    </ScrollView>
  )
}