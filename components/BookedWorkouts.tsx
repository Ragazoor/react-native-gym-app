import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BookedWorkoutCard from './BookedWorkoutCard';
import { useAtom } from 'jotai';
import { bookedWorkoutsAtom } from '@/atoms/bookedWorkoutsAtom';

const BookedWorkouts: React.FC = () => {
  const [{ data: workouts, isLoading, error, refetch }] = useAtom(bookedWorkoutsAtom);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Workouts</Text>
      {workouts && workouts.length > 0 ? (
        <FlatList
          data={workouts}
          renderItem={({ item: workout }) => <BookedWorkoutCard workout={workout} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noWorkoutsText}>No booked workouts</Text>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  noWorkoutsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default BookedWorkouts;
