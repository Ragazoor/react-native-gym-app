import { Workout } from '@/models/workout';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const {
    extraTitle,
    startTime,
    endTime,
    numBooked,
    numSpace,
    numQueued,
    workoutType,
    staffs,
  } = workout;

  // Format time (you can customize based on your requirement)
  const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Booking status calculation
  const bookingStatus = `${numBooked} / ${numSpace}`;
  const isFullyBooked = numBooked >= numSpace;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.workoutType}>{workoutType.name}</Text>
        {extraTitle ? <Text style={styles.extraTitle}>{extraTitle}</Text> : null}
      </View>

      <View style={styles.details}>
        <Text style={styles.time}>
          {workout.weekDay} {formattedStartTime} - {formattedEndTime}
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
    </TouchableOpacity>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
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

export default WorkoutCard;
