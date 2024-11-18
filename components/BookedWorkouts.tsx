import React from "react";
import { FlatList, StyleSheet } from "react-native";
import BookedWorkoutCard from "./BookedWorkoutCard";
import { useAtom } from "jotai";
import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { Surface, Text, useTheme } from "react-native-paper";
import { CustomTheme } from "@/app/_layout";

const BookedWorkouts: React.FC = () => {
  const [{ data: workouts }] = useAtom(bookedWorkoutsAtom);
  const { spacing } = useTheme<CustomTheme>();

  return (
    <Surface
      style={{
        padding: spacing.medium,
        flex: 1,
      }}
    >
      <Text variant="headlineLarge">Upcoming Workouts</Text>
      {workouts && workouts.length > 0 ? (
        <FlatList
          data={workouts.map((workout) => ({
            key: workout.id,
            ...workout,
          }))}
          renderItem={({ item }) => <BookedWorkoutCard workout={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noWorkoutsText}>No booked workouts</Text>
      )}
    </Surface>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 15,
  },
  noWorkoutsText: {
    fontSize: 16,
  },
});

export default BookedWorkouts;
