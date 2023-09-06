import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFonts } from 'expo-font';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';


export const Trails = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });


  const [datas, setDatas] = useState<any[]>([]); // Initialize with an empty string


  useEffect(() => {
    const querySnapshot = collection(FIRESTORE_DB, "trails");

    const subscriber = onSnapshot(querySnapshot, {
      next: (snapshot) => {
        
        const datas: any[] = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          datas.push({
            id: doc.id,
            ...doc.data(),
          })
        });
        setDatas(datas);
      },
    });

    console.log(datas)

    return () => subscriber();
  }, []);
  
    
  
  return (
    <View>
      <View>
        <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Trails</Text>
      </View>
      <View>
        { datas.map(data => (
          <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 20, padding:15 }}> {data.description} {data.difficulty} {data.length}</Text>
        )
        )}
      </View>

    </View>
  )
}



