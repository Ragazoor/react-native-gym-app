
import { SafeAreaView } from 'react-native';
import FriendWorkouts from '@/components/FriendWorkouts';
import firestore from '@react-native-firebase/firestore';

const useGetSandra = async () => {
  const usersCollection = await firestore().collection('users').doc('82586').get();
  return usersCollection;
}

export default function FriendsScreen() {
  const usersCollection = useGetSandra();
  console.log(usersCollection);
  return (
    <SafeAreaView>
      <FriendWorkouts />
    </SafeAreaView>
  );
};