import { User } from '@/models/user';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfilePageProps {
  user: User;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const { firstName, lastName, email } = user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Min sida</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Förname:</Text>
        <Text style={styles.value}>{firstName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Efternamn:</Text>
        <Text style={styles.value}>{lastName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    width: 100,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfilePage;
