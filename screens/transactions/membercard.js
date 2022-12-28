import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MemberDetailsAPI } from "../../api/CustomerServiceAPI.js";
import { useDispatch } from "react-redux";
import moment from "moment-timezone";

export default function MemberCard(props) {
  const member = props["member"];
  const navigation = props["navigation"];

  const dispatch = useDispatch();

  const packageName = () => {
    if (member.Description !== null) {
      return member.Description;
    }

    if (member.TransactionItem.Type === 1) {
      return "Unlimited Package";
    }

    if (member.TransactionItem.Type === 2) {
      return `Custom State Package (${member.TransactionItem.Credits} credits)`;
    }

    if (member.TransactionItem.Type === 3) {
      return `${member.TransactionItem.Credits} a-la-carte credits`;
    }

    if (member.TransactionItem.Type === 4) {
      return `Single course (${member.TransactionItem.Credits} credits)`;
    }

    if (member.TransactionItem.Type === 5) {
      return `Bundle`;
    }

    if (member.TransactionItem.Type === 6) {
      return `Bundle Upgrade (${member.TransactionItem.Credits} credits)`;
    }
  };

  const handlePress = (memberId) => {
    const results = MemberDetailsAPI(memberId).then((json) => {
      dispatch({ type: "setMember", value: json });
      navigation.navigate("Notifications");
    });
  };

  const transInSeconds = Number(
    member.TransactionDate.replace("/Date(", "").replace(")/", "")
  );
  const tz = moment.tz.guess();
  const tranactionTime =
    moment(transInSeconds).format("L LT ") +
    moment.tz.zone(tz).abbr(transInSeconds);

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onLongPress={() => alert(1)}
        onPress={() => handlePress(member.MemberID)}
        activeOpacity={0.6}
      >
        <View
          style={{
            flexDirection: "row",
            border: 1,
            flexWrap: "wrap",
            flex: 1,
            marginLeft: 20,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              width: 230,
              padding: 5,
              paddingBottom: 0,
              textAlign: "left",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                border: 1,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {tranactionTime}
            </Text>
          </View>
          <View
            style={{ width: 90, padding: 5, paddingBottom: 0, marginLeft: 20 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              ${member.Amount.toFixed(2)}
            </Text>
          </View>
          <View style={{ width: 350, padding: 5, paddingBottom: 0 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {packageName()}
            </Text>
          </View>

          <View style={{ width: 500, padding: 5, paddingBottom: 0 }}>
            <Text style={{ fontSize: 18 }}>
              Authorize.net ID: {member.TransactionID}
            </Text>
          </View>

          <View style={{ width: 500, padding: 5, paddingBottom: 0 }}>
            <Text style={{ fontSize: 18 }}>Coupon: {member.CouponCode}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    marginBottom: 10,
    border: 1,
    backgroundColor: "lightgray",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderColor: "gray",
    alignSelf: "stretch",
    alignContent: "stretch",
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
