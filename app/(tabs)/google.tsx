import {
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';

import { Button, StyleSheet, View } from 'react-native';
import { googleSignIn } from '@/clients/googleClient';
import { useMutation } from 'react-query';
import { useAtom } from 'jotai';
import { googleUserAtom } from '@/atoms/googleUserAtom';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

export default function GoogleScreen() {
  const [googleUser, setGoogleUser] = useAtom(googleUserAtom);

  const { mutate: doLogin } = useMutation<GoogleUser, Error, void, unknown>("googleSignIn", googleSignIn, {
    onSuccess: (data) => {
      setGoogleUser(data);
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  });

  const endTime = new Date();
  endTime.setMonth(endTime.getMonth() + 1);

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Google Sync</ThemedText>
        {googleUser && <Ionicons name='cloud' size={32} />}
        {!googleUser && <Ionicons name='cloud-offline' size={32} />}
      </ThemedView>
      <View style={styles.container}>
        <Button title="Sign In 2" onPress={() => doLogin()} />
      </View>
    </>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 52,
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
})