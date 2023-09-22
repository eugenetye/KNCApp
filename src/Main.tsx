import { View, Text, ScrollView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react'
import {Trails} from './Trails'
import {Discover} from './Discover'
import {Current} from './Current';
import {Past} from './Past';
import {QRcode} from './QRcode';
import { RouteProp } from '@react-navigation/native'; // Import RouteProp
import { ParamListBase } from '@react-navigation/native'; // Import ParamListBase

const Tab = createBottomTabNavigator();

function showScreens(
  pageName: string,
  comp: () => React.JSX.Element | null
) {
  return (
    <Tab.Screen
      name={pageName}
      component={comp}
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

const ICONS: Record<string, string> = {
  "Discover": "navigate-circle-outline",
  "Trails": "map-outline",
  "Current": "newspaper-outline" ,
  "Past": "calendar-outline",
  "QRcode": "qr-code-outline",
};

type TabScreenRouteProp = RouteProp<ParamListBase, keyof ParamListBase>;

export const tabBarOptions = {
  screenOptions: ({ route, focused }: { route: TabScreenRouteProp, focused: boolean }) => ({
    tabBarIcon: ({}) => {
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
  }),
};


export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          ICONS
          const iconName: string = ICONS[route.name];
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
      <Tab.Screen
        name={"QRcode"}
        options={{
          headerShown: false,
        }}
      >
        {({ route, navigation }) =>
          <QRcode navigation={navigation}/>
        }
      </Tab.Screen>
      {currentScreen}
      {pastScreen}
    </Tab.Navigator>
  );
};
