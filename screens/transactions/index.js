import {
  FlatList,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberCard from "./membercard.js";
import { SearchMembersAPI } from "../../api/CustomerServiceAPI";

export default function Transactions({ navigation }) {
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const selectedMember = useSelector((state) => state.selectedMember);
  const transactions = useSelector(
    (state) => state.selectedMember.PurchaseTransactions
  );

  console.log(transactions);
  const item = (member) => {
    return (
      <MemberCard
        key={member.item.MemberID}
        member={member.item}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.containerColumn}>
      <Text style={styles.listLabel}>
        {selectedMember.UserID} {selectedMember.LastName},{" "}
        {selectedMember.FirstName}
      </Text>
      <View style={{ justifyContent: "Left", alignItems: "stretch" }}>
        <FlatList
          data={transactions}
          renderItem={item}
          keyExtractor={(item) => item.PurchaseTransactionID.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listLabel: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  containerColumn: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 50,
    marginLeft: 10,
    marginRight: 10,
  },

  containerIcon: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },

  background: {
    backgroundColor: "#00a7e1",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    fontSize: 24,
    flex: 1,
  },
});
