import { TextInput } from "react-native-paper";
import { FlatList, StyleSheet } from "react-native";
import UserListItem from "./UserListItem";
import { useAtom, useAtomValue } from "jotai";
import { filteredUsersAtom, searchQueryAtom } from "./atoms";

interface UserListComponentProps {}

const UserListComponent = ({}: UserListComponentProps) => {
  const [searchText, setSearchText] = useAtom(searchQueryAtom);
  const filteredUsers = useAtomValue(filteredUsersAtom);

  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for friends..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#fff",
    height: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default UserListComponent;
