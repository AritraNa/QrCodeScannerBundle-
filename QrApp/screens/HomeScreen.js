// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the QR Scanner App</Text>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('QR Scanner')}
      />
      <Button
        title="📄 View All Data"
        onPress={() => navigation.navigate('ViewAllData')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
