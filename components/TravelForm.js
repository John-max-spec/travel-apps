import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TravelForm({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }
    let res = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Fill all fields');
      return;
    }

   
    const newTrip = {
      _id: Date.now().toString(),
      title,
      description,
      location,
      photoUri: image,
    };

    try {
      
      const savedTrips = await AsyncStorage.getItem('userTrips');
      const oldTrips = savedTrips ? JSON.parse(savedTrips) : [];

     
      const updatedTrips = [newTrip, ...oldTrips];

    
      await AsyncStorage.setItem('userTrips', JSON.stringify(updatedTrips));

      navigation.navigate('TravelList');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Trip</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.area} placeholder="Description" multiline value={description} onChangeText={setDescription} />

      <TouchableOpacity style={styles.btn} onPress={getLocation}>
        <Text style={styles.btnText}>Get Location</Text>
      </TouchableOpacity>

      {location && (
        <Text style={styles.green}>
          {location.coords.latitude.toFixed(3)}, {location.coords.longitude.toFixed(3)}
        </Text>
      )}

      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>Select Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.img} />}

      <TouchableOpacity style={[styles.btn, styles.submit]} onPress={handleSubmit}>
        <Text style={styles.btnText}>Save Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 },
  area: { backgroundColor: '#fff', padding: 12, borderRadius: 8, minHeight: 100, marginBottom: 10 },
  btn: { backgroundColor: '#0a3d62', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  submit: { marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  img: { width: 150, height: 150, alignSelf: 'center', marginVertical: 10, borderRadius: 8 },
  green: { color: 'green', textAlign: 'center', marginBottom: 10 },
});