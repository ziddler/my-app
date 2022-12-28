import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoadingOverlay from './LoadingOverlay.js';
import { useSelector} from 'react-redux';

import MemberSearch from '../screens/membersearch/index.js';
import MemberDetails from '../screens/member-details/index.js';
import Transactions from '../screens/transactions/index.js';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  var selectedMember = useSelector( (state) => state.selectedMember );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>
        {selectedMember.FirstName}
    </Text>

      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Root() {
  const showLoading = useSelector(state => state.showLoading);
  const selectedMember = useSelector(state => state.selectedMember);

  const memberID =selectedMember.UserID;
  const memberName =selectedMember.LastName+', '+selectedMember.FirstName;


  return (
  <View style={{flexDirection:'column', flex: 1}}>
  { showLoading && <LoadingOverlay/> }

    <NavigationContainer style={{flex: 1}}>
      
      <Drawer.Navigator initialRouteName="Members">
      
        <Drawer.Screen
          name="Search"
          options={{ drawerLabel: 'Search Members', drawerLabelStyle: {fontSize: 20} }}
          component={MemberSearch}
        />
        {memberID!=null &&
        <>
        <Drawer.Screen
          name="MemberDetails"
          options={{ drawerLabel: memberName, drawerLabelStyle: {fontSize: 20, marginLeft: 20} }}
          component={MemberDetails}
        />

        <Drawer.Screen
          name="Bars"
          options={{ drawerLabel: 'Bar Membership', drawerLabelStyle: {fontSize: 20, marginLeft: 20} }}
          component={NotificationsScreen}
        />

      <Drawer.Screen
          name="Courses"
          options={{ drawerLabel: 'Courses', drawerLabelStyle: {fontSize: 20, marginLeft: 20} }}
          component={NotificationsScreen}
        />

        <Drawer.Screen
          name="Transactions"
          options={{ drawerLabel: 'Transactions', drawerLabelStyle: {fontSize: 20, marginLeft: 20} }}
          component={Transactions}
        />

        <Drawer.Screen
          name="Password"
          options={{ drawerLabel: 'Reset Password', drawerLabelStyle: {fontSize: 20, marginLeft: 20} }}
          component={NotificationsScreen}
        />
        </>
        }

        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
    </View>
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
  },
});