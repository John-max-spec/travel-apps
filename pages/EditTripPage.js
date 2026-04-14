import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../utils/config';
import EditTripForm from '../components/EditTripForm';

export default function EditTripPage({ route, navigation }) {
  const { id } = route.params;
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${BASE_URL}/api/trips/${id}`);
      setTrip(res.data);
    };
    fetch();
  }, [id]);

  if (!trip) return <Text style={styles.load}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <EditTripForm trip={trip} onSuccess={() => navigation.navigate('TravelList')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  load: { flex: 1, textAlign: 'center', marginTop: 50 }
});