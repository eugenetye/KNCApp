import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFonts } from 'expo-font';
import { FIRESTORE_DB } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { IndividualItem } from '../components/IndividualItem';

export const Trails = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });

  const [datas, setDatas] = useState<any[]>([]); // Initialize with an empty array

  useEffect(() => {
    const querySnapshot = collection(FIRESTORE_DB, "trails");

    const subscriber = onSnapshot(querySnapshot, {
      next: (snapshot) => {
        var d: any[] = [];
        snapshot.docs.forEach((doc) => {
          d.push({
            id: doc.id,
            ...doc.data(),
          })
        });
        setDatas(d);
      },
    });

    return () => subscriber();
  }, []);
  
    
  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Trails</Text>
        </View>

        {datas.map((data, i) => (
            <IndividualItem key={i} item={data}/> 
          ))}

      </View>
    </ScrollView>
  )
}



