import { BookedWorkout } from "@/models/bookedWorkout";
import { getAuthToken } from "./googleClient";
import firestore from "@react-native-firebase/firestore";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Friend, FriendWorkout } from "@/models/friend";
import CookieManager from "@react-native-cookies/cookies";

const BASE_URL = process.env.EXPO_PUBLIC_GYM_BASE_URL!;

const login = async (): Promise<FirebaseAuthTypes.User> => {
  const googleCredentials = await getAuthToken();
  const firebaseCredentials = auth.GoogleAuthProvider.credential(
    googleCredentials.idToken
  );
  await auth().signInWithCredential(firebaseCredentials);
  const user = auth().currentUser;
  if (!user) {
    throw new Error("Failed to connect to the cloud");
  } else {
    return user;
  }
};

const ensureLoggedIn = async (): Promise<FirebaseAuthTypes.User> => {
  const user = auth().currentUser;
  if (!user) {
    return await login();
  } else {
    return Promise.resolve(user);
  }
};

export const addFriend = async (newFriend: Friend): Promise<void> => {
  const user = await ensureLoggedIn();

  await firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .update({
      friends: firestore.FieldValue.arrayUnion({
        userId: newFriend.userId,
        userName: newFriend.userName,
      }),
    });

  return;
};

export const removeFriend = async (newFriend: Friend): Promise<void> => {
  const user = await ensureLoggedIn();

  await firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .update({
      friends: firestore.FieldValue.arrayRemove({
        userId: newFriend.userId,
        userName: newFriend.userName,
      }),
    });

  return;
};

export const getMyFriends = async (): Promise<Friend[]> => {
  const user = await ensureLoggedIn();

  const myUserDoc = await firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .get();

  const myFriends = myUserDoc.data()?.friends || [];

  return myFriends;
};

export const getAllUsers = async (): Promise<Friend[]> => {
  await ensureLoggedIn();

  const allUserDocs = await firestore().collection("users").get();

  const allUsers = allUserDocs.docs.map((doc) => {
    const data = doc.data();
    return {
      userId: doc.id,
      userName: data.name,
    } as Friend;
  });

  return allUsers;
};

export const getFriendsWorkouts = async (
  friends: Friend[]
): Promise<FriendWorkout[]> => {
  await ensureLoggedIn();

  const friendsWorkouts = await Promise.all(
    friends.map((friend) => getFriendWorkouts(friend))
  );

  return friendsWorkouts;
};

const getFriendWorkouts = async (friend: Friend): Promise<FriendWorkout> => {
  const userDoc = await firestore()
    .collection("users")
    .doc(friend.userId)
    .get();

  const userWorkouts = userDoc.data()?.workouts || [];

  const friendWorkouts = {
    userId: friend.userId,
    userName: friend.userName,
    workouts: userWorkouts.map((data: any) => {
      return {
        id: data.id,
        extraTitle: data.extraTitle,
        startTime: toDateTime(data.startTime.seconds),
        endTime: toDateTime(data.endTime.seconds),
        numBooked: data.numBooked,
        numSpace: data.numSpace,
        numQueued: data.numQueued,
        inQueue: data.inQueue,
        workoutType: data.workoutType,
        isBooked: data.isBooked,
        staffs: data.staffs,
        weekDay: data.weekDay,
        venue: data.venue,
      } as BookedWorkout;
    }),
  };

  return friendWorkouts;
};

function toDateTime(secs: number) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

export const updateCookie = async (): Promise<void> => {
  const user = await ensureLoggedIn();
  const cookies = await CookieManager.get(BASE_URL);

  const sessionCookie = cookies["session"].value;

  const result = await firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .collection("private")
    .doc("fysiken")
    .set({ lastSession: sessionCookie, randomNum: Math.random() });

  return result;
};

export const ensureUserExists = async (): Promise<void> => {
  const user = await ensureLoggedIn();

  const userDoc = await firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .get();

  if (!userDoc.exists) {
    await firestore().collection("users").doc(`${user.uid}`).set({
      name: user.displayName,
      email: user.email,
      friends: [],
      workouts: [],
    });
  }
};
