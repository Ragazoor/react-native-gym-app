import { userAtom } from '@/atoms/userAtom';
import { getWorkoutClendarEvent } from '@/clients/googleClient';
import { useRemoveBooking } from '@/hooks/useRemoveBooking';
import { BookedWorkout } from '@/models/bookedWorkout';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useQuery } from 'react-query';

interface BookedWorkoutCardProps {
  workout: BookedWorkout;
}

const BookedWorkoutCard: React.FC<BookedWorkoutCardProps> = ({ workout }) => {
  const {
    extraTitle,
    startTime,
    endTime,
    numBooked,
    numSpace,
    numQueued,
    workoutType,
    staffs,
    weekDay
  } = workout;

  const user = useAtomValue(userAtom);
  const { isRemovingWorkout, removeBooking } = useRemoveBooking(user!.id, workout);

  const formattedStartTime = new Date(startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = new Date(endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const bookingStatus = `${numBooked} / ${numSpace}`;
  const isFullyBooked = numBooked >= numSpace;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.workoutType}>{workoutType.name}</Text>
        <Text style={styles.extraTitle}>{extraTitle}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.time}>
          {weekDay} {formattedStartTime} - {formattedEndTime}
        </Text>
        <Text style={[styles.bookingStatus, isFullyBooked && styles.fullBooking]}>
          {isFullyBooked ? 'Fully Booked' : `Booked: ${bookingStatus}`}
        </Text>
        {numQueued > 0 && (
          <Text style={styles.queue}>Queue: {numQueued}</Text>
        )}
      </View>

      <View style={styles.staffSection}>
        <Text style={styles.staffTitle}>Staff:</Text>
        {staffs.map((staff) => (
          <Text key={staff.id} style={styles.staffName}>
            {staff.firstName} {staff.lastName}
          </Text>
        ))}
      </View>
      <Button title="Avboka" color={"red"} disabled={isRemovingWorkout} onPress={() => removeBooking()} />

    </TouchableOpacity>
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

export default BookedWorkoutCard;