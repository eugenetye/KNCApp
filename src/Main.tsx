import { View, Text, ScrollView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react'
import {Trails} from './Trails'
import {Discover} from './Discover'
import {Current} from './Current';
import {Past} from './Past';
import {QRcode} from './QRcode';

const Tab = createBottomTabNavigator();

function showScreens(pageName : string, pageComponent : any) {
  return (
    <Tab.Screen 
      name = {pageName}
      component= {pageComponent}
      options={{
        headerShown: false,
      }}
    />
  );
}


const discoverScreen = showScreens("Discover", Discover);
const trailsScreen = showScreens("Trails", Trails);
const currentScreen = showScreens("Current", Current);
const pastScreen = showScreens("Past", Past);
const qrcodeScreen = showScreens("QRcode", QRcode);

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Discover") {
            iconName = "navigate-circle-outline" as const;
          } else if (route.name === "Trails") {
            iconName = "map-outline" as const;
          } else if (route.name === "Current") {
            iconName = "newspaper-outline" as const;
          } else if (route.name === "Past") {
            iconName = "calendar-outline" as const;
          } else if (route.name === "QRcode") {
            iconName = "qr-code-outline" as const;
          }
          return (
            <Ionicons
              name={iconName}
              size={25}
              color={focused ? "#C5DFC5" : "grey"}
            />
          );
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {discoverScreen}
      {trailsScreen}
      {qrcodeScreen}
      {currentScreen}
      {pastScreen}

    </Tab.Navigator>
  );
};
