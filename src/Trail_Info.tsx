import { ScrollView, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Trails: { param?: any } | undefined;
  };

const Trail_Info = ({route} : any) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const item = route.params.param
    const imgLink = '/' + item.uid + '.jpeg';

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
              fontSize: 19,
              fontWeight: "500",
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
            }}
          >
            {item.description}
          </Text>
        </View>

        </View>
    </View>


    </ScrollView>
    </SafeAreaView>
    )
}


export default Trail_Info
