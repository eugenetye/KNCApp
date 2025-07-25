import { Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Event_template: { param?: any } | undefined;
}

const setImageLink = (uid: string, type: string) => {
  let pages: string[] = ['discover', 'current', 'past', 'trails']; 

  for (let i = 0; i < pages.length; i++) {
    if (type == pages[i]) {
      return ('/' + pages[i] + '/' + uid + '.jpeg');
    }
  }
}

export const Event_item = ({ item }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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



  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Event_template', { param: item })}

        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          margin: 14,
        }}
      >
        <View style={{ paddingVertical: 12 }}>
          <Image
            style={{ width: 340, height: 150, borderRadius: 8 }}
            source={{ uri: url }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "500",
              paddingVertical: 8,
              fontFamily: 'Questrial-Regular',
            }}
          >
            {item.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

