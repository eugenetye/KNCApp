import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';

export const Past = () => {
  const [fontsLoaded] = useFonts({
    'Questrial-Regular': require('../assets/fonts/Questrial-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <Text style={{ fontFamily: 'Questrial-Regular', fontSize: 40, padding:15 }}>Past</Text>
    </View>
  )
}

