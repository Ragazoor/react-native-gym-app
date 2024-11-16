import { updateCookie } from "@/clients/firebaseClient";
import { Alert } from "react-native";
import { useMutation } from "react-query";

export const useUpdateFirebaseCookie = () => {
  const { isLoading: isUpdatingCookie, mutate: doUpdateCookie } = useMutation<
    void,
    Error,
    void,
    unknown
  >("doUpdateFirebaseCookie", () => updateCookie(), {
    onError: (error) => {
      Alert.alert("Was not able to update firebase database", error.message);
    },
  });

  return {
    isUpdatingCookie,
    doUpdateCookie,
  };
};
