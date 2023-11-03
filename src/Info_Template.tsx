import { ScrollView, Text, View, Pressable, Image, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AudioPlayer from '../components/AudioPlayer';
import * as FileSys from 'expo-file-system';
import CachedImage from '../components/CachedImage';

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
    borderRadius: 15  ,
    padding: 10,
    height: 50,
    width: "100%",
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

const setImageLink = (uid: string, type: string) => {
  let pages: string[] = ['discover', 'current', 'past', 'trails']; 

  for (let i = 0; i < pages.length; i++) {
    if (type == pages[i]) {
      return ('/' + pages[i] + '/' + uid + '.jpeg');
    }
  }
}

export type RootStackParamList = {
  Trails: { param?: any } | undefined;
  Info_Template: { param?: any } | undefined;
  Trail_Map: { param?: any } | undefined;
};

const AudioPlay = ({ file }: { file: string}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
  <SafeAreaView className='flex-1'>
  <ScrollView className='flex-1 px-4 py-6'>
      <View className='flex-row inset-x-0 justify-between '>
        <Pressable onPress={() => navigation.goBack()}
          className='w-10 h-10 rounded-md items-center justify-center bg-white'>
          <Ionicons size={24} name="arrow-back"></Ionicons>
        </Pressable>
      </View>
    <View>
     <AudioPlayer file={file}/>
    </View>
  </ScrollView>
</SafeAreaView>
  )
}

const TextAndPicture = (route : any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const item = route.params.param

  const imgLink = setImageLink(item.uid, item.type);


  useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
  }, []);

  const showLength = () => {
    if (item.type === "trails") {
        return (
          <View className='py-5'>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {item.length}
            </Text>
      </View>  
        )
    }
    else {
        return (<Text disabled={true}/>)
    }
}

  const showButton = () => {
      if (item.type === "trails") {
          return (
            <Pressable className='mt-10 mb-11' style={styles.button} onPress={() => navigation.navigate('Trail_Map')}>
            <Text style={styles.text}>Access the Trail Map Here</Text>
          </Pressable>
          )
      }
      else {
          return (<Text disabled={true}/>)
      }
  }

  const displayDescription = (description: string[]) => {
    const descriptionElements = description.map((item, index) => (
      <View key={index}>
        <Text 
          style={{
            fontSize: 21,
            fontWeight: "500",
            fontFamily: 'Questrial-Regular',
          }}
        >
          {item}
        </Text >
        {index < description.length - 1 && <Text>{'\n'}</Text>}
      </View>
    ));      
  
    return descriptionElements;
  }

  return (
  <SafeAreaView className='flex-1 relative'>
  <ScrollView className='flex-1 px-4 py-6'>
    <View className='relative'>

      <View className='absolute flex-row inset-x-0 justify-between '>
          <Pressable onPress={() => navigation.goBack()}
          className='w-10 h-10 rounded-md items-center justify-center bg-white'>
              <Ionicons size={24} name="arrow-back"></Ionicons>
          </Pressable>
      </View>

      <View className='py-5 mt-9'>
        <Text
          style={{
            fontSize: 27,
            fontWeight: "500",
            fontFamily: 'Questrial-Regular',
            color: '#1b747c',
          }}
        >
          {item.name}
        </Text>
      </View>
      <View>
      <CachedImage className='w-full h-40 object-cover rounded-2xl mt-3 mb-4'
          url = {imgLink}
      />
      {showLength()}
      {displayDescription(item.description)}

      {showButton()}
      <View style={{height:80}} />
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Info_Template = ({ route }: any) => {
  const item = route.params.param;

  return (item.audio
    ? <AudioPlay file={item.files[0]} />
    : <TextAndPicture {... route}/>)
}


export default Info_Template
