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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    marginBottom: 10,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  extraTitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  details: {
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    color: '#666',
  },
  bookingStatus: {
    fontSize: 16,
    marginTop: 5,
    color: '#007AFF',
  },
  fullBooking: {
    color: '#FF3B30',
  },
  queue: {
    fontSize: 14,
    color: '#FFA500',
    marginTop: 3,
  },
  staffSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  staffTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  staffName: {
    fontSize: 14,
    color: '#555',
  },
});

export default BookedWorkouts;
