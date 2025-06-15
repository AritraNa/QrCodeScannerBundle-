import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ConfirmationScreen({ route, navigation }) {
    const { scannedData } = route.params;

    const handleConfirm = async () => {
        const payload = {
            name: scannedData?.name,
            age: scannedData?.age,
            mobileNumber: scannedData?.mobileNumber,
            transactionAmount: scannedData?.amount,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://192.168.29.212:5050/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.success) {
                alert('Submission succeeded')
                navigation.navigate('Home'); // or wherever you want
            } else {
                alert('Submission failed');
            }
        } catch (err) {
            alert(`Error submitting data: ${err}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm QR Data</Text>
            <Text>Name: {scannedData.name}</Text>
            <Text>Number: {scannedData.mobileNumber}</Text>
            <Text>Age: {scannedData.age}</Text>
            <Text>Transaction: ₹{scannedData.amount}</Text>

            <Button title="Confirm and Submit" onPress={handleConfirm} />
            <Button title="Cancel" onPress={() => navigation.goBack()} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});
