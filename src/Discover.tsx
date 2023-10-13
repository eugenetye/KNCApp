import { ScrollView, Text, View, Pressable, Image, StyleSheet } from 'react-native'
import React, { useState, useLayoutEffect, useEffect, Component } from 'react'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB, FIREBASE_STORAGE } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
// import { DiscoverImage } from '../components/DiscoverImage';
import { IndividualItem } from '../components/IndividualItem';
import { ref, getDownloadURL } from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start', 
  },  
  image: {
    marginTop: -20,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#046339',
    borderRadius: 30  ,
    padding: 10,
    height: 50,
    width: "80%",
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Questrial-Regular',
  },
  headertext: {
    fontFamily: 'Questrial-Regular', 
    fontSize: 40, 
    padding: 15,
  }
});

export const Discover = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });

  const [datas, setDatas] = useState<any[]>([]); // Initialize with an empty array

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
  
    
  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Text style={styles.headertext}>Discover</Text>
        </View>
        <View style={styles.image}> 
        {/* {discoverItem && <Image style={{ width: 340, height: 160, borderRadius: 8 }} source={{ uri: discoverItem.imageURL }} />}*/}
          {datas.map((data, i) => (
              <IndividualItem key={i} item={data}/>
            ))}
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable style={styles.button} onPress={() => alert('Button pressed')}>
            <Text style={styles.text}>About KNC</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => alert('Button pressed')}>
            <Text style={styles.text}>Opening Hours</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => alert('Button pressed')}>
            <Text style={styles.text}>App Guide</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => alert('Button pressed')}>
            <Text style={styles.text}>Support</Text>
          </Pressable>          
        </View>

      </View>
    </ScrollView>
  )

}

// create a discover image function like individualitem
// or paste it in discover and modify
