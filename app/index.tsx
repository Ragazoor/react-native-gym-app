import { StyleSheet, Button } from 'react-native';

import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '@/models/user';
import { useMutation } from 'react-query';
import { router } from 'expo-router';
import { login } from '@/clients/fysikenClientStub';

export default function LoginScreen() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const [user, setUser] = useState<User | undefined>(undefined)
  console.log(user)


  const doLogin = useMutation("login", () => login("Ragz", "hoye"), {
    onMutate: () => {
      setIsLoggingIn(true);
    },
    onSuccess: (data) => {
      setUser(data)
      router.push("/(tabs)")
    },
    onError: (error) => {
      console.error(error)
    },
    onSettled: () => {
      setIsLoggingIn(false)
    }
  })
  const onPress = useCallback(() => {
    doLogin.mutate()
  }, [doLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={onPress}
        title="Login"
        color="#848484"
        accessibilityLabel="Learn more about this purple button"
        disabled={isLoggingIn}
      />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
