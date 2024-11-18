import { userAtom } from "@/atoms/userAtom";
import ProfilePage from "@/components/ProfilePage";
import BookedWorkouts from "@/components/BookedWorkouts";
import { useAtomValue } from "jotai";

import { SafeAreaView } from "react-native-safe-area-context";
import { Surface } from "react-native-paper";

export default function ProfileScreen() {
  const user = useAtomValue(userAtom);

  return (
    <Surface
      style={{
        flex: 1,
      }}
    >
      {user && <ProfilePage user={user} />}
      <BookedWorkouts />
    </Surface>
  );
}
