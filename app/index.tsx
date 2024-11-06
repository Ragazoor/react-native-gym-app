import { StyleSheet, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { router } from 'expo-router';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { User } from '@/models/user';
import { getCurrentUser } from '@/clients/gymClient';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/calendar',
  ],
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function SplashScreen() {
  const setFysikenUser = useSetAtom(userAtom);

  const { } = useQuery<User, Error, User>("getCurrentFysikenUser",
    getCurrentUser, {
    onSuccess: (data) => {
      setFysikenUser(data);
      router.replace("/(tabs)");
    },
    onError: () => {
      router.replace("/login");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fysiken 2.0</Text>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignContent: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

