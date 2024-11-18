import React, { useState } from "react";
import { BottomNavigation, useTheme } from "react-native-paper";
import WorkoutsScreen from ".";
import FriendsScreen from "./friends";
import ProfileScreen from "./profile";

export default function TabLayout() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  const [routes] = useState([
    {
      key: "workouts",
      title: "Workouts",
      focusedIcon: "dumbbell",
      unfocusedIcon: "dumbbell",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
    {
      key: "friends",
      title: "Friends",
      focusedIcon: "account-multiple",
      unfocusedIcon: "account-multiple-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    workouts: WorkoutsScreen,
    profile: ProfileScreen,
    friends: FriendsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurface}
      barStyle={{ backgroundColor: theme.colors.surface }}
    />
  );
}
