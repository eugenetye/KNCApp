import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Main} from './src/Main';
import React from 'react';
import { Image } from 'react-native';

import Info_Template from './src/Info_Template';
import {Trail_Map} from './src/Trail_Map';
import Event_template from './src/Event_template';

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

          name="Info_Template"
          component={Info_Template}

          options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Event_template"
        component={Event_template}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Trail_Map"
        component={Trail_Map}

        options={{
        headerShown: true,
        headerTitle: "Trail Map",
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
