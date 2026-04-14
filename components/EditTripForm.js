import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addToQueue } from '../utils/offlineQueue';
// import axios from 'axios';
// import { BASE_URL } from '../utils/config';


export default function EditTripForm({ trip, onSuccess }) {
  const [title, setTitle] = useState(trip.title);
  const [description, setDescription] = useState(trip.description);

  const handleSave = async () => {
    const updatedTrip = {
      ...trip,
      title,
      description
    };

    if (!navigator.onLine) {
      await addToQueue({ type: 'UPDATE', trip: updatedTrip });
      Alert.alert('Queued for update');
      onSuccess(); 
      return;
    }

    try {
      Alert.alert('Updated');
      onSuccess(updatedTrip);
    } catch (e) {
      Alert.alert('Update failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Trip</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.area}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Description"
      />

      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', borderRadius: 12 },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 10 },
  area: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 10, minHeight: 100 },
  btn: { backgroundColor: '#0a3d62', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});