/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ColorSchemeName, TouchableOpacity, View } from "react-native";
import { Text } from "../components/Themed";
import Colors from "../constants/Colors";
import InfoScreen from "../screens/InfoScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ReadScreen from "../screens/ReadScreen";
import SearchScreen from "../screens/SearchScreen";
import { RootStackParamList } from "../types";
import { moderateScale } from "../utils/scale";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <StatusBar style="light" />
      <RootNavigator />
    </NavigationContainer>
  );
}

const LogoTitle = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Entypo name="open-book" size={30} color={Colors.primary} />
    <Text
      style={{
        marginLeft: 10,
        fontSize: moderateScale(20),
        fontWeight: "bold",
        color: Colors.primary,
      }}
    >
      ReadIt
    </Text>
  </View>
);

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTintColor: Colors.text,
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <EvilIcons name="search" size={30} color={Colors.text} />
          </TouchableOpacity>
        ),
        headerTitle: () => <LogoTitle />,
        cardStyle: { backgroundColor: Colors.background },
      })}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ReadScreen" component={ReadScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
