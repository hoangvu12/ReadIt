/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import GenreScreen from "../screens/GenreScreen";
import HomeScreen from "../screens/HomeScreen";
import { BottomTabParamList, GenreParamList, HomeParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ showLabel: false, activeTintColor: Colors.primary }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Genre"
        component={GenreNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="menu-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const defaultScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeScreenStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeScreenStack.Navigator screenOptions={defaultScreenOptions}>
      <HomeScreenStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeScreenStack.Navigator>
  );
}

const GenreStack = createStackNavigator<GenreParamList>();

function GenreNavigator() {
  return (
    <GenreStack.Navigator screenOptions={defaultScreenOptions}>
      <GenreStack.Screen name="GenreScreen" component={GenreScreen} />
    </GenreStack.Navigator>
  );
}
