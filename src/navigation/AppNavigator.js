import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';

import CreateLead from '../screens/CreateLead';
import ForgotPassword from '../screens/ForgotPassword'
import SignupScreen from '../screens/SignupScreen'
import PolicyList from '../screens/PolicyList';
import PolicyDetails from '../screens/PolicyDetails';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PolicyList" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="CreateLead" component={CreateLead} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="PolicyList" component={PolicyList} />
      <Stack.Screen name="PolicyDetails" component={PolicyDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
