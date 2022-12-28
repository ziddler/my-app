import {
  FlatList,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  Switch
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@rneui/themed";
import moment from "moment-timezone";

export default function MemberDetails({ navigation }) {
  const selectedMember = useSelector((state) => state.selectedMember);
  const memberCredits = useSelector((state) => state.memberCredits);
  const memberUnlimited = useSelector((state) => state.memberUnlimited);
  const memberBundles = useSelector((state) => state.memberBundles);

  const dispatch = useDispatch();

  const playlist = selectedMember.CourseTrackings;
  const playlistCount = playlist.length;

  const completed = playlist.filter((item) => item.Completed != null);
  const completedCount = completed != null ? completed.length : 0;

  const convertToDate = (jsonString) => {
    const transInSeconds = Number(
      jsonString.replace("/Date(", "").replace(")/", "")
    );

    return new Date(transInSeconds);
  };

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const formatDate = (date) => {
    const tz = moment.tz.guess();
    return moment(date).format("L");
  };

  const unlimitedExpiration =
    unlimitedExpiration == null ? null : memberUnlimited.Expiration;
  const unlimitedType =
    unlimitedExpiration == null ||
    unlimitedExpiration < new Date()
      ? "error"
      : unlimitedExpiration < new Date().addDays(30)
      ? "warning"
      : "success";

  const handleToggle = () => {
    console.log("handleToggle");
    setIsEnabled(!isEnabled);

    selectedMember.Status = selectedMember.Status==1 ? 0 : 1;
    dispatch({type: "setMember", value: selectedMember})
  }


  const [isEnabled, setIsEnabled] = useState(selectedMember.Status==1);

  return (
    <SafeAreaView style={styles.containerColumn}>
      <Text style={styles.h1}>
        {selectedMember.UserID} {selectedMember.LastName},{" "}
        {selectedMember.FirstName}
      </Text>

      <View style={{ justifyContent: "Left", alignItems: "stretch" }}>
        <View flexDirection="row">
          <Text style={styles.listLabel}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={selectedMember.FirstName}
          ></TextInput>
        </View>

        <View flexDirection="row">
          <Text style={styles.listLabel}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={selectedMember.LastName}
          ></TextInput>
        </View>

        <View flexDirection="row">
          <Text style={styles.listLabel}>Email:</Text>
          <TextInput
            style={styles.input}
            value={selectedMember.Email}
          ></TextInput>
        </View>

        <View flexDirection="row">
          <Text style={styles.listLabel}>Enabled:</Text>
          <Switch style={{marginTop: 15, marginLeft: 10}}
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={handleToggle}
          />
        </View>

        {selectedMember.Bars.map( (bar) => {
            <View flexDirection="row">
              <Text style={styles.listLabel}>Bar:</Text>
              <Text style={{ ...styles.listLabel, width: 200}}>{bar.State.Name}: [{bar.Number}]</Text>
            </View>
          })
        }

        <View flexDirection="row">
          <Text style={styles.listLabel}>Credits:</Text>
          <View style={{ marginLeft: 10 }}>
            <Badge
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={memberCredits.PaidCredits}
              status={
                memberCredits.PaidCredits == 0
                  ? "error"
                  : memberCredits.PaidCredits < 3
                  ? "warning"
                  : "success"
              }
              containerStyle={styles.badgeContainer}
            />
          </View>
        </View>
        {memberBundles.map((memberbundle) => {
          const bundleExpiration = convertToDate(memberbundle.Expiration);
          const dateString = formatDate(bundleExpiration);

          const bundleType =
          bundleExpiration == null ||
          bundleExpiration < new Date() < new Date()
      ? "error"
      : bundleExpiration < new Date().addDays(30)
      ? "warning"
      : "success"; 

          return (
            <View
            flexDirection="row"
              key={memberbundle.BundleMemberID}
            >
              <Text style={styles.listLabel}>Bundle:</Text>

              <Badge
              badgeStyle={{...styles.badge, width: 120, marginLeft: 10 }}
              textStyle={styles.badgeText}
              value={dateString}
              status={bundleType }
              containerStyle={styles.badgeContainer}
            />

              <Text style={{paddingTop: 22, paddingLeft: 5}}>
                {memberbundle.Bundle.BundleName}
              </Text>

            </View>
          );
        })}

        {unlimitedExpiration != null && (
          <View flexDirection="row">
            <Text style={styles.listLabel}>Unlimited:</Text>
            <View style={{ marginLeft: 10 }}>
              <Badge
                badgeStyle={{ ...styles.badge, width: 120 }}
                textStyle={styles.badgeText}
                value={formatDate(memberUnlimited.Expiration)}
                status={unlimitedType}
                containerStyle={styles.badgeContainer}
              />
            </View>
          </View>
        )}

        <View flexDirection="row">
          <Text style={styles.listLabel}>Playlist:</Text>
          <View style={{ marginLeft: 10 }}>
            <Badge
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={playlistCount}
              status="primary"
              containerStyle={styles.badgeContainer}
            />
          </View>
        </View>

        <View flexDirection="row">
          <Text style={styles.listLabel}>Completed:</Text>
          <View style={{ marginLeft: 10 }}>
            <Badge
              badgeStyle={styles.badge}
              textStyle={styles.badgeText}
              value={completedCount}
              status="success"
              containerStyle={styles.badgeContainer}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  containerColumn: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 50,
    marginLeft: 10,
    marginRight: 10,
  },

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
    fontSize: 18,
    flex: 1,
  },

  listLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    width: 110,
    marginBottom: 20
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

  badge: {
    borderRadius: 9,
    height: 27,
    minWidth: 0,
    width: 55,
  },

  badgeContainer: {
    paddingTop: 17,
  },
  badgeText: {
    fontSize: 20,
    paddingHorizontal: 0,
  },
});
