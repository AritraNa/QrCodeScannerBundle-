import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ViewAllDataScreen() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch('http://192.168.29.212:5050/entries')
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(err => console.error(err));
    }, []);

    const renderItem = ({ item }) => (
        < View style={styles.row} >
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.age}</Text>
            <Text style={styles.cell}>{item.mobileNumber}</Text>
            <Text style={styles.cell}>₹{item?.transactionAmount || 0}</Text>
            <Text style={styles.cell}>{new Date(item.timestamp).toLocaleString()}</Text>
        </ View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 All Transactions</Text>
            <View style={styles.header}>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>Age</Text>
                <Text style={styles.headerCell}>Mobile No.</Text>
                <Text style={styles.headerCell}>Amount</Text>
                <Text style={styles.headerCell}>Time</Text>
            </View>
            <FlatList
                data={entries?.data}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    header: { flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 5 },
    headerCell: { flex: 1, fontWeight: 'bold' },
    row: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 0.5 },
    cell: { flex: 1 },
});
