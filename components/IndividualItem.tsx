import { Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  Trail_Info: { param: any } | undefined;
};

export const IndividualItem = ({ item }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Trail_Info', { param: item })}

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
              fontSize: 19,
              fontWeight: "500",
              paddingVertical: 8,

            }}
          >
            {item.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

