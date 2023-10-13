import { ScrollView, Text, View, Pressable, Image, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AudioPlayer from '../components/AudioPlayer';

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
};

const AudioPlay = ({ file }: { file: string}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
      <AudioPlayer file={file}/>
    </View>
  </ScrollView>
</SafeAreaView>
  )
}

const TextAndPicture = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const item = route.params.param
  const imgLink = setImageLink(item.uid, item.type);

  const [url, setUrl] = useState(imgLink);

  useEffect(() => {
      const func = async () => {
      const reference = ref(FIREBASE_STORAGE, imgLink); 
      await getDownloadURL(reference).then((x) => {
          setUrl(x);
      })
  }

      func();
  }, []);

  
  
  useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
  }, []);

  const showButton = () => {
      if (item.type === "trails") {
          return (
            <Pressable style={styles.button} onPress={() => alert('Button pressed')}>
            <Text style={styles.text}>Access the trail map here</Text>
          </Pressable>  
          )
      }
      else {
          return (<Text disabled={true}/>)
      }
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
      <Image className='w-full h-40 object-cover rounded-2xl mt-3'
          source={{ uri: url }}
      />
      <View className='py-5 mt-3'>
        <Text
          style={{
            fontSize: 19,
            fontWeight: "500",
            fontFamily: 'Questrial-Regular',
          }}
        >
          {item.description}
        </Text>
      </View>
      {showButton()}
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Info_Template = ({ route }: any) => {
  const item = route.params.param;

  const file_name: string = item.files[0];
  return (item.audio
    ? <AudioPlay file={file_name} />
    : <TextAndPicture {... route}/>)
}


export default Info_Template
