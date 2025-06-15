// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen.js';
import QrScanner from './screens/QrScanner.js';
import ConfirmationScreen from './screens/ConfirmationScreen.js';
import ViewAllDataScreen from './screens/ViewAllData.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="QR Scanner" component={QrScanner} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="ViewAllData" component={ViewAllDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
