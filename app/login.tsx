import { StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'react-query';
import { router } from 'expo-router';
import { login } from '@/clients/fysikenClient';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { User } from '@/models/user';

export default function LoginScreen() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const setUser = useSetAtom(userAtom)

  const { isLoading, mutate: doLogin } = useMutation<User, Error, void, unknown>("login",
    () => login(username, password), {
    onSuccess: (data) => {
      setUser(data)
      router.replace("/(tabs)")
    },
    onError: (error) => {
      Alert.alert("Login Misslyckades", error.message)
    },
    onSettled: () => {
      setPassword("")
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={() => doLogin()}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Loggar in...' : 'Login'}</Text>
      </TouchableOpacity>
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

