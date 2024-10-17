import { StyleSheet, FlatList } from 'react-native';

import { MuscleEmoji } from '@/components/MuscleEmoji';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { fetchWorkouts } from '@/clients/fysikenClient';
import { Workout } from '@/models/workout';
import { useQuery } from 'react-query';
import WorkoutCard from '@/components/WorkoutCard';

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
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const { data: fetchedWorkouts, isLoading, error } = useQuery('workouts', () => fetchWorkouts(startDate, endDate));

  useEffect(() => {
    if (fetchedWorkouts) {
      setWorkouts(fetchedWorkouts);
    }
  }, [fetchedWorkouts]);

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fysiken Pass</ThemedText>
        <MuscleEmoji />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <FlatList
          data={workouts.map((workout) => ({ key: workout.id, ...workout }))}
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
