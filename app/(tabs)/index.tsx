import { StyleSheet, FlatList, Button } from "react-native";

import { MuscleEmoji } from "@/components/MuscleEmoji";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useMemo, useState } from "react";
import { fetchWorkouts } from "@/clients/gymClient";
import {
  dateToWeekDay as dateTimeToWeekDay,
  VenueName,
  Workout,
} from "@/models/workout";
import { useQuery } from "react-query";
import WorkoutCard from "@/components/WorkoutCard";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FilterButton from "@/components/FilterButton";
import { useAtomValue } from "jotai";
import { selectedVenuesListAtom as selectedVenuesAtom } from "@/atoms/filterVenuesAtom";
import { Ionicons } from "@expo/vector-icons";
import { googleUserAtom } from "@/atoms/googleUserAtom";

function getInitStartDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function getInitEndDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 8);
  return date;
}

export default function WorkoutsScreen() {
  const startDate = getInitStartDate();
  const endDate = getInitEndDate();
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateTime, setSelectedDate] = useState(new Date());
  const [filteredWorkouts, setFilteredWorkouts] = useState(allWorkouts);
  const selectedVenues = useAtomValue(selectedVenuesAtom);
  const googleUser = useAtomValue(googleUserAtom);

  const { data: fetchedWorkouts } = useQuery("fetchWorkouts", () =>
    fetchWorkouts(startDate, endDate)
  );

  const nowDateTime = new Date();

  const selectedWeekDay = useMemo(() => {
    return dateTimeToWeekDay(selectedDateTime);
  }, [selectedDateTime]);

  useEffect(() => {
    if (fetchedWorkouts) {
      setAllWorkouts(fetchedWorkouts);
    }
  }, [fetchedWorkouts]);

  useEffect(() => {
    setFilteredWorkouts(
      allWorkouts.filter((workout) => {
        const workoutDate = workout.startTime.toLocaleString().split(",")[0];
        const selectedDate = selectedDateTime.toLocaleString().split(",")[0];

        const isOkVenue =
          selectedVenues.length > 0
            ? workout.venue &&
              selectedVenues
                .filter(({ active }) => active)
                .map(({ name }) => name)
                .includes(workout.venue.name)
            : true;

        return (
          workoutDate === selectedDate &&
          workout.endTime > nowDateTime &&
          isOkVenue
        );
      })
    );
  }, [selectedDateTime, allWorkouts, selectedVenues]);

  const onSelectDateTime = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fysiken Pass</ThemedText>
        <MuscleEmoji />
        {googleUser && <Ionicons name="cloud-outline" size={32} />}
        {!googleUser && <Ionicons name="cloud-offline-outline" size={32} />}
      </ThemedView>
      <ThemedView style={styles.filterContainer}>
        <ThemedText style={styles.buttonTitle} type="subtitle">
          {selectedWeekDay}
        </ThemedText>
        <Button title="Välj Datum" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="date"
            display="default"
            onChange={onSelectDateTime}
          />
        )}
      </ThemedView>
      <ThemedView style={styles.venueFilterContainer}>
        <FilterButton buttonVenueName={VenueName.GIBRALTARGATAN} />
        <FilterButton buttonVenueName={VenueName.KASTERNTORGET} />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <FlatList
          data={filteredWorkouts.map((workout) => ({
            key: workout.id,
            ...workout,
          }))}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 52,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: "#000000",
    //alignItems: 'center',
  },
  buttonTitle: {
    alignSelf: "flex-start",
  },
  stepContainer: {
    flex: 1,
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  venueFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  venueButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#007AFF", // Highlight the active button
  },
  buttonText: {
    color: "#fff",
  },
});
