
import { SafeAreaView } from 'react-native';
import FriendWorkouts from '@/components/FriendWorkouts';
import firestore from '@react-native-firebase/firestore';

const useGetSandra = async () => {
  const usersCollection = await firestore().collection('users').doc('82586').get();
  return usersCollection;
}

export default function FriendsScreen() {
  const usersCollection = useGetSandra();
  // https://rnfirebase.io/auth/social-auth#google
  // It's possible to signin with Google same way as with calendar.
  // Use the same method as with google stuff, ensure signedIn, use the tokens and fetch data.

  // Can also use anonymous signin, will try. We're not gonna fetch anything sensistive.
  console.log(usersCollection);
  return (
    <SafeAreaView>
      <FriendWorkouts />
    </SafeAreaView>
  );
};