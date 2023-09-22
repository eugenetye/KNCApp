import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Main} from './src/Main';
import React from 'react';
import { Image } from 'react-native';
import Trail_Info from './src/Trail_Info';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
      <Image 
        style={{ width: 300, height: 30 , resizeMode: 'contain', marginLeft: 140}}
        source={require('./assets/logo.png')}
      />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#C5DFC5',
          },
          headerTintColor: 'black',
          }}>
        <Stack.Screen name="Kalamazoo Nature Center" component={Main} options={{headerTitle: () => <LogoTitle /> }}/>
        <Stack.Screen
          name="Trail_Info"
          component={Trail_Info}
          options={{
          headerShown: false,
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
