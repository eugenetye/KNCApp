import { Text, View, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import CachedImage from "../components/CachedImage";

export type RootStackParamList = {
  Info_Template: { param: any } | undefined;
}

const setImageLink = (uid: string, type: string) => {
  let pages: string[] = ['discover', 'current', 'past', 'trails']; 

  for (let i = 0; i < pages.length; i++) {
    if (type == pages[i]) {
      return ('/' + pages[i] + '/' + uid + '.jpeg');
    }
  }
}

export const IndividualItem = ({ item }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const imgLink = setImageLink(item.uid, item.type);



  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Info_Template', { param: item })}

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
          <CachedImage
            url= {imgLink}
            style={{ width: 340, height: 150, borderRadius: 8 }}
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

