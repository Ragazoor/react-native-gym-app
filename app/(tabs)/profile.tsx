import { userAtom } from '@/atoms/userAtom';
import ProfilePage from '@/components/ProfilePage';
import UpcomingWorkouts from '@/components/UpcomingWorkouts';
import { useAtomValue } from 'jotai';
import { ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const user = useAtomValue(userAtom);

  return (
    <SafeAreaView>
      {user && <ProfilePage user={user} />}
      <UpcomingWorkouts />
    </SafeAreaView>
  );
}
