import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import TravelItem from './TravelItem';
import CameraImage from './CameraImage';
import ImageViewer from './ImageViewer';
import EditTripForm from './EditTripForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TravelList({ navigation, route }) {
  const [trips, setTrips] = useState([]);
  const [cameraModal, setCameraModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewImage, setViewImage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [currentEditTrip, setCurrentEditTrip] = useState(null);

 
  useEffect(() => {
    const loadTrips = async () => {
      const saved = await AsyncStorage.getItem('userTrips');
      if (saved) setTrips(JSON.parse(saved));
    };
    loadTrips();
  }, []);

  

  useEffect(() => {
    if (route.params?.newTrip) {
      const newTrip = route.params.newTrip;

     
     
      const updatedTrips = [newTrip, ...trips];

      setTrips(updatedTrips);
      AsyncStorage.setItem('userTrips', JSON.stringify(updatedTrips));


      navigation.setParams({ newTrip: null });
    }
  }, [route.params, trips]);


 
  const handleDelete = async (id) => {
    const newTrips = trips.filter(item => item._id !== id);
    setTrips(newTrips);
    await AsyncStorage.setItem('userTrips', JSON.stringify(newTrips));
    Alert.alert('Deleted');
  };



  const handleEdit = (trip) => {
    setCurrentEditTrip(trip);
    setEditModal(true);
  };

  const handleUpdateSuccess = async (updatedTrip) => {
    const newTrips = trips.map(t => 
      t._id === updatedTrip._id ? updatedTrip : t
    );
    setTrips(newTrips);
    await AsyncStorage.setItem('userTrips', JSON.stringify(newTrips));
    setEditModal(false);
    Alert.alert('Updated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips</Text>

  <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.empty}>no trips now~</Text>}
        renderItem={({ item }) => (
          <TravelItem
            trip={item}
            onDelete={() => handleDelete(item._id)}
            onEdit={() => handleEdit(item)}
            onCamera={() => {
              setSelectedTrip(item);
              setCameraModal(true);
            }}
            onViewImage={() => setViewImage(item.photoUri)}
          />
        )}
      />

      <Modal visible={cameraModal} onRequestClose={() => setCameraModal(false)}>
        <CameraImage
          item={selectedTrip}
          onClose={() => setCameraModal(false)}
          onPhoto={(id, uri) => {
            const newTrips = trips.map(t =>
              t._id === id ? { ...t, photoUri: uri } : t
            );
            setTrips(newTrips);
            AsyncStorage.setItem('userTrips', JSON.stringify(newTrips));
            setCameraModal(false);
          }}
        />
      </Modal>

      <Modal visible={editModal} animationType="slide" onRequestClose={() => setEditModal(false)}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <EditTripForm
            trip={currentEditTrip}
            onSuccess={handleUpdateSuccess}
          />
          <TouchableOpacity
            style={{ marginTop: 20, alignItems: 'center' }}
            onPress={() => setEditModal(false)}
          >
            {/* 偏橘红 */}
            <Text style={{ color: '#E64A19', fontSize: 16 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ImageViewer uri={viewImage} onClose={() => setViewImage('')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#666' },
});