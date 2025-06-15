import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    const handleBarcodeScanned = ({ data, type }) => {
        if (!scannedData && data) {
            const parsedData = JSON.parse(data);

            navigation.navigate('Confirmation', { scannedData: parsedData });


        }
    };

    if (!permission) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (!permission.granted) {
        return <Text>No access to camera. Please grant permission in settings.</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barcodeScannerSettings={{
                    barcodeTypes: [
                        'qr',
                        'code128',
                        'code39',
                        'ean13',
                        'ean8',
                        'upc_a',
                        'upc_e',
                        'pdf417',
                        'aztec',
                        'itf14',
                        'datamatrix',
                    ],
                }}
                onBarcodeScanned={scannedData ? undefined : handleBarcodeScanned}
            />
            {scannedData && (
                <View style={styles.buttonContainer}>
                    <Button title="Scan Again" onPress={() => setScannedData(null)} />
                </View>
            )}
            <Text style={styles.instruction}>
                📷 Point your camera at a barcode or QR code
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    instruction: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
});
