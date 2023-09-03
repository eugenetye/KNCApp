import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Discover from './Discover'
import Trails from './Trails'
import Current from './Current';
import Past from './Past';

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Trails" component={Trails} />
      <Tab.Screen name="Current" component={Current} />
      <Tab.Screen name="Past" component={Past} />
    </Tab.Navigator>
  );
}

export default Footer