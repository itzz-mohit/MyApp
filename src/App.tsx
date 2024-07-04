import {StyleSheet, Text, View, Linking} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NavigationContainer, createNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Details from './screens/Details';
import Register from './screens/Register';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Details: {token: string}; // Use 'string' instead of 'String'
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// const navigationRef = createNavigationContainerRef();
const navigationRef = createNavigationContainerRef<RootStackParamList>();
const App = () => {
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      const params = new URL(url).searchParams;
      const token = params.get('token'); // Extract the JWT token from the URL
      if (token && navigationRef.isReady()) {
        navigationRef.navigate('Details', { token });
      }
    };

    const listener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
