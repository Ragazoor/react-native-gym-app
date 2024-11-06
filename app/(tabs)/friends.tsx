
import { SafeAreaView } from 'react-native';
import FriendWorkouts from '@/components/FriendWorkouts';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { getAuthToken } from '@/clients/googleClient';
import { useQuery } from 'react-query';


const useGetSandra = async () => {
  const googleCredentials = await getAuthToken();
  const firebaseCredentials = auth.GoogleAuthProvider.credential(googleCredentials.idToken);
  await auth().signInWithCredential(firebaseCredentials);
  const usersCollection = await firestore().collection('users').get();
  await usersCollection.forEach(a => console.log(a.data()));
}

export default function FriendsScreen() {
  useQuery('getSandra', useGetSandra);

  return (
    <SafeAreaView>
      <FriendWorkouts />
    </SafeAreaView>
  );
};