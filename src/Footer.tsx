import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Main from './Main'
import Trails from './Trails'

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Trails" component={Trails} />
    </Tab.Navigator>
  );
}

export default Footer