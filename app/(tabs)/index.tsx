import { StyleSheet, FlatList, Button } from 'react-native';

import { MuscleEmoji } from '@/components/MuscleEmoji';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useMemo, useState } from 'react';
import { fetchWorkouts } from '@/clients/fysikenClient';
import { Workout } from '@/models/workout';
import { useQuery } from 'react-query';
import WorkoutCard from '@/components/WorkoutCard';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

function getInitStartDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date
}

function getInitEndDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date
}

export default function WorkoutsScreen() {
  const [startDate, setStartDate] = useState(getInitStartDate());
  const [endDate, setEndDate] = useState(getInitEndDate());
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateTime, setSelectedDate] = useState(new Date());
  const [filteredWorkouts, setFilteredWorkouts] = useState(allWorkouts);

  const { data: fetchedWorkouts, isLoading, error } = useQuery('fetchWorkouts', () => fetchWorkouts(startDate, endDate));

  useEffect(() => {
    if (fetchedWorkouts) {
      setAllWorkouts(fetchedWorkouts);
    }
  }, [fetchedWorkouts]);

  useEffect(() => {
    setFilteredWorkouts(allWorkouts.filter(workout => {
      const workoutDate = workout.startTime.toLocaleString().split(",")[0];
      const selectedDate = selectedDateTime.toLocaleString().split(",")[0];
      return workoutDate === selectedDate;
    }));
  }, [selectedDateTime, allWorkouts]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fysiken Pass</ThemedText>
        <MuscleEmoji />
      </ThemedView>
      <ThemedView >
        <ThemedText type="subtitle">Choose a Day</ThemedText>
        <Button title="Välj Datum" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </ThemedView >
      <ThemedView style={styles.stepContainer}>
        <FlatList
          data={filteredWorkouts.map((workout) => ({ key: workout.id, ...workout }))}
          renderItem={({ item }) =>
            <WorkoutCard workout={item} />
          }
        />
      </ThemedView>
    </ >
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 52,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
